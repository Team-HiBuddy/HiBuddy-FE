import PlusSVG from "@assets/plus.svg?react";
import AddPhotoSVG from "@assets/add-photo.svg?react";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import usePageRouter from "@hooks/usePageRouter";
import useThreadImageUpload from "@hooks/query/useThreadImageUpload";

function PostThreadPage() {
  const { goBack } = usePageRouter();
  const {
    mutate: uploadImages,
    data: uploadResponse,
    isPending,
    isSuccess,
  } = useThreadImageUpload();

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

  useEffect(() => {
    if (!isSuccess) return;

    setImageIds((prev) => [...prev, ...uploadResponse.result.imageIds]);
  }, [isSuccess, uploadResponse?.result.imageIds]);

  return (
    <main className="h-screen">
      <div className="sticky top-16 flex justify-between p-4 bg-white z-10">
        <div className="flex items-center gap-x-4">
          <PlusSVG className="scale-150 rotate-45 cursor-pointer" onClick={goBack} />
          <p className="text-lg font-semibold">Create a Post</p>
        </div>
        <Button variant="contained">POST</Button>
      </div>
      <div className="flex flex-col gap-8 px-8 py-4">
        <TextField variant="standard" placeholder="Add a title..." autoFocus />
        <TextField variant="outlined" multiline rows={10} placeholder="Add your text..." />
        <div className="flex flex-col gap-y-2 p-2">
          <Button
            component="label"
            role="image-upload"
            variant="contained"
            color="secondary"
            tabIndex={-1}
            startIcon={<AddPhotoSVG />}
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload Image"}
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
