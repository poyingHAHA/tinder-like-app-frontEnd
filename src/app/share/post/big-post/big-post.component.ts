import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Shop } from './../../../model/interface/Shop';
import { ShopService } from './../../../service/shop-service/shop.service';
import { Subject, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductPost } from './../../../model/interface/ProductPost';
import { Component, Input, OnInit, Type, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-share-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.css']
})
export class BigPostComponent implements OnInit, OnDestroy {
  //[ the index ]: the value
  iconState: {[key: string]: boolean} = {
    "like": false,
    "comment": false,
    "shop": false
  };

  @Input('post') post!: ProductPost;

  @ViewChild('carousel') carousel!: NzCarouselComponent;

  destroy$: Subject<any>;

  imgBase: string = environment.imgBase;
  shop?: Shop;

  isImgLoaded: boolean;

  constructor(
    private shopService: ShopService
  ) {
    this.destroy$ = new Subject();
    this.isImgLoaded = false;
  }

  ngOnInit(): void {
    this.shopService.getShop(this.post.shopid)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(shop=>{
      this.shop = shop;
    });
  }

  changeMode(type: string): void
  {
    this.iconState[type] = !this.iconState[type];
  }

  prevImg()
  {
    this.carousel.pre();
  }

  nextImg()
  {
    this.carousel.next();
  }

  imgLoaded()
  {
    this.isImgLoaded = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
