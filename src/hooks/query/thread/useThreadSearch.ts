import { searchThread } from "@apis/thread";
import { GetSearchedThreadListResponse, ThreadContents } from "@models/thread";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

function useThreadSearch(keyword: string) {
  const queryResult = useSuspenseInfiniteQuery<
    GetSearchedThreadListResponse,
    Error,
    ThreadContents[],
    [string, string],
    number
  >({
    queryKey: ["searchThread", keyword],

    queryFn: ({ pageParam }) => searchThread(keyword, pageParam),

    initialPageParam: 1,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<ThreadContents[]>((acc, { result }) => acc.concat(result.posts), []),
  });

  return queryResult;
}

export default useThreadSearch;
