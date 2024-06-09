import { getCountries, getMajors, patchOnboarding } from "@apis/user";
import { ResponseBody } from "@models/api";
import { PatchOnboardingRequest } from "@models/user";
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

  const patchResult = useMutation<ResponseBody, Error, PatchOnboardingRequest>({
    mutationFn: patchOnboarding,
  });

  return { countriesResult, majorsResult, patchResult };
}

export default useOnboarding;
