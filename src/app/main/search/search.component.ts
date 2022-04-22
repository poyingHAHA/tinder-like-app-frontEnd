import * as ProductPostModel from './../../model/interface/ProductPost';
import { Subscription, tap } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

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

  getProductPost$?: Subscription;
  treemaps: ProductPostModel.ProductPost[][]=[];

  constructor(
    private postService: PostService
  ) {
    this.isLoading = true;
    this.searchTxt = "";
    this.isSearchMode = false;

    let limit:number = 18;

    //testing subscribe
    this.getProductPost$ = this.postService.getProductPosts(limit, 0, "624941b301a9a3c75d9d26d6")
    .subscribe(posts => {
      if(posts){
        this.isLoading = false;
      }

      //after loading data to put labels
      this.testTags = [
        {
          label: "All",
          isActive: true
        },
        {
          label: "高領shirt",
          isActive: false
        },
        {
          label: "高領shirtshirt",
          isActive: false
        },
        {
          label: "高領shirtshirtshirt",
          isActive: false
        }
      ]

      //每6個一組
      for(let i=0,j=5; i<limit; i+=6,j=i+5)
      {
        this.treemaps.push(posts.slice(i, j+1));
      }
    });
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
    this.getProductPost$?.unsubscribe();
  }
}
