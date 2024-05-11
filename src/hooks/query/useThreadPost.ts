import { postThread } from "@apis/thread";
import { PostThreadRequest, PostThreadResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";

function useThreadPost() {
  const queryResult = useMutation<PostThreadResponse, Error, PostThreadRequest>({
    mutationFn: postThread,
  });

  return queryResult;
}

export default useThreadPost;
