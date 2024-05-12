import { postThreadImages } from "@apis/thread";
import { PostThreadImagesResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";

function useThreadImageUpload() {
  const queryResult = useMutation<PostThreadImagesResponse, Error, FileList>({
    mutationFn: postThreadImages,
  });

  return queryResult;
}

export default useThreadImageUpload;
