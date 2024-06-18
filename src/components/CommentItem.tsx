import useThreadCommentMutation from "@hooks/query/thread/useThreadCommentMutation";
import { Avatar, TextField, Tooltip } from "@mui/material";
import { getTimeDiff } from "@utils/date";
import { KeyboardEvent, useRef, useState } from "react";

export interface CommentItemContents {
  postId: number;
  commentId: number;
  nickname: string;
  createdDate: Date;
  contents: string;
  profileUrl: string;
  isAuthor: boolean;
}

interface Props {
  comment: CommentItemContents;
}

function CommentItem({ comment }: Props) {
  const { postId, commentId, nickname, profileUrl, contents, createdDate, isAuthor } = comment;

  const [isModifying, setIsModifying] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    patchResult: { mutate: patchComment },
    deleteResult: { mutate: deleteComment },
  } = useThreadCommentMutation(postId);

  const handleClickDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteComment({ postId, commentId });
    }
  };

  const handleClickEdit = () => {
    setIsModifying(true);
  };

  const handleClickSave = () => {
    if (!inputRef.current) return;

    patchComment({ postId, commentId, comment: inputRef.current.value });

    comment.contents = inputRef.current.value;

    setIsModifying(false);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSave();
    }
  };

  return (
    <li className="flex gap-x-2">
      <Avatar src={profileUrl} />
      <div className="flex flex-col gap-y-1 w-full">
        <div className="flex gap-x-2">
          <p>{nickname}</p>
          <Tooltip title={createdDate.toString()}>
            <p className="text-gray-400">{`· ${getTimeDiff(createdDate)}`}</p>
          </Tooltip>
          {isAuthor && (
            <div className="flex gap-x-4 ml-auto">
              <p className="text-red cursor-pointer" onClick={handleClickDelete}>
                Delete
              </p>
              {isModifying ? (
                <p
                  className="text-inhaDeepBlue font-semibold underline cursor-pointer"
                  onClick={handleClickSave}
                >
                  Save
                </p>
              ) : (
                <p className="underline cursor-pointer" onClick={handleClickEdit}>
                  Edit
                </p>
              )}
            </div>
          )}
        </div>
        {isModifying ? (
          <TextField
            variant="standard"
            placeholder="Add a Comment..."
            fullWidth
            defaultValue={contents}
            inputRef={inputRef}
            onKeyDown={handleKeydown}
          />
        ) : (
          <p className="break-all">{contents}</p>
        )}
      </div>
    </li>
  );
}

export default CommentItem;
