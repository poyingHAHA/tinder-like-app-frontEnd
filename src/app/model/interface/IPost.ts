import { IUser } from './IUser';
import { IProduct } from './IProduct';
import { IComment } from "./IComment";

export interface IPost{
  postID: string,
  productID: string,
  userID: string,
  images: string[],
  coverImage: string,
  article: string,
  time: string, //create time
  likes: number,
  comments: string[] //commentID
}
