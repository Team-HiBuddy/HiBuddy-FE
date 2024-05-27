import { getMyThreadList } from "@apis/user";
import { ThreadContents } from "@models/thread";
import { GetMyThreadListResponse } from "@models/user";
import { useInfiniteQuery } from "@tanstack/react-query";

function useMyThreadList() {
  const queryResult = useInfiniteQuery<
    GetMyThreadListResponse,
    Error,
    ThreadContents[],
    [string],
    number
  >({
    queryKey: ["myThreadList"],

    queryFn: ({ pageParam }) => getMyThreadList(pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result), []),
  });

  return queryResult;
}

export default useMyThreadList;
