import { ResponseBody } from "./api";

export interface Thread {
  id: number;
  nickname: string;
  createDate: Date;
  title: string;
  contents: string;
  isSaved: boolean;
  likesCount: number;
  commentsCount: number;
  commentList: Comment[];
}

export interface Comment {
  id: number;
  nickname: string;
  contents: string;
  imageUrl?: string;
  createDate: Date;
}

export interface GetPopularThreadsResponse extends ResponseBody {
  result: {
    postId: number;
    title: string;
    likeNum: number;
    commentNum: number;
  }[];
}

export type PopularThreadContents = Pick<Thread, "id" | "title" | "likesCount" | "commentsCount">;

export interface PostThreadImagesResponse extends ResponseBody {
  result: {
    imageIds: number[];
  };
}

export interface PostThreadRequest {
  title: string;
  content: string;
  imageIds: number[];
}

export interface PostThreadResponse extends ResponseBody {
  result: {
    postId: number;
  };
}

export interface PatchThreadRequest {
  postId: number;
  title: string;
  content: string;
  imageIds: number[];
}

interface users {
  userId: number;
  nickname: string;
  profileUrl: string;
}

export interface GetThreadResponse extends ResponseBody {
  result: {
    postId: number;
    isAuthor: boolean;
    title: string;
    content: string;
    likeNum: number;
    commentNum: number;
    checkLike: boolean;
    checkScrap: boolean;
    createdAt: string;
    users: users;
    comments: { users: users; commentId: number; comment: string; createdAt: string }[];
    postImages: { imageId: number; imageUrl: string }[];
  };
}
