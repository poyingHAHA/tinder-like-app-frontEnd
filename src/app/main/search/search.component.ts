import * as ProductPostModel from './../../model/interface/ProductPost';
import { Subscription, tap, BehaviorSubject, Subject, takeUntil, filter, fromEvent, debounceTime } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, Type } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("search") search!: ElementRef;
  @ViewChild("container") container!: ElementRef;

  isLoading: boolean;

  //a label array record which label is activated
  testTags: {label:string, isActive: boolean}[] = [];

  searchTxt: string;
  isSearchMode: boolean;

  destroy$: Subject<any>;
  treemaps: ProductPostModel.ProductPost[][]=[];
  scrollSub!: Subscription;

  isScrollToBottom: boolean;

  constructor(
    private postService: PostService
  ) {
    this.isLoading = true;
    this.searchTxt = "";
    this.isSearchMode = false;
    this.destroy$ = new Subject<any>();

    let shop: string = "624941b301a9a3c75d9d26d6";

    this.isScrollToBottom = false;
    this.initTreeMaps(shop);
  }

  initTreeMaps(shop: string)
  {
    //testing subscribe, random shop
    let num = 18;
    this.postService.getProductPosts(num, 0, shop)
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

      //test, choose 3 post's labels
      this.generateAndAddTags(this.selectFromArrayRandomly(posts, 3));

      //每6個一組
      this.addTreeMaps(this.slicePosts(posts));
    });
  }

  loadMoreTreeMaps(num: number)
  {
    //can randomly choose shop, so that productpost won't run out
    this.postService.getProductPostsRandomly(num)
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(posts =>{
      this.addTreeMaps(this.slicePosts(posts));
    });
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

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    //on mobile will trigger multiple times, so that it will call api so many times
    //use rxjs delay
    this.scrollSub = fromEvent(this.container.nativeElement, 'scroll')
    .pipe(
      takeUntil(this.destroy$),
      //delay 300ms
      debounceTime(300),
      filter(()=>this.container.nativeElement.offsetHeight + this.container.nativeElement.scrollTop >= this.container.nativeElement.scrollHeight-80)
    ).subscribe(()=>{
      this.cleanTagsAndKeepFirst();
      this.loadMoreTreeMaps(18);
      let randTreemaps: ProductPostModel.ProductPost[][] = this.selectFromArrayRandomly<ProductPostModel.ProductPost[]>(this.treemaps, 3);
      let randPosts: ProductPostModel.ProductPost[] = [];
      randTreemaps.forEach(treemap=>{
        randPosts.push(this.selectFromArrayRandomly<ProductPostModel.ProductPost>(treemap, 1)[0]);
      });
      this.generateAndAddTags(randPosts);
    });
  }

  selectFromArrayRandomly<T>(arr: any[], num: number): T[]
  {
    let res: T[] = [];

    for(let i=0; i<num; i++)
    {
      //0<= rand < 1 -> 0<= rand*len < len
      let item = arr[Math.floor(Math.random()*arr.length)];
      res.push(item);
    }

    return res;
  }

  slicePosts(posts: ProductPostModel.ProductPost[]): ProductPostModel.ProductPost[][]
  {
    let tmpTreeMaps: ProductPostModel.ProductPost[][] = [];

    //a tree map contain 6 posts
    for(let i=0,j=5; i<posts.length; i+=6,j=i+5)
    {
      tmpTreeMaps.push(posts.slice(i,j+1));
    }
    return tmpTreeMaps;
  }

  addTreeMaps(treemaps: ProductPostModel.ProductPost[][])
  {
    for(let treemap of treemaps)
    {
      this.treemaps.push(treemap);
    }
  }

  cleanTagsAndKeepFirst()
  {
    this.testTags = this.testTags.filter(x=>x.label=='All');
  }

  generateAndAddTags(posts: ProductPostModel.ProductPost[])
  {
    for(let i=0; i<posts.length; i++)
    {
      posts[i].labels.forEach(label=>{
        this.testTags.push({
          label: label.display_name,
          isActive: false
        });
      });
    }
  }

  ngOnDestroy(): void {
    //can use subject to unsubscribe all observable
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
