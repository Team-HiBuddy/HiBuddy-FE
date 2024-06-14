import { IconButton } from "@mui/material";
import { ROUTER_PATH } from "../../routerConfig";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchDialog from "@components/dialog/SearchDialog";
import LayoutSVG from "@components/svgIcon/LayoutSVG";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSearch = () => {
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="flex justify-between w-full h-16 sticky top-0 p-4 bg-inhaDeepBlue z-10 text-white">
        <Link className="text-xl font-semibold" to={ROUTER_PATH.MAIN}>
          HiBuddy
        </Link>
        <div className="flex items-center gap-x-1">
          <IconButton aria-label="search" onClick={openSearch}>
            <LayoutSVG id="search" className="w-10 h-10 text-white" />
          </IconButton>
          <IconButton aria-label="profile">
            <Link to={ROUTER_PATH.MY_PAGE}>
              <LayoutSVG id="profile" className="w-8 h-8 text-white" />
            </Link>
          </IconButton>
        </div>
      </header>
      <SearchDialog isOpen={isOpen} handleClose={closeSearch} />
    </>
  );
}

export default Header;
