import { ChangeEvent, FocusEvent, useState } from "react";

const GUIDE_TEXT = "Please enter your nickname.";
const INVALID_NICKNAME = "Please enter 3 to 16 characters of English or numbers.";

function useNickname() {
  const [nickname, setNickname] = useState<string>("");
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [helperText, setHelperText] = useState<string>(GUIDE_TEXT);

  const validateNickname = (name: string) => /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{3,16}$/.test(name);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleNicknameBlur = (e: FocusEvent<HTMLInputElement>) => {
    const isValid = validateNickname(e.target.value);

    setIsValidName(isValid);

    if (e.target.value.length < 1) {
      setHelperText(GUIDE_TEXT);

      return;
    }

    setHelperText(isValid ? "" : INVALID_NICKNAME);
  };

  return {
    nickname,
    isValidName,
    helperText,
    handleNicknameChange,
    handleNicknameBlur,
  };
}

export default useNickname;
