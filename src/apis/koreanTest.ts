import { http } from "./axios";
import {
  GetTestHistoryResponse,
  GetTestResultResponse,
  GetTestScriptsResponse,
  PostTestRecordingRequest,
  PostTestRecordingResponse,
} from "@models/koreanTest";

export const getTestScripts = async () => {
  return http.get<GetTestScriptsResponse>("/v1/tests/scripts");
};

export const postKoreanTestRecording = async (data: PostTestRecordingRequest) => {
  const { scriptId, recording } = data;
  const formData = new FormData();

  formData.append("audioFile", recording);
  formData.append("scriptId", scriptId.toString());

  return http.post<PostTestRecordingResponse>(`/v1/tests/perform`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTestHistory = async (page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  return http.get<GetTestHistoryResponse>(`/v1/tests/history?${params.toString()}`);
};

export const getTestResult = async (testId: number) => {
  return http.get<GetTestResultResponse>(`/v1/tests/history/${testId}`);
};
