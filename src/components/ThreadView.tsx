import { getTimeDiff } from "@utils/date";
import CommentList from "./CommentList";
import usePageRouter from "@hooks/usePageRouter";
import useThreadMutation from "@hooks/query/thread/useThreadMutation";
import { useEffect } from "react";
import useThreadLike from "@hooks/query/thread/useThreadLike";
import useThreadSave from "@hooks/query/thread/useThreadSave";
import { Avatar, Tooltip } from "@mui/material";
import useThread from "@hooks/query/thread/useThread";
import ThreadsSVG from "./svgIcon/ThreadsSVG";

interface Props {
  postId: number;
}

function ThreadView({ postId }: Props) {
  const {
    data: { result },
    isPending,
    isSuccess,
  } = useThread(postId);

  const {
    title,
    content: contents,
    user,
    createdAt,
    checkLike: isLike,
    checkScrap: isSave,
    author: isAuthor,
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

  const { nickname, profileUrl } = user;
  const createdDate = new Date(createdAt);

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

  useEffect(() => {
    if (isPending) return;

    if (!isSuccess) {
      alert("The thread does not exist.");

      goToThreadListPage();
    }
  }, [isPending]);

  return (
    <div className="flex flex-col gap-y-4 p-2 rounded-xl">
      <section className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar src={profileUrl} />
          <p>{nickname}</p>
          <Tooltip title={createdDate.toUTCString()}>
            <p className="text-gray-400">{`· ${getTimeDiff(createdDate)}`}</p>
          </Tooltip>
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
            <ThreadsSVG
              id="bookmark"
              className="w-8 h-8 cursor-pointer animate-pop"
              onClick={handleClickUnsave}
            />
          ) : (
            <ThreadsSVG
              id="bookmark-outline"
              className="w-8 h-8 cursor-pointer"
              onClick={handleClickSave}
            />
          )}
        </div>
      </section>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{contents}</p>
      <section className="flex flex-col gap-y-2">
        {postImages.map((image) => (
          <img key={image.imageId} src={image.imageUrl} loading="lazy" />
        ))}
      </section>
      <section className="flex justify-between">
        <div className="flex gap-4 mr-auto">
          <div className="flex items-center gap-1 text-red cursor-pointer">
            {isLike ? (
              <ThreadsSVG
                id="thumbs-up-fill"
                className="w-6 h-6 animate-pop"
                onClick={handleClickUnlike}
              />
            ) : (
              <ThreadsSVG id="thumbs-up" className="w-6 h-6" onClick={handleClickLike} />
            )}
            <p className="w-4 text-sm">{likesCount}</p>
          </div>
          <div className="flex gap-1 items-center text-inhaDeepBlue">
            <ThreadsSVG id="comment" className="w-6 h-6" />
            <p className="w-4 text-sm">{commentsCount}</p>
          </div>
        </div>
      </section>
      <CommentList postId={postId} />
    </div>
  );
}

export default ThreadView;
