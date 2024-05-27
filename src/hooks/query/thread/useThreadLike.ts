import { likeThread, unlikeThread } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

function useThreadLike(postId: number) {
  const likeResult = useMutation<ResponseBody, Error>({
    mutationFn: () => likeThread(postId),

    onSettled: async () => queryClient.invalidateQueries({ queryKey: ["thread", postId] }),
  });

  const unlikeResult = useMutation<ResponseBody, Error>({
    mutationFn: () => unlikeThread(postId),

    onSettled: async () => queryClient.invalidateQueries({ queryKey: ["thread", postId] }),
  });

  return { likeResult, unlikeResult };
}

export default useThreadLike;
