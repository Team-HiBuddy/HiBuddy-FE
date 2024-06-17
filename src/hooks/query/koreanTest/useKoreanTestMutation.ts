import { useMutation } from "@tanstack/react-query";
import { postKoreanTestRecording } from "@apis/koreanTest";
import { PostTestRecordingRequest, PostTestRecordingResponse } from "@models/koreanTest";

function useKoreanTestMutation() {
  const postResult = useMutation<PostTestRecordingResponse, Error, PostTestRecordingRequest>({
    mutationFn: postKoreanTestRecording,
  });

  return { postResult };
}

export default useKoreanTestMutation;
