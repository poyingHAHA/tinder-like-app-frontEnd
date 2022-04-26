import * as ProductPostModel from './../../model/interface/ProductPost';
import { Subscription, tap, BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("search") search!: ElementRef;

  isLoading: boolean;

  //a label array record which label is activated
  testTags: {label:string, isActive: boolean}[] = [];

  searchTxt: string;
  isSearchMode: boolean;

  destroy$: Subject<any>;
  treemaps: ProductPostModel.ProductPost[][]=[];
  loadLimit: number;

  constructor(
    private postService: PostService
  ) {
    this.isLoading = true;
    this.searchTxt = "";
    this.isSearchMode = false;
    this.loadLimit = 18;
    this.destroy$ = new Subject<any>();

    let shop: string = "624941b301a9a3c75d9d26d6";
    this.initTreeMaps(shop);
  }

  initTreeMaps(shop: string)
  {
    //testing subscribe, random shop
    this.postService.getProductPosts(this.loadLimit, 0, shop)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(posts => {
      if(posts){
        this.isLoading = false;
      }

      //after loading data to put labels
      this.testTags = [
        {
          label: "All",
          isActive: true
        }
      ]

      //test, choose 5 post's labels
      for(let i=0; i<3; i++)
      {
        posts[i].labels.forEach(label=>{
          this.testTags.push({
            label: label.display_name,
            isActive: false
          });
        });
      }

      //每6個一組
      for(let i=0,j=5; i<this.loadLimit; i+=6,j=i+5)
      {
        this.treemaps.push(posts.slice(i, j+1));
      }
    });
  }

  loadMoreTreeMaps(shop: string)
  {
    //can randomly choose shop, so that productpost won't run out
    let skip = this.loadLimit;
    this.loadLimit+=18;
    this.postService.getProductPosts(this.loadLimit, skip, shop)
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(posts =>{
      for(let i=0,j=5; i<this.loadLimit; i+=6,j=i+5)
      {
        this.treemaps.push(posts.slice(i, j+1));
      }
    });
  }

  @HostListener('scroll', ['$event'])
  onScroll(e: any): void {
    // visible height + pixel scrolled >= total height
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.loadMoreTreeMaps("624941b301a9a3c75d9d26d6");
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  clearTxt()
  {
    this.searchTxt = "";
  }

  changeSearchMode()
  {
    // only true, or it will no trigger other btn
    // custom placeholder will block the focus event
    // so we use view child
    this.search.nativeElement.focus();
    this.isSearchMode = true;
  }

  clickBackBtn()
  {
    if(this.isSearchMode){
      this.isSearchMode = false;
    }
  }

  activateTag(label: string)
  {
    this.testTags.forEach(tag=>{
      if(tag.label===label){
        tag.isActive = true;
      }else{
        tag.isActive = false;
      }
    })
  }

  ngOnDestroy(): void {
    //can use subject to unsubscribe all observable
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
