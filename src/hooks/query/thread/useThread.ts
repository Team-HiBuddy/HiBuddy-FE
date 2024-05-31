import { getThread } from "@apis/thread";
import { GetThreadResponse } from "@models/thread";
import { useSuspenseQuery } from "@tanstack/react-query";

function useThread(postId: number) {
  const queryResult = useSuspenseQuery<
    GetThreadResponse,
    Error,
    GetThreadResponse,
    [string, number]
  >({
    queryKey: ["thread", postId],
    queryFn: () => getThread(postId),
  });

  return queryResult;
}

export default useThread;
