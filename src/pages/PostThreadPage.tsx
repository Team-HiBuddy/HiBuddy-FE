import PlusSVG from "@assets/plus.svg?react";
import AddPhotoSVG from "@assets/add-photo.svg?react";
import { Button, TextField } from "@mui/material";

function PostThreadPage() {
  return (
    <main className="h-screen">
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-x-4">
          <PlusSVG className="scale-150 rotate-45" />
          <p className="text-lg font-semibold">Create a Post</p>
        </div>
        <Button variant="contained">POST</Button>
      </div>
      <div className="flex flex-col gap-8 px-8 py-4">
        <TextField variant="standard" placeholder="Add a title..." autoFocus />
        <TextField variant="outlined" multiline rows={10} placeholder="Add your text..." />
        <div className="border-t p-2">
          <label className="cursor-pointer" htmlFor="image-upload">
            <AddPhotoSVG />
          </label>
          <input className="hidden" id="image-upload" type="file" accept="image/png, image/jpeg" />
        </div>
      </div>
    </main>
  );
}

export default PostThreadPage;
