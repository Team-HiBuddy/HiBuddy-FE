import { getPopularThreads } from "@apis/thread";
import { useQuery } from "@tanstack/react-query";
import { GetPopularThreadsResponse, PopularThreadContents } from "models/thread";

function usePopularThreads() {
  const queryResult = useQuery<GetPopularThreadsResponse, Error, PopularThreadContents[]>({
    queryKey: ["popularThreads"],

    queryFn: getPopularThreads,

    select: (data) => data.result,
  });

  return queryResult;
}

export default usePopularThreads;
