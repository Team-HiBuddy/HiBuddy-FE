import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "../router";

function usePageRouter() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToMainPage = () => {
    navigate(ROUTER_PATH.MAIN);
  };

  const goToLoginPage = () => {
    navigate(ROUTER_PATH.LOGIN);
  };

  const goToThreadListPage = () => {
    navigate(ROUTER_PATH.THREAD_LIST);
  };

  const goToThreadViewPage = (postId: number) => {
    navigate(ROUTER_PATH.THREAD_VIEW.replace(":postId", postId.toString()));
  };

  const goToPostThreadPage = () => {
    navigate(ROUTER_PATH.POST_THREAD);
  };

  return {
    goBack,
    goToMainPage,
    goToLoginPage,
    goToThreadListPage,
    goToThreadViewPage,
    goToPostThreadPage,
  };
}

export default usePageRouter;
