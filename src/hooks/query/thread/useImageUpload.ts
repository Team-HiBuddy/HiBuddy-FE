import { cancelImageUpload, postThreadImages } from "@apis/thread";
import { ResponseBody } from "@models/api";
import { PostThreadImagesResponse } from "@models/thread";
import { useMutation } from "@tanstack/react-query";

function useImageUpload() {
  const uploadResult = useMutation<PostThreadImagesResponse, Error, FileList>({
    mutationFn: postThreadImages,
  });

  const cancelResult = useMutation<ResponseBody, Error, number>({
    mutationFn: cancelImageUpload,
  });

  return { uploadResult, cancelResult };
}

export default useImageUpload;
