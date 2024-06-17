import { getTestHistory } from "@apis/koreanTest";
import { GetTestHistoryResponse, TestRecord } from "@models/koreanTest";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const useTestHistory = () => {
  const queryResult = useSuspenseInfiniteQuery<
    GetTestHistoryResponse,
    Error,
    TestRecord[],
    [string],
    number
  >({
    queryKey: ["testHistory"],

    queryFn: ({ pageParam }) => getTestHistory(pageParam),

    initialPageParam: 1,

    getNextPageParam: ({ result }) => (result.last ? undefined : result.number + 1),

    select: ({ pages }) =>
      pages.reduce<TestRecord[]>((acc, { result }) => acc.concat(result.test), []),
  });

  return queryResult;
};

export default useTestHistory;
