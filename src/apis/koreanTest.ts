import { http } from "./axios";
import { PostKoreanTestResult } from "@models/koreanTest";

export const postKoreanTestRecording = async (audio: Blob) => {
  const formData = new FormData();

  formData.append("audio", audio, "recording.wav");

  return http.post<PostKoreanTestResult>("/v1/tests/start", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
