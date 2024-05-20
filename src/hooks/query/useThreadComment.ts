import { getThreadComments } from "@apis/thread";
import { Comment, GetThreadCommentsResponse } from "@models/thread";
import { useInfiniteQuery } from "@tanstack/react-query";

function useThreadComment(postId: number) {
  const queryResult = useInfiniteQuery<
    GetThreadCommentsResponse,
    Error,
    Comment[],
    [string, number],
    number
  >({
    queryKey: ["comments", postId],

    queryFn: ({ pageParam }) => getThreadComments(postId, pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.number + 1),

    select: ({ pages }) => pages.reduce<Comment[]>((acc, { result }) => acc.concat(result), []),
  });

  return queryResult;
}

export default useThreadComment;
