import { ResponseBody } from "@models/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { PatchNickNameRequest, PatchProfileImageRequest } from "@models/user";
import { patchNickname, patchProfileImage } from "@apis/user";

function useProfileMutation() {
  const patchNicknameResult = useMutation<ResponseBody, Error, PatchNickNameRequest>({
    mutationFn: patchNickname,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const patchProfileImageResult = useMutation<ResponseBody, Error, PatchProfileImageRequest>({
    mutationFn: patchProfileImage,

    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  return { patchNicknameResult, patchProfileImageResult };
}

export default useProfileMutation;
