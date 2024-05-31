import PlusSVG from "@assets/plus.svg?react";
import AddPhotoSVG from "@assets/add-photo.svg?react";
import SpinnerSVG from "@assets/spinner.svg?react";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import usePageRouter from "@hooks/usePageRouter";
import useImageUpload from "@hooks/query/thread/useImageUpload";
import useThread from "@hooks/query/thread/useThread";
import usePreventLeave from "@hooks/usePreventLeave";
import useThreadText from "@hooks/useThreadText";
import { useParams } from "react-router-dom";
import useThreadMutation from "@hooks/query/thread/useThreadMutation";

function EditThreadPage() {
  const { postId } = useParams();

  const { goBack, goToThreadViewPage } = usePageRouter();
  const { enablePrevent, disablePrevent } = usePreventLeave();
  const {
    uploadResult: {
      mutate: uploadImages,
      data: uploadResponse,
      isPending: isUploadImagePending,
      isSuccess: isUploadImageSuccess,
    },
    cancelResult: { mutate: cancelUploadImage, isPending: isCancelUploadImagePending },
  } = useImageUpload();

  const {
    data: threadData,
    isPending: isGetPending,
    isSuccess: isGetSuccess,
  } = useThread(Number(postId));

  const {
    patchResult: { mutate: patchThread, isPending: isPatchPending, isSuccess: isPatchSuccess },
  } = useThreadMutation(Number(postId));

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

  const [images, setImages] = useState<string[]>(
    threadData?.result.postImages.map((image) => image.imageUrl) ?? []
  );

  const [imageIds, setImageIds] = useState<number[]>(
    threadData?.result.postImages.map((image) => image.imageId) ?? []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = "";
  };

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

  const handleEditButton = () => {
    if (!titleRef.current || !contentsRef.current) return;

    patchThread({
      postId: Number(postId),
      title: titleRef.current.value,
      content: contentsRef.current.value,
      imageIds,
    });
  };

  const handleDeleteImageButton = (deleteIdx: number) => {
    cancelUploadImage(imageIds[deleteIdx]);

    resetFileInput();

    setImages((prev) => prev.filter((_, idx) => idx != deleteIdx));
    setImageIds((prev) => prev.filter((_, idx) => idx != deleteIdx));
  };

  useEffect(() => {
    enablePrevent();

    return () => {
      disablePrevent();
    };
  });

  useEffect(() => {
    if (isGetPending) return;

    if (!isGetSuccess) {
      alert("The thread does not exist.");

      goBack();
    }
  }, []);

  useEffect(() => {
    if (!isUploadImageSuccess) return;

    setImageIds((prev) => [...prev, ...uploadResponse.result.imageIds]);
  }, [isUploadImageSuccess]);

  useEffect(() => {
    if (!isPatchSuccess) return;

    goToThreadViewPage(Number(postId));
  }, [isPatchSuccess]);

  return (
    <main className="h-screen">
      <div className="sticky top-16 flex justify-between p-4 bg-white z-10">
        <div className="flex items-center gap-x-4">
          <PlusSVG className="scale-150 rotate-45 cursor-pointer" onClick={goBack} />
          <p className="text-lg font-semibold">Edit a Post</p>
        </div>
        <Button
          variant="contained"
          disabled={
            isPatchPending ||
            isUploadImagePending ||
            isCancelUploadImagePending ||
            !isValidTitle ||
            !isValidContents
          }
          onClick={handleEditButton}
        >
          EDIT
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
          defaultValue={threadData?.result.title}
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
          defaultValue={threadData?.result.content}
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
            startIcon={
              isUploadImagePending || isCancelUploadImagePending ? <SpinnerSVG /> : <AddPhotoSVG />
            }
            disabled={isUploadImagePending || isCancelUploadImagePending}
          >
            Upload Image
            <input
              className="hidden"
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              ref={fileInputRef}
              onChange={handelUploadImage}
            />
          </Button>
          <p className="text-gray-500">* You can attach up to three images.</p>
        </div>
        <ul className="flex flex-wrap gap-1">
          {images.map((image, idx) => (
            <li key={image} className="relative">
              <img className="w-40 h-40" src={image} />
              {!isUploadImagePending && !isCancelUploadImagePending && (
                <PlusSVG
                  className="absolute -top-3 -right-3 w-6 h-6 rotate-45 cursor-pointer border rounded-full bg-white z-10"
                  onClick={() => {
                    handleDeleteImageButton(idx);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default EditThreadPage;
