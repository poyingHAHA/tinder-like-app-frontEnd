
export interface IComment{
  commentID: string,
  userID: string, //誰留的
  postID: string, //留言貼文
  content: string,
  pics: string[],
  time: string,
  likes: string,
  replies: string[] //commentid 按了才發request
}




