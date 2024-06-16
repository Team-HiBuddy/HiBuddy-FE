import { Backdrop } from "@mui/material";
import SpinnerSVG from "@assets/spinner.svg?react";

interface Props {
  isOpen: boolean;
}

function BackdropLoader({ isOpen }: Props) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen}>
      <SpinnerSVG color="inherit" />
    </Backdrop>
  );
}

export default BackdropLoader;
