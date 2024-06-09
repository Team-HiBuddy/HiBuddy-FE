import { getThreadList } from "@apis/thread";
import { GetThreadListResponse, ThreadContents } from "@models/thread";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

function useThreadList() {
  const queryResult = useSuspenseInfiniteQuery<
    GetThreadListResponse,
    Error,
    ThreadContents[],
    [string],
    number
  >({
    queryKey: ["threadList"],

    queryFn: ({ pageParam }) => getThreadList(pageParam),

    initialPageParam: 0,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result.posts), []),
  });

  return queryResult;
}

export default useThreadList;
