import HomeSVG from "@assets/home.svg?react";
import ThreadSVG from "@assets/thread.svg?react";
import RecorderSVG from "@assets/recorder.svg?react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import usePageRouter from "@hooks/usePageRouter";
import { useLocation } from "react-router-dom";
import { ROUTER_PATH } from "../../routerConfig";

function BottomNavigationBar() {
  const { goToMainPage, goToThreadListPage, goToKoreanTestPage } = usePageRouter();

  const [value, setValue] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case ROUTER_PATH.THREAD_LIST:
      case ROUTER_PATH.THREAD_VIEW:
      case ROUTER_PATH.POST_THREAD:
      case ROUTER_PATH.MY_THREAD_LIST:
      case ROUTER_PATH.SAVED_THREAD_LIST:
      case ROUTER_PATH.EDIT_THREAD:
        setValue(1);
        break;
      case ROUTER_PATH.KOREAN_TEST:
      case ROUTER_PATH.TEST_START:
      case ROUTER_PATH.RECORD:
        setValue(2);
    }
  }, []);

  return (
    <footer className="sticky bottom-0 w-full mt-auto border-t-2 border-inhaSkyBlue py-2 px-6 bg-white z-10">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          switch (newValue) {
            case 0:
              goToMainPage();
              break;
            case 1:
              goToThreadListPage();
              break;
            case 2:
              goToKoreanTestPage();
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeSVG />} />
        <BottomNavigationAction label="Thread" icon={<ThreadSVG />} />
        <BottomNavigationAction label="Test" icon={<RecorderSVG />} />
      </BottomNavigation>
    </footer>
  );
}

export default BottomNavigationBar;
