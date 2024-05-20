import useProfile from "@hooks/query/userProfile";
import { Avatar, IconButton, TextField } from "@mui/material";
import SendSVG from "@assets/send.svg?react";
import useThreadCommentMutation from "@hooks/query/useThreadCommentMutation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface Props {
  postId: number;
}

function CommentInput({ postId }: Props) {
  const { data } = useProfile();

  const [comment, setComment] = useState<string>("");

  const {
    postResult: { mutate: postComment, isPending },
  } = useThreadCommentMutation(postId);

  const handleClickSend = () => {
    postComment({ postId, comment });

    setComment("");
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && 1 < comment.trim().length) {
      handleClickSend();
    }
  };

  return (
    <div className="flex gap-x-3">
      <Avatar src={data?.profileUrl} />
      <TextField
        variant="standard"
        placeholder="Add a Comment..."
        fullWidth
        value={comment}
        onChange={handleChangeComment}
        onKeyDown={handleKeydown}
      />
      <IconButton
        size="small"
        disabled={isPending || comment.trim().length < 1}
        onClick={handleClickSend}
      >
        <SendSVG />
      </IconButton>
    </div>
  );
}

export default CommentInput;
