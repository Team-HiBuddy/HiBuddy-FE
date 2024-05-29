import usePageRouter from "@hooks/usePageRouter";
import { Button } from "@mui/material";

function KoreanTestPage() {
  const { goToTestStartPage } = usePageRouter();
  return (
    <div className="flex flex-col gap-y-5 p-6">
      <h2 className="font-bold text-2xl">Greetings!</h2>
      <p className="text-lg">You can test your Korean pronunciation here!</p>
      <Button variant="contained" onClick={goToTestStartPage}>
        START TEST
      </Button>
    </div>
  );
}

export default KoreanTestPage;
