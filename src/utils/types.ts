export interface IComment {
  user: string;
  comment: string;
  postId?: String
}

export interface IPost {
  user: string;
  createdAt: Date;
  content: string;
  imgUrl?: string;
  _id?: string;
  postId?: string;
  like: string[];
  dislike: string[];
  comments: IComment[];
}

export interface postUpdate {
  content: string;
  imgUrl?: string;
  postId?: string;
}