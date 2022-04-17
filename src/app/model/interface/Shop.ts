import { BuyerFollow, ShopFollow } from "./Partial"

export interface Shop
{
  sp_shopid: number,
  role: string,
  itemcount: number,
  account: string,
  password: string,
  profilePic: string,
  selfIntro: string,
  follower:{
    buyer: BuyerFollow[],
    shop: ShopFollow[],
    count: number
  },
  following: {
    buyer: BuyerFollow[],
    shop: ShopFollow[],
    count: number
  },
  rating:{
    ratingStar: number,
    ratingBad: number,
    ratingNormal: number,
    ratingGood: number
  }
}
