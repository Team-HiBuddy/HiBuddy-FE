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

    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result), []),
  });

  return queryResult;
}

export default useSavedThreadList;
