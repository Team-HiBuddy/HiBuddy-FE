import { getSavedThreadList } from "@apis/user";
import { ThreadContents } from "@models/thread";
import { GetSavedThreadListResponse } from "@models/user";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

function useSavedThreadList() {
  const queryResult = useSuspenseInfiniteQuery<
    GetSavedThreadListResponse,
    Error,
    ThreadContents[],
    [string],
    number
  >({
    queryKey: ["savedThreadList"],

    queryFn: ({ pageParam }) => getSavedThreadList(pageParam),

    initialPageParam: 0,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result.posts), []),
  });

  return queryResult;
}

export default useSavedThreadList;
