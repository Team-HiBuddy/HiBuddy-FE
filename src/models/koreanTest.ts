import { ResponseBody } from "./api";

export interface KoreanTestResult {
  testId: string;
  script_name: string;
  test_data: string;
  recognized_text: string;
  score: number;
  pitch: number;
  best_pitch: number;
  pitch_level: "low" | "medium" | "high";
  best_pitch_level: "low" | "medium" | "high";
}

export interface PostKoreanTestResult extends ResponseBody {
  result: KoreanTestResult;
}
