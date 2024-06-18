import { PageInfo, ResponseBody } from "./api";

export interface TestScript {
  scriptId: number;
  scriptName: string;
  difficulty: "easy" | "medium" | "hard";
  text: string;
}

export interface GetTestScriptsResponse extends ResponseBody {
  result: {
    script: TestScript[];
  };
}

export interface PostTestRecordingRequest {
  recording: Blob;
  scriptId: number;
}

export interface PostTestRecordingResponse extends ResponseBody {
  result: KoreanTestResult;
}

export interface TestRecord {
  testId: number;
  scriptId: number;
  scriptName: string;
  testDate: string;
}

interface TestHistoryResult extends PageInfo {
  test: TestRecord[];
}

export interface GetTestHistoryResponse extends ResponseBody {
  result: TestHistoryResult;
}

export interface KoreanTestResult {
  testId: number;
  scriptId: number;
  scriptName: string;
  testDate: string;
  difficulty: "easy" | "medium" | "hard";
  recognizedText: string;
  pitch: number;
  basePitch: number;
  pitchLevel: "low" | "medium" | "high";
  pronunciationScore: number;
}

export interface GetTestResultResponse extends ResponseBody {
  result: KoreanTestResult;
}
