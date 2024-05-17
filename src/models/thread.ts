import { ResponseBody } from "./api";

export interface Thread {
  id: number;
  name: string;
  createDate: Date;
  title: string;
  contents: string;
  isStarred: boolean;
  likesCount: number;
  commentsCount: number;
  commentList: Comment[];
}

export interface Comment {
  id: number;
  name: string;
  contents: string;
  imageUrl?: string;
  createDate: Date;
  likesCount: number;
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
  title: string;
  content: string;
  imageIds: number[];
}
