import AccountCircleSVG from "@assets/account-circle.svg?react";
import BookmarkSVG from "@assets/bookmark.svg?react";
import BookmarkOutlineSVG from "@assets/bookmark-outline.svg?react";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { getTimeDiff } from "@utils/date";
import CommentList from "./CommentList";
import { Thread } from "models/thread";

interface Props {
  thread: Thread;
}

function ThreadView({ thread }: Props) {
  const { title, contents, name, createDate, isStarred, commentList, likesCount, commentsCount } =
    thread;

  return (
    <div className="flex flex-col gap-y-2 p-2 rounded-xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <AccountCircleSVG />
          <p>{name}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(createDate)}`}</p>
        </div>
        {isStarred ? (
          <BookmarkSVG className="cursor-pointer" />
        ) : (
          <BookmarkOutlineSVG className="cursor-pointer" />
        )}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="line-clamp-4">{contents}</p>
      <div className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red cursor-pointer">
            <ThumbsUpSVG className="w-6" />
            <p className="w-4 text-sm">{likesCount}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <CommentSVG className="w-6" />
            <p className="w-4 text-sm">{commentsCount}</p>
          </div>
        </div>
      </div>
      <CommentList comments={commentList} />
    </div>
  );
}

export default ThreadView;
