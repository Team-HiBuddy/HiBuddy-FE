import usePageRouter from "@hooks/usePageRouter";
import { issueLoginToken } from "@apis/auth";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

function OAuthCallbackPage() {
  const location = useLocation();
  const { provider } = useParams();

  const { goToMainPage, goToLoginPage } = usePageRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (!code || error || (provider !== "kakao" && provider !== "google")) {
      alert(errorDescription ?? "Failed to Login");

      goToLoginPage();

      return;
    }

    issueLoginToken(provider, code)
      .then(() => {
        goToMainPage();
      })
      .catch(() => {
        alert("Failed to Login");
        goToLoginPage();
      });
  }, [location]);

  return <></>;
}

export default OAuthCallbackPage;
