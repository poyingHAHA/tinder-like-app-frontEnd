import { BuyerFollow, ShopFollow } from "./Partial"

export interface Shop
{
  buyerid: string,
  createdAt: string,
  email: string,
  followerCount: number,
  likeCount: number,
  profilePic: string,
  public: boolean,
  rating: {
    ratingBad: number,
    ratingGood: number,
    ratingNormal: number,
    ratingStar: number
  }
  role: string,
  selfIntro: string,
  shopAccount: string,
  sp_shopid: string,
  updatedAt: string
}
