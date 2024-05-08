import AccountCircleSVG from "@assets/account-circle.svg?react";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import { getTimeDiff } from "@utils/date";
import { Comment } from "models/thread";

interface Props {
  comment: Comment;
}

function CommentItem({ comment }: Props) {
  const { name, contents, createDate, likesCount } = comment;

  return (
    <li className="flex gap-x-2">
      <AccountCircleSVG className="min-w-10" />
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2">
          <p>{name}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(createDate)}`}</p>
        </div>
        <p>{contents}</p>
        <div className="flex items-center gap-1 text-red cursor-pointer">
          <ThumbsUpSVG className="w-6" />
          <p className="w-4 text-sm">{likesCount}</p>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;
