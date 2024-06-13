import usePageRouter from "@hooks/usePageRouter";
import { Dialog, TextField } from "@mui/material";
import { KeyboardEvent, useRef } from "react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

function SearchDialog({ isOpen, handleClose }: Props) {
  const { goToThreadSearchPage } = usePageRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const keyword = inputRef.current.value.trim();

      if (keyword.length < 2) {
        return alert("Please enter at least 2 characters for keywords.");
      }

      e.preventDefault();

      handleClose();
      goToThreadSearchPage(keyword);
    }
  };

  return (
    <Dialog
      sx={{ position: "absolute", top: 1 }}
      open={isOpen}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <div className="w-72">
        <TextField
          placeholder="What are you looking for?"
          fullWidth
          inputRef={inputRef}
          onKeyDown={handleKeydown}
          autoFocus={true}
        />
      </div>
    </Dialog>
  );
}

export default SearchDialog;
