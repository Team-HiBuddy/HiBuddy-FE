import AccountCircleSVG from "@assets/account-circle.svg?react";
import { getTimeDiff } from "@utils/date";
import Star from "@assets/star.svg?react";
import StarOutline from "@assets/star-outline.svg?react";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { ROUTER_PATH } from "../router";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  date: Date;
  title: string;
  contents: string;
  isStarred: boolean;
  likes: number;
  comments: number;
}

function Thread({ id, name, date, title, contents, isStarred, likes, comments }: Props) {
  const navigate = useNavigate();

  const goToThreadView = () => {
    navigate(ROUTER_PATH.THREAD_VIEW.replace(":postId", id.toString()));
  };

  return (
    <div
      className="flex flex-col gap-y-2 p-2 rounded-xl cursor-pointer hover:bg-gray-200"
      onClick={goToThreadView}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <AccountCircleSVG />
          <p>{name}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(date)}`}</p>
        </div>
        {isStarred ? <Star /> : <StarOutline />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="line-clamp-4">{contents}</p>
      <div className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red">
            <ThumbsUpSVG className="w-6" />
            <p className="w-4 text-sm">{likes}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <CommentSVG className="w-6" />
            <p className="w-4 text-sm">{comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thread;
