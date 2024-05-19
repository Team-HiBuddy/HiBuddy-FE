import AccountCircleSVG from "@assets/account-circle.svg?react";
import { TextField } from "@mui/material";
import CommentItem from "./CommentItem";

export interface Comment {
  id: number;
  nickname: string;
  contents: string;
  imageUrl?: string;
  createDate: Date;
}

interface Props {
  comments: Comment[];
}

function CommentList({ comments }: Props) {
  return (
    <div className="flex flex-col mt-4 gap-y-8">
      <div className="flex gap-x-3 w-4/5">
        <AccountCircleSVG className="min-w-10" />
        <TextField variant="standard" placeholder="Add a Comment..." fullWidth />
      </div>
      <ul className="flex flex-col gap-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
