import { getProfile } from "@apis/user";
import { GetProfileResponse, Profile } from "@models/user";
import { useQuery } from "@tanstack/react-query";

function useProfile() {
  const queryResult = useQuery<GetProfileResponse, Error, Profile>({
    queryKey: ["profile"],

    queryFn: getProfile,

    select: (data) => data.result,
  });

  return queryResult;
}

export default useProfile;
