import ThreadItem from "./ThreadItem";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";
import { ThreadContents } from "@models/thread";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import emptyBox from "@assets/empty-box.png";

interface Props {
  infiniteQueryResult: UseInfiniteQueryResult<ThreadContents[]>;
}

function ThreadList({ infiniteQueryResult }: Props) {
  const { data: threadList, fetchNextPage, hasNextPage, isPending } = infiniteQueryResult;

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return isPending ? (
    <BubbleLoadingSVG className="w-14 h-14 m-auto mt-16 text-inhaSkyBlue" />
  ) : (
    <div>
      {threadList && threadList.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center gap-y-8 mt-10">
          <img src={emptyBox} className="w-2/5 h-2/5 " />
          <p className="font-bold text-2xl">There is nothing yet.</p>
        </div>
      )}
      <section ref={lastItemRef}>
        {hasNextPage ? (
          <BubbleLoadingSVG className="w-14 h-14 ml-auto mr-auto text-inhaSkyBlue" />
        ) : null}
      </section>
    </div>
  );
}

export default ThreadList;
