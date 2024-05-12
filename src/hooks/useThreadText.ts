import { useRef, useState } from "react";

const INVALID_TEXT = "Please enter at least 5 characters.";

function useThreadText() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);

  const [isValidTitle, setIsValidTitle] = useState<boolean>(true);
  const [isValidContents, setIsValidContents] = useState<boolean>(true);
  const [titleHelperText, setTitleHelperText] = useState<string>("");
  const [contentsHelperText, setContentsHelperText] = useState<string>("");

  const validateTitle = () => {
    if (!titleRef.current) return;

    const isValid = /^.{5,}$/.test(titleRef.current.value);

    setIsValidTitle(isValid);
    setTitleHelperText(isValid ? "" : INVALID_TEXT);
  };

  const validateContents = () => {
    if (!contentsRef.current) return;

    const isValid = /^.{5,}$/.test(contentsRef.current.value);

    setIsValidContents(isValid);
    setContentsHelperText(isValid ? "" : INVALID_TEXT);
  };

  return {
    titleRef,
    contentsRef,
    isValidTitle,
    isValidContents,
    titleHelperText,
    contentsHelperText,
    validateTitle,
    validateContents,
  };
}

export default useThreadText;
