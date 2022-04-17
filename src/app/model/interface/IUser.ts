import { IPost } from "./IPost";
import { IProduct } from "./IProduct";

export interface IUser{
  userID: string, //mongodb 自己生成
  userName: string,
  userOwnID: string,
  account: string,
  password: string,
  userPic: string,
  sharePosts: string[], //productID
  followers: string[], //userID
  following: string[], //userID
  selfIntroduction: string,
  likes: ILikeProduct[],
  dislikes: ILikeProduct[],
  history: IProduct[],
  role: 'seller' | 'buyer' | 'admin',
  recommendPool: {
    productID: string,
    totalScore: number
  }[]
}

interface ILikeProduct
{
  productID: string, //productID
  stayTime: number,
  score: number
  swipeDate: string
}
