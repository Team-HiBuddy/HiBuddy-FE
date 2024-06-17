import { useRef, useState } from "react";

const MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const CONTENTS_MAX_LENGTH = 500;

const MIN_LENGTH_ALERT = (minLength: number) => `Please enter at least ${minLength} characters.`;
const MAX_LENGTH_ALERT = (maxLength: number) => `Please enter up to ${maxLength} characters.`;

function useThreadText() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);

  const [isValidTitle, setIsValidTitle] = useState<boolean>(true);
  const [isValidContents, setIsValidContents] = useState<boolean>(true);
  const [titleHelperText, setTitleHelperText] = useState<string>("");
  const [contentsHelperText, setContentsHelperText] = useState<string>("");

  const validateTitle = () => {
    if (!titleRef.current) return;

    const isShort = titleRef.current.value.length < MIN_LENGTH;
    const isLong = titleRef.current.value.length > TITLE_MAX_LENGTH;

    setIsValidTitle(!isShort && !isLong);
    setTitleHelperText(
      isShort ? MIN_LENGTH_ALERT(MIN_LENGTH) : isLong ? MAX_LENGTH_ALERT(TITLE_MAX_LENGTH) : ""
    );
  };

  const validateContents = () => {
    if (!contentsRef.current) return;

    const isShort = contentsRef.current.value.length < MIN_LENGTH;
    const isLong = contentsRef.current.value.length > CONTENTS_MAX_LENGTH;

    setIsValidContents(!isShort && !isLong);
    setContentsHelperText(
      isShort ? MIN_LENGTH_ALERT(MIN_LENGTH) : isLong ? MAX_LENGTH_ALERT(CONTENTS_MAX_LENGTH) : ""
    );
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
