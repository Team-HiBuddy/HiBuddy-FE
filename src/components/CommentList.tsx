import AccountCircleSVG from "@assets/account-circle.svg?react";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";
import { TextField } from "@mui/material";
import CommentItem from "./CommentItem";
import useThreadComments from "@hooks/query/useThreadComments";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";

interface Props {
  postId: number;
}

function CommentList({ postId }: Props) {
  const { fetchNextPage, hasNextPage, data: comments } = useThreadComments(postId);

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col mt-4 gap-y-8">
      <form className="flex gap-x-3 w-4/5">
        <AccountCircleSVG className="min-w-10" />
        <TextField variant="standard" placeholder="Add a Comment..." fullWidth />
      </form>
      <ul className="flex flex-col gap-y-4">
        {comments?.map(({ comment, commentId, users: { nickname, profileUrl }, createdAt }) => (
          <CommentItem
            key={commentId}
            comment={{ nickname, profileUrl, createdDate: new Date(createdAt), contents: comment }}
          />
        ))}
      </ul>
      <section ref={lastItemRef}>
        {hasNextPage ? (
          <BubbleLoadingSVG className="w-12 h-12 ml-auto mr-auto text-inhaSkyBlue" />
        ) : null}
      </section>
    </div>
  );
}

export default CommentList;
