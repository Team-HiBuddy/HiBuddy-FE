import BookmarkSVG from "@assets/bookmark.svg?react";
import BookmarkOutlineSVG from "@assets/bookmark-outline.svg?react";
import { getTimeDiff } from "@utils/date";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import ThumbsUpFillSVG from "@assets/thumbs-up-fill.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { ROUTER_PATH } from "../routerConfig";
import { useNavigate } from "react-router-dom";
import { PostImage } from "@models/thread";
import { Avatar } from "@mui/material";

export interface ThreadListItemContents {
  postId: number;
  nickname: string;
  profileUrl: string;
  date: Date;
  title: string;
  contents: string;
  isLike: boolean;
  isSave: boolean;
  likesCount: number;
  commentsCount: number;
  postImages: PostImage[];
}

interface Props {
  thread: ThreadListItemContents;
}

function ThreadItem({
  thread: {
    postId,
    nickname,
    profileUrl,
    date,
    title,
    contents,
    isLike,
    isSave,
    likesCount,
    commentsCount,
    postImages,
  },
}: Props) {
  const navigate = useNavigate();

  const goToThreadView = () => {
    navigate(ROUTER_PATH.THREAD_VIEW.replace(":postId", postId.toString()));
  };

  return (
    <div
      className="flex flex-col gap-y-2 h-80 p-2 rounded-xl cursor-pointer hover:bg-gray-200"
      onClick={goToThreadView}
    >
      <section className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar src={profileUrl} />
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(date)}`}</p>
        </div>
        {isSave ? <BookmarkSVG /> : <BookmarkOutlineSVG />}
      </section>

      <h3 className="text-lg font-semibold text-ellipsis line-clamp-2">{title}</h3>

      <section className="flex justify-center mt-auto h-36">
        {postImages.length ? (
          <img className="w-36" src={postImages[0].imageUrl} loading="lazy" />
        ) : (
          <p className="text-ellipsis line-clamp-6">{contents}</p>
        )}
      </section>

      <section className="flex justify-between">
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
      </section>
    </div>
  );
}

export default ThreadItem;
