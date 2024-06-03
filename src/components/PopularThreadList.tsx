import PopularThreadItem from "./PopularThreadItem";
import usePopularThreads from "@hooks/query/thread/usePopularThreads";

function PopularThreadList() {
  const { data: threads } = usePopularThreads();

  return (
    threads && (
      <div>
        <h2 className="text-xl font-bold px-1 mb-2">Popular</h2>
        <div>
          <ul className="flex flex-col gap-2 border rounded border-inhaSkyBlue p-3">
            {threads.map(({ postId, title, likeNum, commentNum, checkLike }) => (
              <PopularThreadItem
                key={postId}
                thread={{
                  postId,
                  title,
                  commentsCount: commentNum,
                  likesCount: likeNum,
                  isLike: checkLike,
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default PopularThreadList;
