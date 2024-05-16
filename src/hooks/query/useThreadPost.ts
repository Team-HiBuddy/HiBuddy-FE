import { deletePost, postThread } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { PostThreadRequest, PostThreadResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";

function useThreadPost() {
  const postResult = useMutation<PostThreadResponse, Error, PostThreadRequest>({
    mutationFn: postThread,
  });

  const deleteResult = useMutation<ResponseBody, Error, number>({
    mutationFn: deletePost,
  });

  return { postResult, deleteResult };
}

export default useThreadPost;
