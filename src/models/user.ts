import { ResponseBody } from "./api";
import { GetThreadListResponse } from "./thread";

export interface PatchOnboardingRequest {
  nickname: string;
  country: string;
  major: string;
}

export interface Profile {
  nickname: string;
  country: string;
  major: string;
  profileImage: string;
}

export interface GetProfileResponse extends ResponseBody {
  result: Profile;
}

export interface PatchNickNameRequest {
  nickname: string;
}

export interface PatchProfileImageRequest {
  image: File;
}

export interface GetMyThreadListResponse extends GetThreadListResponse {}

export interface GetSavedThreadListResponse extends GetThreadListResponse {}
