import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";
import CommentItem from "./CommentItem";
import useThreadComment from "@hooks/query/thread/useThreadComment";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import CommentInput from "./CommentInput";

interface Props {
  postId: number;
}

function CommentList({ postId }: Props) {
  const { fetchNextPage, hasNextPage, data: comments } = useThreadComment(postId);

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col mt-4 gap-y-8">
      <CommentInput postId={postId} />
      <ul className="flex flex-col gap-y-4">
        {comments?.map(
          ({ comment, commentId, users: { nickname, profileUrl }, createdAt, isAuthor }) => (
            <CommentItem
              key={commentId}
              comment={{
                postId,
                commentId,
                nickname,
                profileUrl,
                createdDate: new Date(createdAt),
                contents: comment,
                isAuthor,
              }}
            />
          )
        )}
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
