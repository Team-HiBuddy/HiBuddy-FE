import { ResponseBody } from "./api";

export interface PopularThreadContents {
  postId: number;
  title: string;
  likeNum: number;
  commentNum: number;
}

export interface GetPopularThreadsResponse extends ResponseBody {
  result: PopularThreadContents[];
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
    author: boolean;
    title: string;
    content: string;
    likeNum: number;
    commentNum: number;
    checkLike: boolean;
    checkScrap: boolean;
    createdAt: string;
    user: User;
    postImages: PostImage[];
  };
}

export interface ThreadContents {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  likeNum: number;
  commentNum: number;
  checkLike: boolean;
  checkScrap: boolean;
  user: User;
  postImages: PostImage[];
  author: boolean;
}

export interface ThreadListResult {
  posts: ThreadContents[];
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export interface GetThreadListResponse extends ResponseBody {
  result: ThreadListResult;
}

export interface Comment {
  user: User;
  commentId: number;
  comment: string;
  createdAt: string;
  author: boolean;
}

export interface CommentListResult {
  comments: Comment[];
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export interface GetThreadCommentsResponse extends ResponseBody {
  result: CommentListResult;
}

export interface PostThreadCommentRequest {
  postId: number;
  comment: string;
}
export interface PatchThreadCommentRequest {
  postId: number;
  commentId: number;
  comment: string;
}

export interface DeleteThreadCommentRequest {
  postId: number;
  commentId: number;
}

export interface GetSearchedThreadListResponse extends GetThreadListResponse {}
