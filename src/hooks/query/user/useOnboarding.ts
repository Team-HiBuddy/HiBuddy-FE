import { postOnboarding } from "@apis/thread";
import { getCountries, getMajors } from "@apis/user";
import { ResponseBody } from "@models/api";
import { PostOnboardingRequest } from "@models/user";
import { useMutation, useQuery } from "@tanstack/react-query";

function useOnboarding() {
  const countriesResult = useQuery<string[], Error>({
    queryKey: ["countries"],

    queryFn: getCountries,
  });

  const majorsResult = useQuery<string[], Error>({
    queryKey: ["majors"],

    queryFn: getMajors,
  });

  const postResult = useMutation<ResponseBody, Error, PostOnboardingRequest>({
    mutationFn: postOnboarding,
  });

  return { postResult, countriesResult, majorsResult };
}

export default useOnboarding;
