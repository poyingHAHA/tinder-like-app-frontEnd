import { TreeMapRecommendPool } from './../../../model/interface/TreeMapRecommendPool';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { BuyerService } from './../../../service/buyer-service/buyer.service';
import { TreemapService } from './../../../service/treemap-service/treemap.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as ProductPostModel from 'src/app/model/interface/ProductPost';


@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css']
})
export class TreeMapComponent implements OnInit {
  @Input('posts') posts?: ProductPostModel.ProductPost[];
  @Input('evenOrOdd') evenOrOdd!: number;

  @Output('openPost') openPost: EventEmitter<ProductPostModel.ProductPost>;

  constructor(
    private buyerService: BuyerService,
    private treemapService: TreemapService
  ) {
    this.openPost = new EventEmitter<ProductPostModel.ProductPost>();
   }

  ngOnInit(): void {
    //based on rating star
    // this.posts?.sort((x, y)=>{
    //   return y.rating.rating_star - x.rating.rating_star; //最高分排前面
    // });

    //based on recommend score
    this.sortPostsByRecommendScore();
  }

  clickPost(post: ProductPostModel.ProductPost)
  {
    this.openPost.emit(post);
  }

  sortPostsByRecommendScore(): void
  {
    /*
      posts ->
      api(get score(one by one) ->
      forkJoin to get an array of score object ->
      sort(posts by score), insertion sort ->
      if(same score -> random) ->
      if(not in recommend pool -> send to the last)
    */
    if(this.posts){
      let inRecommendPool: ProductPostModel.ProductPost[] = [];
      let notInRecommendPool: ProductPostModel.ProductPost[] = [];
      let getScores$: Observable<TreeMapRecommendPool>[] = [];

      for(let post of this.posts){
        getScores$.push(this.treemapService.getRecommendScore(this.buyerService.getBuyerId(), post._id));
      }

      forkJoin(getScores$)
      .subscribe(recs=>{
        if(this.posts){
          for(let post of this.posts)
          {
            let rec = recs.find(x=>x.itemid==post._id);
            if(rec){ //有在推薦
              inRecommendPool.push(post);
            }else{
              notInRecommendPool.push(post);
            }
          }
        }
        inRecommendPool.sort((p1, p2)=>recs.find(x=>x.itemid==p2._id)!.score - recs.find(x=>x.itemid==p1._id)!.score)
        this.posts = inRecommendPool.concat(notInRecommendPool);
      });
    }
  }
}
