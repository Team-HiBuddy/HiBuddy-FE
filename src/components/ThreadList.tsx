import useThreadList from "@hooks/query/useThreadList";
import Thread from "./Thread";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";

function ThreadList() {
  const { fetchNextPage, data: threadList, hasNextPage } = useThreadList();

  const lastItemRef = useRef<HTMLLIElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.2 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div>
      <ul className="flex flex-col gap-y-2 p-2">
        {threadList?.map((thread, idx) => (
          <li
            key={thread.postId}
            className="flex flex-col gap-y-4 mb-2"
            ref={idx === threadList.length - 1 ? lastItemRef : null}
          >
            {idx > 0 && <div className="border w-full h-0"></div>}
            <Thread
              thread={{
                postId: thread.postId,
                title: thread.title,
                nickname: thread.users.nickname,
                contents: thread.content,
                date: new Date(thread.createdAt),
                isLike: thread.checkLike,
                isSave: thread.checkScrap,
                likesCount: thread.likeNum,
                commentsCount: thread.commentNum,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
