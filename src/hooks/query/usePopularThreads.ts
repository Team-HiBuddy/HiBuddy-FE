import { getPopularThreads } from "@apis/thread";
import { useQuery } from "@tanstack/react-query";
import { GetPopularThreadsResponse, PopularThreadContents } from "models/thread";

function usePopularThreads() {
  const queryResult = useQuery<GetPopularThreadsResponse, Error, PopularThreadContents[]>({
    queryKey: ["popularThreads"],

    queryFn: getPopularThreads,

    select: (data) =>
      data.result.map((value) => {
        return {
          id: value.postId,
          title: value.title,
          commentsCount: value.commentNum,
          likesCount: value.likeNum,
        };
      }),
  });

  return { data: queryResult.data };
}

export default usePopularThreads;
