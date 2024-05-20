import useThreadList from "@hooks/query/useThreadList";
import ThreadItem from "./ThreadItem";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";

function ThreadList() {
  const { fetchNextPage, data: threadList, hasNextPage } = useThreadList();

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div>
      <ul className="flex flex-col gap-y-2 p-2">
        {threadList?.map((thread, idx) => (
          <li key={thread.postId} className="flex flex-col gap-y-4 mb-2">
            {idx > 0 && <div className="border w-full h-0"></div>}
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
          </li>
        ))}
      </ul>
      <section ref={lastItemRef}>
        {hasNextPage ? (
          <BubbleLoadingSVG className="w-20 h-20 ml-auto mr-auto text-inhaSkyBlue" />
        ) : null}
      </section>
    </div>
  );
}

export default ThreadList;
