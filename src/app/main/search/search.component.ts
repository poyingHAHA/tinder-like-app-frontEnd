import { Utility } from './../../utility';
import { BuyerService } from './../../service/buyer-service/buyer.service';
import { TreemapService } from './../../service/treemap-service/treemap.service';
import * as ProductPostModel from './../../model/interface/ProductPost';
import { Subscription, tap, BehaviorSubject, Subject, takeUntil, filter, debounceTime, first, Observable, forkJoin, switchMap, map, mergeMap, of, Observer, take, fromEvent } from 'rxjs';
import { PostService } from './../../service/post-service/post.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, Type } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends Utility implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("search") search!: ElementRef;
  @ViewChild("container") container!: ElementRef;

  isLoading: boolean;

  //a label array record which label is activated
  testTags: {label:string, isActive: boolean}[] = [];

  searchTxt: string;
  isSearchMode: boolean;

  isOpening: boolean;
  isBigPost: boolean;
  isFiltered: boolean;
  startBigPost?: ProductPostModel.ProductPost;
  searchState: "ready" | "autofill" | "result" = "ready";

  destroy$: Subject<any>;

  scroll$!: Observable<void>;
  scrollSub!: Subscription;
  scrollObserver: Observer<void>;

  treemaps: ProductPostModel.ProductPost[][]=[];
  displayTreemaps: ProductPostModel.ProductPost[][]=[];

  isScrollToBottom: boolean;

  constructor(
    private postService: PostService,
    private treemapService: TreemapService,
    private buyerService: BuyerService
  ) {
    super();
    this.isLoading = true;
    this.searchTxt = "";
    this.isSearchMode = false;
    this.isFiltered = false;

    this.destroy$ = new Subject<any>();

    //let shop: string = "624941b301a9a3c75d9d26d6";

    this.isScrollToBottom = false;
    this.isOpening = false;
    this.isBigPost = false;

    this.scrollObserver = {
      next: ()=>{
        this.cleanTagsAndKeepFirst();
        this.loadMoreTreeMaps(36);
        let randTreemaps: ProductPostModel.ProductPost[][] = Utility.selectFromArrayRandomly<ProductPostModel.ProductPost[]>(this.treemaps, 3);
        let randPosts: ProductPostModel.ProductPost[] = [];
        randTreemaps.forEach(treemap=>{
          randPosts.push(Utility.selectFromArrayRandomly<ProductPostModel.ProductPost>(treemap, 1)[0]);
        });
        this.generateAndAddTags(randPosts);
      },
      error: (err: Error)=>{
        console.log(err);
      },
      complete: ()=>{}
    };

    this.initTreeMaps();
  }

  initTreeMaps()
  {
    this.treemapService.getTreemapRecommendPost()
    .pipe(
      takeUntil(this.destroy$),
      mergeMap((items: ProductPostModel.ProductPost[])=>{
        if(items.length<=0){
          return this.postService.getProductPostsRandomly(18);
        }else{
          return of(items); //as an observable or it will emit only one value
        }
      })
    )
    .subscribe((posts)=>{
      //after loading data to put labels
      this.testTags = [
        {
          label: "All",
          isActive: true
        }
      ]

      this.generateAndAddTags(Utility.selectFromArrayRandomly(posts, 3));
      this.addTreeMaps(this.slicePosts(posts));
      this.setDisplayTreeMaps(this.flatten2DArray(this.treemaps));

      if(posts){
        this.isLoading = false;
      }
    });
  }

  loadMoreTreeMaps(num: number)
  {
    //can randomly choose shop, so that productpost won't run out
    //60/96 recommend, 36/num random
    let morePosts: ProductPostModel.ProductPost[] = [];

    /* **use fork join to subscribe multiple subscription** */
    let morePosts$ = forkJoin({
      random: this.postService.getProductPostsRandomly(num),
      recommend: this.treemapService.getTreemapRecommendPost()
    });

    morePosts$
    .pipe(first())
    .subscribe(posts=>{
      morePosts = morePosts.concat(posts.random);
      //may not have so many recommend post because the post been shown will be penaltied
      morePosts = morePosts.concat(Utility.selectFromArrayRandomly<ProductPostModel.ProductPost>(posts.recommend, Math.floor(posts.recommend.length*0.6)));
      this.addTreeMaps(this.slicePosts(morePosts));
      this.setDisplayTreeMaps(this.flatten2DArray(this.treemaps));
    });
  }

  clearTxt()
  {
    this.searchTxt = "";
    this.searchState = 'ready';
  }

  changeSearchMode()
  {
    // only true, or it will no trigger other btn
    // custom placeholder will block the focus event
    // so we use view child
    this.search.nativeElement.focus();
    if(this.searchTxt==""){
      this.searchState = "ready";
    }
    this.isSearchMode = true;
  }

  trySearch(event: KeyboardEvent)
  {
    if(event.key=="Enter"){
      this.searchState = "result";
    }
  }

  //ngModelChange
  //for trigger autofill or it will ignore first chinese input
  autoFill(e: string){
    this.searchTxt = e;
    this.searchState = "autofill";
    if(this.searchTxt=="" || this.searchTxt.trim()==""){
      this.searchState = 'ready';
    }
  }

  changeStateFromPanel(event: "ready"|"autofill"|"result")
  {
    this.searchState = event;
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
    if(!this.buyerService.isHasBuyerId()){
      this.buyerService.setBuyerId();
    }
  }

  ngAfterViewInit(): void {

    //on mobile will trigger multiple times, so that it will call api so many times
    //use rxjs delay
    this.scroll$ = fromEvent<void>(this.container.nativeElement, 'scroll')
    .pipe(
      takeUntil(this.destroy$),
      //delay 300m
      debounceTime(300),
      filter(()=>this.container.nativeElement.offsetHeight + this.container.nativeElement.scrollTop >= this.container.nativeElement.scrollHeight-80)
    );

    this.scrollSub = this.scroll$.subscribe(this.scrollObserver);

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
    let seen: any[] = [];
    for(let i=0; i<posts.length; i++)
    {
      posts[i].labels.forEach(label=>{
        if(!seen.includes(label.display_name)){
          this.testTags.push({
            label: label.display_name,
            isActive: false
          });
          seen.push(label.display_name);
        }
      });
    }
  }

  openPost(event: ProductPostModel.ProductPost)
  {
    this.isOpening = true;

    setTimeout(() => {
      this.isBigPost = true;
      this.startBigPost = event
      this.isOpening = false;
    }, 1000);
  }

  backBigPost()
  {
    this.isBigPost = false;
  }

  flatten2DArray(arr: any[][]): any[]
  {
    const res = arr.reduce((accumulator, value)=>accumulator.concat(value), []);
    return res;
  }

  filterPostByTag(label: string)
  {
    if(label=="All"){
      this.displayTreemaps = this.treemaps;
      this.scrollSub = this.scroll$.subscribe(this.scrollObserver);
      this.isFiltered = false;
      return;
    }

    this.scrollSub.unsubscribe();
    this.isFiltered=true;

    let qulifiedPosts = [];
    qulifiedPosts = (<ProductPostModel.ProductPost[]>this.flatten2DArray(this.treemaps))
    .filter(post=>{
      let isQulified = false;
      for(let l of post.labels)
      {
        if(l.display_name==label){
          isQulified = true;
          break;
        }
      }
      return isQulified;
    });

    this.setDisplayTreeMaps(qulifiedPosts);
  }

  setDisplayTreeMaps(posts: ProductPostModel.ProductPost[])
  {
    //in a posts array
    //slice it
    let tmpTreemaps = this.slicePosts(posts);
    this.displayTreemaps = tmpTreemaps;
  }

  ngOnDestroy(): void {
    //can use subject to unsubscribe all observable
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
