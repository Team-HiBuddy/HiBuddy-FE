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

    initialPageParam: 1,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<Comment[]>((acc, { result }) => acc.concat(result.comments), []),
  });

  return queryResult;
}

export default useThreadComment;
