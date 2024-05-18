import { deleteThread, patchThread, postThread } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { PatchThreadRequest, PostThreadRequest, PostThreadResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";

function useThreadMutation() {
  const postResult = useMutation<PostThreadResponse, Error, PostThreadRequest>({
    mutationFn: postThread,
  });

  const deleteResult = useMutation<ResponseBody, Error, number>({
    mutationFn: deleteThread,
  });

  const patchResult = useMutation<ResponseBody, Error, PatchThreadRequest>({
    mutationFn: patchThread,
  });

  return { postResult, deleteResult, patchResult };
}

export default useThreadMutation;