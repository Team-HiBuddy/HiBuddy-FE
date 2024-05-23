import { ResponseBody } from "./api";

export interface PostOnboardingRequest {
  nickname: string;
  country: string;
  major: string;
}

export interface Profile {
  nickname: string;
  country: string;
  major: string;
  profileUrl: string;
}

export interface GetProfileResponse extends ResponseBody {
  result: Profile;
}

export interface patchNickNameRequest {
  nickname: string;
}
