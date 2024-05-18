import BookmarkSVG from "@assets/bookmark.svg?react";
import BookmarkOutlineSVG from "@assets/bookmark-outline.svg?react";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { getTimeDiff } from "@utils/date";
import CommentList from "./CommentList";
import { Comment, GetThreadResponse } from "models/thread";
import usePageRouter from "@hooks/usePageRouter";

interface Props {
  threadData: Pick<GetThreadResponse, "result">;
}

function ThreadView({ threadData: { result } }: Props) {
  const {
    postId,
    title,
    content: contents,
    users,
    createdAt,
    checkLike: isLike,
    checkScrap: isSaved,
    isAuthor,
    comments,
    likeNum: likesCount,
    commentNum: commentsCount,
    postImages,
  } = result;

  const { goToEditThreadPage } = usePageRouter();

  const { nickname, profileUrl } = users;
  const createDate = new Date(createdAt);

  const commentList: Comment[] = comments.map((comment) => {
    return {
      id: comment.commentId,
      nickname: comment.users.nickname,
      imageUrl: comment.users.profileUrl,
      contents: comment.comment,
      createDate: new Date(comment.createdAt),
    };
  });

  const handleClickEdit = () => {
    goToEditThreadPage(postId);
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 rounded-xl">
      <section className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <img className="w-8 h-8" src={profileUrl} />
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(createDate)}`}</p>
        </div>
        <div className="flex items-center gap-x-4">
          {isAuthor && (
            <p className="underline cursor-pointer" onClick={handleClickEdit}>
              Edit
            </p>
          )}
          {isSaved ? (
            <BookmarkSVG className="cursor-pointer" />
          ) : (
            <BookmarkOutlineSVG className="cursor-pointer" />
          )}
        </div>
      </section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="line-clamp-4">{contents}</p>
      <section className="flex justify-between">
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
      </section>
      <CommentList comments={commentList} />
    </div>
  );
}

export default ThreadView;
