import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { PopularThreadContents } from "@models/thread";

interface Props {
  thread: PopularThreadContents;
}

function PopularThread({ thread }: Props) {
  return (
    <li className="flex flex-col gap-1">
      <p className="text-ellipsis text-nowrap overflow-hidden">{thread.title}</p>
      <div className="flex justify-end gap-4 ml-auto">
        <div className="flex items-center gap-1 text-red">
          <ThumbsUpSVG className="w-5" />
          <p className="w-4 text-sm">{thread.likesCount}</p>
        </div>
        <div className="flex gap-1 items-center text-inhaDeepBlue">
          <CommentSVG className="w-5" />
          <p className="w-4 text-sm">{thread.commentsCount}</p>
        </div>
      </div>
    </li>
  );
}

export default PopularThread;
