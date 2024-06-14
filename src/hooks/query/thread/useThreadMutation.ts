import { deleteThread, patchThread, postThread } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { PatchThreadRequest, PostThreadRequest, PostThreadResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

function useThreadMutation(postId?: number) {
  const postResult = useMutation<PostThreadResponse, Error, PostThreadRequest>({
    mutationFn: postThread,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["myThreadList"] }),
  });

  const deleteResult = useMutation<ResponseBody, Error, number>({
    mutationFn: deleteThread,
  });

  const patchResult = useMutation<ResponseBody, Error, PatchThreadRequest>({
    mutationFn: patchThread,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["thread", postId] }),
  });

  return { postResult, deleteResult, patchResult };
}

export default useThreadMutation;
