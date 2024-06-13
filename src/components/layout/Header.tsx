import ProfileSVG from "@assets/profile.svg?react";
import SearchSVG from "@assets/search.svg?react";
import { IconButton } from "@mui/material";
import { ROUTER_PATH } from "../../routerConfig";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between w-full h-16 sticky top-0 p-4 bg-inhaDeepBlue z-10 text-white">
      <Link className="text-xl font-semibold" to={ROUTER_PATH.MAIN}>
        HiBuddy
      </Link>
      <div className="flex items-center gap-x-1">
        <IconButton aria-label="search">
          <SearchSVG className="text-white" />
        </IconButton>
        <IconButton aria-label="profile">
          <Link to={ROUTER_PATH.MY_PAGE}>
            <ProfileSVG className="text-white" />
          </Link>
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
