import { Label, rating, TinderUser, variation } from "./Partial";

export interface Variation
{
  name: string,
  options: {type: string}[],
  images: string[]
}

export interface PostRating
{
  rating_star: number,
  rating_count: number[]
}

export interface Like
{
  userid: string
}

export interface Share
{
  userid: string,
  postid: string
}

export interface ProductPost
{
  _id: string,
  shopid: string,
  shopAccount: string,
  sp_itemid: number,
  sp_shopid: number,
  name: string,
  seg_name: string,
  content: string,
  labels: Label[],
  feLabels: Label[],
  shipping_free: boolean,
  variation: variation[],
  models: {
    name: string,
    price: number,
    stock: number,
    modelid: number
  }[],
  images: string[],
  display: boolean,
  price: number,
  priceMax: number,
  priceMin: number,
  rating: rating,
  discount: number,
  historicalSold: number,
  monthSold: number,
  stock: number,
  likeCount: number,
  shareCount: number,
  tinderLikerCount: number,
  tinderUnlikeCount: number,
  tinderSuperlikeCount: number,

  createdAt: string,
  updatedAt: string
}





