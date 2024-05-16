import usePageRouter from "@hooks/usePageRouter";
import { issueLoginToken } from "@apis/auth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function OAuthCallbackPage() {
  const location = useLocation();

  const { goToOnboardingPage, goToLoginPage } = usePageRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (!code || error) {
      alert(errorDescription ?? "Failed to Login");

      goToLoginPage();
    }

    if (code) {
      issueLoginToken(code)
        .then(() => {
          goToOnboardingPage();
        })
        .catch(() => {
          alert("Failed to Login");
          goToLoginPage();
        });
    }
  }, [location]);

  return <></>;
}

export default OAuthCallbackPage;
