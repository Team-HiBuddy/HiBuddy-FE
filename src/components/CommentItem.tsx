import AccountCircleSVG from "@assets/account-circle.svg?react";
import { getTimeDiff } from "@utils/date";
import { Comment } from "models/thread";

interface Props {
  comment: Comment;
}

function CommentItem({ comment }: Props) {
  const { nickname, contents, createDate } = comment;

  return (
    <li className="flex gap-x-2">
      <AccountCircleSVG className="min-w-10" />
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2">
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(createDate)}`}</p>
        </div>
        <p>{contents}</p>
      </div>
    </li>
  );
}

export default CommentItem;
