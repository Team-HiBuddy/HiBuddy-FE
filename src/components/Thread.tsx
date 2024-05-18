import AccountCircleSVG from "@assets/account-circle.svg?react";
import BookmarkSVG from "@assets/bookmark.svg?react";
import BookmarkOutlineSVG from "@assets/bookmark-outline.svg?react";
import { getTimeDiff } from "@utils/date";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import ThumbsUpFillSVG from "@assets/thumbs-up-fill.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { ROUTER_PATH } from "../router";
import { useNavigate } from "react-router-dom";

export interface ThreadListItemContents {
  postId: number;
  nickname: string;
  date: Date;
  title: string;
  contents: string;
  isLike: boolean;
  isSave: boolean;
  likesCount: number;
  commentsCount: number;
}

interface Props {
  thread: ThreadListItemContents;
}

function Thread({
  thread: { postId, nickname, date, title, contents, isLike, isSave, likesCount, commentsCount },
}: Props) {
  const navigate = useNavigate();

  const goToThreadView = () => {
    navigate(ROUTER_PATH.THREAD_VIEW.replace(":postId", postId.toString()));
  };

  return (
    <div
      className="flex flex-col gap-y-2 p-2 rounded-xl cursor-pointer hover:bg-gray-200"
      onClick={goToThreadView}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <AccountCircleSVG />
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(date)}`}</p>
        </div>
        {isSave ? <BookmarkSVG /> : <BookmarkOutlineSVG />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="line-clamp-4">{contents}</p>
      <div className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red">
            {isLike ? <ThumbsUpFillSVG className="w-6" /> : <ThumbsUpSVG className="w-6" />}
            <p className="w-4 text-sm">{likesCount}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <CommentSVG className="w-6" />
            <p className="w-4 text-sm">{commentsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thread;
