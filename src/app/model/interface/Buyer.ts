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
  selfIntro: string,
  public: boolean,
  followerCount: number,
  followingCount: number,
  superLikeLeft: number,
  profilePic: string,
  birthday: string,
  refreshToken: String
}
