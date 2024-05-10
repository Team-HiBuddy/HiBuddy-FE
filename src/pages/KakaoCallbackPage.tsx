import usePageRouter from "@hooks/usePageRouter";
import { issueLoginToken } from "@apis/auth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function KakaoCallbackPage() {
  const location = useLocation();

  const { goToMainPage, goToLoginPage } = usePageRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      alert(errorDescription ?? "Failed to Login");

      goToLoginPage();
    }

    if (code) {
      issueLoginToken(code)
        .then(() => {
          alert("로그인 성공!");
          goToMainPage();
        })
        .catch(() => {
          alert("Failed to Login");
          goToLoginPage();
        });
    }
  }, [location]);

  return <div>Redirecting...</div>;
}

export default KakaoCallbackPage;
