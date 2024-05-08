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
