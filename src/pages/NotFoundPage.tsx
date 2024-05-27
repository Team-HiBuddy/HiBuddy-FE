import { useEffect } from "react";
import notFound from "@assets/not-found.jpg";
import { Button } from "@mui/material";

interface Props {
  reset?: () => void;
  error?: Error;
}

const NotFoundPage = ({ reset, error }: Props) => {
  useEffect(() => {
    if (error) {
      console.log(error);
      alert({ title: "요청 오류", description: error.message });
    }
  }, []);

  const handleClickHomeButton = () => {
    if (reset) {
      reset();
    }

    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center gap-y-8 mt-10">
      <img src={notFound} className="w-3/5 h-3/5" />
      <div className="flex flex-col items-center gap-y-2 p-6">
        <p className="font-bold text-4xl">404</p>
        <p className="font-bold text-2xl">Page not found</p>
        <p className="text-lg">We can't seem to find a page you're looking for.</p>
      </div>
      <Button variant="contained" size="large" onClick={handleClickHomeButton}>
        Back to Homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
