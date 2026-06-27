import { User } from "./user.types";

export interface Post {
  _id: string;
  content: string;

  author: User;

  commentsCount: number;

  likes: string[];

  createdAt: string;
}

export interface Comment {
  _id: string;

  author: User;

  text: string;

  createdAt: string;
}
