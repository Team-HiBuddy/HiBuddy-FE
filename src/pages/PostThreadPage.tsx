import PlusSVG from "@assets/plus.svg?react";
import AddPhotoSVG from "@assets/add-photo.svg?react";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import usePageRouter from "@hooks/usePageRouter";
import useThreadImageUpload from "@hooks/query/useThreadImageUpload";
import useThreadPost from "@hooks/query/useThreadPost";
import usePreventLeave from "@hooks/usePreventLeave";
import useThreadText from "@hooks/useThreadText";

function PostThreadPage() {
  const { goBack, goToThreadViewPage } = usePageRouter();
  const { enablePrevent, disablePrevent } = usePreventLeave();
  const {
    mutate: uploadImages,
    data: uploadResponse,
    isPending: isImagePending,
    isSuccess: isImageSuccess,
  } = useThreadImageUpload();
  const {
    mutate: postThread,
    data: postResponse,
    isPending: isPostPending,
    isSuccess: isPostSuccess,
  } = useThreadPost();
  const {
    titleRef,
    contentsRef,
    validateTitle,
    validateContents,
    isValidContents,
    isValidTitle,
    titleHelperText,
    contentsHelperText,
  } = useThreadText();

  const [images, setImages] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<number[]>([]);

  const handelUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;
    if (images.length + files.length > 3) {
      return alert("You can attach up to three images!");
    }

    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const filePath = fileReader.result as string;

        setImages((prev) => [...prev, filePath]);
      };

      fileReader.readAsDataURL(file);
    });

    uploadImages(files);
  };

  const handlePostButton = () => {
    if (!titleRef.current || !contentsRef.current) return;

    postThread({ title: titleRef.current.value, content: contentsRef.current.value, imageIds });
  };

  useEffect(() => {
    enablePrevent();

    return () => {
      disablePrevent();
    };
  });

  useEffect(() => {});

  useEffect(() => {
    if (!isImageSuccess) return;

    setImageIds((prev) => [...prev, ...uploadResponse.result.imageIds]);
  }, [isImageSuccess, uploadResponse?.result.imageIds]);

  useEffect(() => {
    if (!isPostSuccess) return;

    goToThreadViewPage(postResponse.result.postId);
  }, [isPostSuccess, postResponse?.result.postId, goToThreadViewPage]);

  return (
    <main className="h-screen">
      <div className="sticky top-16 flex justify-between p-4 bg-white z-10">
        <div className="flex items-center gap-x-4">
          <PlusSVG className="scale-150 rotate-45 cursor-pointer" onClick={goBack} />
          <p className="text-lg font-semibold">Create a Post</p>
        </div>
        <Button
          variant="contained"
          disabled={isPostPending || !isValidTitle || !isValidContents}
          onClick={handlePostButton}
        >
          POST
        </Button>
      </div>
      <div className="flex flex-col gap-8 px-8 py-4">
        <TextField
          variant="standard"
          placeholder="Add a title..."
          helperText={titleHelperText}
          autoFocus
          error={!isValidTitle}
          inputRef={titleRef}
          onBlur={validateTitle}
        />
        <TextField
          variant="outlined"
          multiline
          rows={10}
          placeholder="Add your text..."
          helperText={contentsHelperText}
          error={!isValidContents}
          inputRef={contentsRef}
          onBlur={validateContents}
        />
        <div className="flex flex-col gap-y-2 p-2">
          <Button
            className="w-44"
            component="label"
            role="image-upload"
            variant="contained"
            color="secondary"
            tabIndex={-1}
            startIcon={<AddPhotoSVG />}
            disabled={isImagePending}
          >
            {isImagePending ? "Uploading..." : "Upload Image"}
            <input
              className="hidden"
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handelUploadImage}
            />
          </Button>
          <p className="text-gray-500">* You can attach up to three images.</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {images.map((image) => (
            <img className="w-40 h-40" key={image} src={image} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default PostThreadPage;
