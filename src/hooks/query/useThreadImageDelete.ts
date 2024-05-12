import { deleteThreadImage } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { useMutation } from "@tanstack/react-query";

function useThreadImageDelete() {
  const queryResult = useMutation<ResponseBody, Error, number>({
    mutationFn: deleteThreadImage,
  });

  return queryResult;
}

export default useThreadImageDelete;
