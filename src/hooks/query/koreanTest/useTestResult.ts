import { getTestResult } from "@apis/koreanTest";
import { GetTestResultResponse } from "@models/koreanTest";
import { useSuspenseQuery } from "@tanstack/react-query";

const useTestResult = (testId: number) => {
  const queryResult = useSuspenseQuery<
    GetTestResultResponse,
    Error,
    GetTestResultResponse,
    [string, number]
  >({
    queryKey: ["testResult", testId],

    queryFn: () => getTestResult(testId),
  });

  return queryResult;
};

export default useTestResult;
