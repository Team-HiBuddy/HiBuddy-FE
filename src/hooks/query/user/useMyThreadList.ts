import { getMyThreadList } from "@apis/user";
import { ThreadContents } from "@models/thread";
import { GetMyThreadListResponse } from "@models/user";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

function useMyThreadList() {
  const queryResult = useSuspenseInfiniteQuery<
    GetMyThreadListResponse,
    Error,
    ThreadContents[],
    [string],
    number
  >({
    queryKey: ["myThreadList"],

    queryFn: ({ pageParam }) => getMyThreadList(pageParam),

    initialPageParam: 0,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result.posts), []),
  });

  return queryResult;
}

export default useMyThreadList;
