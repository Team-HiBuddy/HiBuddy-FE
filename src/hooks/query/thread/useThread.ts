import { getThread } from "@apis/thread";
import { GetThreadResponse } from "@models/thread";
import { useQuery } from "@tanstack/react-query";

function useThread(postId: number) {
  const queryResult = useQuery<GetThreadResponse, Error, GetThreadResponse, [string, number]>({
    queryKey: ["thread", postId],
    queryFn: () => getThread(postId),
  });

  return queryResult;
}

export default useThread;
