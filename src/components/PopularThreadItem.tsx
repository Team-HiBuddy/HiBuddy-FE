import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import ThumbsUpFillSVG from "@assets/thumbs-up-fill.svg?react";
import { ThreadListItemContents } from "./ThreadItem";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "../routerConfig";

export type PopularThreadContents = Pick<
  ThreadListItemContents,
  "postId" | "title" | "likesCount" | "commentsCount" | "isLike"
>;

interface Props {
  thread: PopularThreadContents;
}

function PopularThreadItem({ thread }: Props) {
  return (
    <li className="flex flex-col gap-1">
      <Link
        className="hover:bg-gray-200"
        to={ROUTER_PATH.THREAD_VIEW.replace(":postId", thread.postId.toString())}
      >
        <p className="text-ellipsis text-nowrap overflow-hidden">{thread.title}</p>
        <div className="flex justify-end gap-4 ml-auto">
          <div className="flex items-center gap-1 text-red">
            {thread.isLike ? <ThumbsUpFillSVG className="w-5" /> : <ThumbsUpSVG className="w-5" />}
            <p className="w-4 text-sm">{thread.likesCount}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <CommentSVG className="w-5" />
            <p className="w-4 text-sm">{thread.commentsCount}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PopularThreadItem;
