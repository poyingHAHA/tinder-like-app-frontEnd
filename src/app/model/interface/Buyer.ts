import { BuyerFollow, LikeItem, ShopFollow, TinderItem } from "./Partial"

export interface Buyer
{
  role: string,
  awardcoin: Number,
  account: string,
  password: string,
  profilePic: string
  selfIntro: string,
  likes: LikeItem[],
  follower: {
    buyer: BuyerFollow[],
    shop: ShopFollow[],
    count: number,
  },
  following: {
    buyer: BuyerFollow[],
    shop: ShopFollow[],
    count: number,
  },
  tinderLike: TinderItem[],
  tinderDislike: TinderItem[],
}
