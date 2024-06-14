import ThreadItem from "./ThreadItem";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { ThreadContents } from "@models/thread";
import { UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";
import ThreadItemSkeleton from "./skeleton/ThreadItemSkeleton";
import EmptyThreadList from "./EmptyThreadList";

interface Props {
  infiniteQuery: () => UseSuspenseInfiniteQueryResult<ThreadContents[]>;
}

function ThreadList({ infiniteQuery }: Props) {
  const { data: threadList, fetchNextPage, hasNextPage } = infiniteQuery();

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  if (threadList.length < 1) {
    return <EmptyThreadList />;
  }

  return (
    <div>
      <ul className="flex flex-col gap-y-2 p-2">
        {threadList.map((thread) => (
          <li key={thread.postId} className="flex flex-col gap-y-4 mb-2">
            <ThreadItem
              thread={{
                postId: thread.postId,
                title: thread.title,
                nickname: thread.user.nickname,
                profileUrl: thread.user.profileUrl,
                contents: thread.content,
                date: new Date(thread.createdAt),
                isLike: thread.checkLike,
                isSave: thread.checkScrap,
                likesCount: thread.likeNum,
                commentsCount: thread.commentNum,
                postImages: thread.postImages,
              }}
            />
            <hr className="w-full" />
          </li>
        ))}
      </ul>
      <section ref={lastItemRef}>{hasNextPage ? <ThreadItemSkeleton /> : null}</section>
    </div>
  );
}

export default ThreadList;
