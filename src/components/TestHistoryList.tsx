import useTestHistory from "@hooks/query/koreanTest/useTestHistory";
import TestHistoryItem from "./TestHistoryItem";
import usePageRouter from "@hooks/usePageRouter";

function TestHistoryList() {
  const { goToTestResultPage } = usePageRouter();

  const { data } = useTestHistory();

  if (data.length < 1) return null;

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-xl font-semibold">Test History</h2>
      <ul className="flex flex-col gap-y-5 w-full">
        {data.map(({ testId, scriptName, testDate }) => (
          <li
            key={testId}
            onClick={() => {
              goToTestResultPage(testId);
            }}
          >
            <TestHistoryItem
              history={{
                testId: testId,
                scriptName: scriptName,
                date: new Date(testDate),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestHistoryList;
