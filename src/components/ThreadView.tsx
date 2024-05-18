import BookmarkSVG from "@assets/bookmark.svg?react";
import BookmarkOutlineSVG from "@assets/bookmark-outline.svg?react";
import ThumbsUpSVG from "@assets/thumbs-up.svg?react";
import ThumbsUpFillSVG from "@assets/thumbs-up-fill.svg?react";
import CommentSVG from "@assets/comment.svg?react";
import { getTimeDiff } from "@utils/date";
import CommentList from "./CommentList";
import { Comment, GetThreadResponse } from "models/thread";
import usePageRouter from "@hooks/usePageRouter";
import useThreadMutation from "@hooks/query/useThreadMutation";
import { useEffect } from "react";
import useThreadLike from "@hooks/query/useThreadLike";
import useThreadSave from "@hooks/query/useThreadSave";

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
    checkScrap: isSave,
    isAuthor,
    comments,
    likeNum: likesCount,
    commentNum: commentsCount,
    postImages,
  } = result;

  const {
    deleteResult: { mutate: deleteThread, isSuccess: deleteIsSuccess },
  } = useThreadMutation();

  const {
    likeResult: { mutate: likeThread },
    unlikeResult: { mutate: unlikeThread },
  } = useThreadLike(postId);

  const {
    saveResult: { mutate: saveThread },
    unsaveResult: { mutate: unsaveThread },
  } = useThreadSave(postId);

  const { goToEditThreadPage, goToThreadListPage } = usePageRouter();

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

  const handleClickDelete = () => {
    if (confirm("Are you sure you want to delete this thread?")) {
      deleteThread(postId);
    }
  };

  const handleClickLike = () => {
    result.checkLike = true;
    result.likeNum += 1;

    likeThread();
  };

  const handleClickUnlike = () => {
    result.checkLike = false;
    result.likeNum -= 1;

    unlikeThread();
  };

  const handleClickSave = () => {
    result.checkScrap = true;

    saveThread();
  };

  const handleClickUnsave = () => {
    result.checkScrap = false;

    unsaveThread();
  };

  useEffect(() => {
    if (!deleteIsSuccess) return;

    alert("The deletion is complete.");

    goToThreadListPage();
  }, [deleteIsSuccess]);

  useEffect(() => {}, []);

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
            <>
              <p className="text-red cursor-pointer" onClick={handleClickDelete}>
                Delete
              </p>
              <p className="underline cursor-pointer" onClick={handleClickEdit}>
                Edit
              </p>
            </>
          )}
          {isSave ? (
            <BookmarkSVG className="cursor-pointer animate-pop" onClick={handleClickUnsave} />
          ) : (
            <BookmarkOutlineSVG className="cursor-pointer" onClick={handleClickSave} />
          )}
        </div>
      </section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="line-clamp-4">{contents}</p>
      <section className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red cursor-pointer">
            {isLike ? (
              <ThumbsUpFillSVG className="w-6 animate-pop" onClick={handleClickUnlike} />
            ) : (
              <ThumbsUpSVG className="w-6" onClick={handleClickLike} />
            )}
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
