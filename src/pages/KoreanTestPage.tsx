import TestHistoryList from "@components/TestHistoryList";
import ApiErrorBoundary from "@components/errorBoundary/ApiErrorBoundary";
import usePageRouter from "@hooks/usePageRouter";
import { Button } from "@mui/material";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

function KoreanTestPage() {
  const { goToTestStartPage } = usePageRouter();
  return (
    <div className="flex flex-col gap-y-8 p-6">
      <h2 className="font-bold text-2xl">Greetings!</h2>
      <p className="text-lg">You can test your Korean pronunciation here!</p>
      <Button variant="contained" onClick={goToTestStartPage}>
        START TEST
      </Button>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ApiErrorBoundary onReset={reset}>
            <Suspense>
              <TestHistoryList />
            </Suspense>
          </ApiErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}

export default KoreanTestPage;
