import ThreadItem from "./ThreadItem";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import { ThreadContents } from "@models/thread";
import { UseSuspenseInfiniteQueryResult } from "@tanstack/react-query";
import emptyBox from "@assets/empty-box.png";
import ThreadItemSkeleton from "./skeleton/ThreadItemSkeleton";

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

  return (
    <div>
      {threadList.length > 0 ? (
        <ul className="flex flex-col gap-y-2 p-2">
          {threadList.map((thread) => (
            <li key={thread.postId} className="flex flex-col gap-y-4 mb-2">
              <ThreadItem
                thread={{
                  postId: thread.postId,
                  title: thread.title,
                  nickname: thread.users.nickname,
                  profileUrl: thread.users.profileUrl,
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
      ) : (
        <div className="flex flex-col items-center gap-y-8 mt-10">
          <img src={emptyBox} className="w-2/5 h-2/5 " />
          <p className="font-bold text-2xl">There is nothing yet.</p>
        </div>
      )}
      <section ref={lastItemRef}>{hasNextPage ? <ThreadItemSkeleton /> : null}</section>
    </div>
  );
}

export default ThreadList;
