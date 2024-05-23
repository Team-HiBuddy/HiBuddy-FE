import { deleteAccount, logout } from "@apis/auth";
import { patchNickname } from "@apis/user";
import AccountCircleSVG from "@assets/account-circle.svg?react";
import GreaterThanSVG from "@assets/greater-than.svg?react";
import useProfile from "@hooks/query/useProfile";
import useNickname from "@hooks/useNickname";
import usePageRouter from "@hooks/usePageRouter";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

function MyPage() {
  const { goToLoginPage } = usePageRouter();

  const { data: profile, isPending } = useProfile();

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

  return (
    !isPending && (
      <div className="flex flex-col gap-6 p-10">
        <section className="flex flex-col gap-3">
          <AccountCircleSVG className="ml-auto mr-auto w-20 h-20" />
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
          <Button color="inherit">
            <div className="flex justify-between w-full">
              My Posts
              <GreaterThanSVG />
            </div>
          </Button>
          <Button color="inherit">
            <div className="flex justify-between w-full">
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
    )
  );
}

export default MyPage;
