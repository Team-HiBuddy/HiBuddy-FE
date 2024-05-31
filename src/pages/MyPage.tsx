import { deleteAccount, logout } from "@apis/auth";
import EditSVG from "@assets/edit.svg?react";
import GreaterThanSVG from "@assets/greater-than.svg?react";
import SpinnerSVG from "@assets/spinner.svg?react";
import useProfile from "@hooks/query/user/useProfile";
import useProfileMutation from "@hooks/query/user/useProfileMutation";
import useNickname from "@hooks/useNickname";
import usePageRouter from "@hooks/usePageRouter";
import { Avatar, Button, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

function MyPage() {
  const { goToLoginPage, goToMyThreadListPage, goToSavedThreadListPage } = usePageRouter();

  const { data: profile } = useProfile();

  const {
    patchNicknameResult: { mutate: patchNickname },
    patchProfileImageResult: { mutate: patchProfileImage, isPending: isUploadImagePending },
  } = useProfileMutation();

  const {
    nickname,
    isValidName,
    helperText,
    validateNickname,
    handleNicknameBlur,
    handleNicknameChange,
  } = useNickname();

  const [isModifying, setIsModifying] = useState<boolean>(false);

  const nicknameRef = useRef<HTMLInputElement>(null);

  const handelLogout = () => {
    logout();

    goToLoginPage();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      deleteAccount();

      goToLoginPage();
    }
  };

  const handleClickSave = () => {
    if (!isValidName) return;

    patchNickname({ nickname });

    setIsModifying(false);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isModifying && nicknameRef.current) {
      nicknameRef.current.blur();

      const isValid = validateNickname(nicknameRef.current.value);

      if (isValid) handleClickSave();
      else nicknameRef.current.focus();
    }
  };

  const handelUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    patchProfileImage({ image: files[0] });
  };

  return (
    <div className="flex flex-col gap-6 p-10">
      <section className="flex flex-col gap-3">
        <div className="relative ml-auto mr-auto p-2">
          <Avatar sx={{ width: "6rem", height: "6rem" }} src={profile?.profileUrl} />
          <label
            className="absolute bottom-0 right-0  text-white bg-gray-800 border border-gray-400 rounded cursor-pointer"
            role="image-upload"
            htmlFor="image-upload"
            tabIndex={0}
          >
            {isUploadImagePending ? (
              <SpinnerSVG className="h-6 w-8" />
            ) : (
              <EditSVG className="h-6 w-8" />
            )}
            <input
              className="hidden"
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg"
              disabled={isUploadImagePending}
              onChange={handelUploadImage}
            />
          </label>
        </div>
        <div className="flex items-end gap-x-2 w-full">
          <TextField
            className="w-4/5"
            variant="standard"
            color="secondary"
            label="nickname"
            defaultValue={profile?.nickname}
            helperText={isModifying ? helperText : ""}
            error={!isValidName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsModifying(true);
              handleNicknameChange(e);
            }}
            onBlur={handleNicknameBlur}
            onKeyDown={handleKeydown}
            inputRef={nicknameRef}
          />
          {isModifying && (
            <Button
              variant="outlined"
              size="small"
              disabled={!isValidName}
              onClick={handleClickSave}
            >
              Save
            </Button>
          )}
        </div>
        <TextField
          className="w-4/5"
          variant="standard"
          color="secondary"
          label="country"
          value="France"
          disabled
        />
        <TextField
          className="w-4/5"
          variant="standard"
          color="secondary"
          label="major"
          value="Computer Engineering"
          disabled
        />
      </section>
      <hr className="w-full" />
      <section className="flex flex-col gap-6">
        <Button color="inherit" onClick={goToMyThreadListPage}>
          <div className="flex justify-between w-full">
            My Posts
            <GreaterThanSVG />
          </div>
        </Button>
        <Button color="inherit">
          <div className="flex justify-between w-full" onClick={goToSavedThreadListPage}>
            Saved Posts
            <GreaterThanSVG />
          </div>
        </Button>
      </section>
      <hr className="w-full" />
      <section className="flex flex-col gap-8">
        <Button color="inherit" className="mr-auto w-fit">
          <div className="mr-auto" onClick={handelLogout}>
            Logout
          </div>
        </Button>
        <Button color="warning" className="mr-auto w-fit">
          <div className="mr-auto" onClick={handleDeleteAccount}>
            Delete Account
          </div>
        </Button>
      </section>
    </div>
  );
}

export default MyPage;
