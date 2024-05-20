import { ResponseBody } from "@models/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { saveThread, unsaveThread } from "@apis/thread";

function useThreadSave(postId: number) {
  const saveResult = useMutation<ResponseBody, Error>({
    mutationFn: () => saveThread(postId),

    onSettled: async () => queryClient.invalidateQueries({ queryKey: ["thread", postId] }),
  });

  const unsaveResult = useMutation<ResponseBody, Error>({
    mutationFn: () => unsaveThread(postId),

    onSettled: async () => queryClient.invalidateQueries({ queryKey: ["thread", postId] }),
  });

  return { saveResult, unsaveResult };
}

export default useThreadSave;
