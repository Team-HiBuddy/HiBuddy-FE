import { getProfile } from "@apis/user";
import { GetProfileResponse, Profile } from "@models/user";
import { useSuspenseQuery } from "@tanstack/react-query";

function useProfile() {
  const queryResult = useSuspenseQuery<GetProfileResponse, Error, Profile>({
    queryKey: ["profile"],

    queryFn: getProfile,

    select: (data) => data.result,
  });

  return queryResult;
}

export default useProfile;
