import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getTestScripts, postKoreanTestRecording } from "@apis/koreanTest";
import {
  GetTestScriptsResponse,
  PostTestRecordingRequest,
  PostTestRecordingResponse,
  TestScript,
} from "@models/koreanTest";
import { queryClient } from "../queryClient";

function useKoreanTest() {
  const postResult = useMutation<PostTestRecordingResponse, Error, PostTestRecordingRequest>({
    mutationFn: postKoreanTestRecording,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["testHistory"] }),
  });

  const scriptsResult = useSuspenseQuery<GetTestScriptsResponse, Error, TestScript[]>({
    queryKey: ["scripts"],

    queryFn: getTestScripts,

    select: ({ result }) => result.script,
  });

  return { postResult, scriptsResult };
}

export default useKoreanTest;
