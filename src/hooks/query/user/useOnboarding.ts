import { postOnboarding } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { PostOnboardingRequest } from "@models/user";
import { useMutation } from "@tanstack/react-query";

/**
 * 수정 필요
 */
function useOnboarding() {
  const queryResult = useMutation<ResponseBody, Error, PostOnboardingRequest>({
    mutationFn: postOnboarding,
  });

  return queryResult;
}

export default useOnboarding;
