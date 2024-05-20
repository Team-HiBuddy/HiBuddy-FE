import { ResponseBody } from "./api";

export interface GetPopularThreadsResponse extends ResponseBody {
  result: {
    postId: number;
    title: string;
    likeNum: number;
    commentNum: number;
  }[];
}

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

interface User {
  userId: number;
  nickname: string;
  profileUrl: string;
}

export interface PostImage {
  imageId: number;
  imageUrl: string;
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
    users: User;
    postImages: PostImage[];
  };
}

export interface ThreadContents {
  postId: number;
  title: string;
  content: string;
  likeNum: number;
  commentNum: number;
  checkLike: boolean;
  checkScrap: boolean;
  createdAt: string;
  users: User;
  postImages: PostImage[];
}

export interface GetThreadListResponse extends ResponseBody {
  result: ThreadContents[];
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  number: 1;
  numberOfElements: number;
}

export interface Comment {
  users: User;
  commentId: number;
  comment: string;
  createdAt: string;
}

export interface GetThreadCommentsResponse extends ResponseBody {
  result: Comment[];
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  number: 1;
  numberOfElements: number;
}
