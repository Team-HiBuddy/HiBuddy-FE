import { postThreadComment, deleteThreadComment, patchThreadComment } from "@apis/thread";
import { ResponseBody } from "@models/api";
import {
  DeleteThreadCommentRequest,
  PatchThreadCommentRequest,
  PostThreadCommentRequest,
} from "@models/thread";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function useThreadCommentMutation(postId: number) {
  const postResult = useMutation<ResponseBody, Error, PostThreadCommentRequest>({
    mutationFn: postThreadComment,
  });

  const deleteResult = useMutation<ResponseBody, Error, DeleteThreadCommentRequest>({
    mutationFn: deleteThreadComment,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
  });

  const patchResult = useMutation<ResponseBody, Error, PatchThreadCommentRequest>({
    mutationFn: patchThreadComment,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
  });

  return { postResult, deleteResult, patchResult };
}

export default useThreadCommentMutation;
