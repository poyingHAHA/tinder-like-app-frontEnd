import { Label, TinderUser } from "./Partial";

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
  sp_itemid: number,
  sp_shopid: number,
  name: string,
  content: string,
  labels: Label[],
  feLabels: Label[],
  shipping_free: boolean,
  variation: Variation[],
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
  rating: PostRating,
  likes: Like[],
  discount: number,
  historicalSold: number,
  monthSold: number,
  stock: number,
  shared: Share[],
  createdAt: string,
  updatedAt: string,
  tinderLike: TinderUser[],
  tinderDislike: TinderUser[]
}





