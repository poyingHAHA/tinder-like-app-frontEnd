import { BuyerFollow, LikeItem, ShopFollow, TinderItem } from "./Partial"

export interface Buyer
{
  role: string,
  awardcoin: Number,
  account: string,
  email: string,
  password: string,
  salt: string,
  verify_token: string,
  verify_expire: string,
  active: boolean,
  gender: string,
  profilePic: string
  selfIntro: string,
  followerCount: number,
  followingCount: number,
  superLikeLeft: number,
  refreshToken: String
}
