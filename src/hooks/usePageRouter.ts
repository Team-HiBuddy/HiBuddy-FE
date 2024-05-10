import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "router";

function usePageRouter() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate(ROUTER_PATH.MAIN);
  };

  const goToLoginPage = () => {
    navigate(ROUTER_PATH.LOGIN);
  };

  const goToThreadViewPage = (postId: number) => {
    navigate(ROUTER_PATH.THREAD_VIEW.replace(":postId", postId.toString()));
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    goToMainPage,
    goToLoginPage,
    goToThreadViewPage,
    goBack,
  };
}

export default usePageRouter;
