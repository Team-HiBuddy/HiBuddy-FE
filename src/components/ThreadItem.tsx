import { getTimeDiff } from "@utils/date";
import { ROUTER_PATH } from "../routerConfig";
import { useNavigate } from "react-router-dom";
import { PostImage } from "@models/thread";
import { Avatar } from "@mui/material";
import ThreadsSVG from "./svgIcon/ThreadsSVG";

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
      className="flex flex-col gap-y-2 p-2 rounded-xl cursor-pointer hover:bg-gray-200"
      onClick={goToThreadView}
    >
      <section className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar src={profileUrl} />
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(date)}`}</p>
        </div>
        {isSave ? (
          <ThreadsSVG id="bookmark" className="w-8 h-8" />
        ) : (
          <ThreadsSVG id="bookmark-outline" className="w-8 h-8" />
        )}
      </section>

      <h3 className="text-lg font-semibold text-ellipsis line-clamp-1">{title}</h3>

      <section className="flex justify-center mt-auto">
        {postImages.length ? (
          <img className="w-36" src={postImages[0].imageUrl} loading="lazy" />
        ) : (
          <p className="w-full text-ellipsis line-clamp-3">{contents}</p>
        )}
      </section>

      <section className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red">
            {isLike ? (
              <ThreadsSVG id="thumbs-up-fill" className="w-6 h-6" />
            ) : (
              <ThreadsSVG id="thumbs-up" className="w-6 h-6" />
            )}
            <p className="w-4 text-sm">{likesCount}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <ThreadsSVG id="comment" className="w-6 h-6" />
            <p className="w-4 text-sm">{commentsCount}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ThreadItem;
