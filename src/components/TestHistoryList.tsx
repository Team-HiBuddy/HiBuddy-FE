import useTestHistory from "@hooks/query/koreanTest/useTestHistory";
import TestHistoryItem from "./TestHistoryItem";

function TestHistoryList() {
  const { data } = useTestHistory();

  if (data.length < 1) return null;

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-xl font-semibold">Test History</h2>
      <ul className="flex flex-col gap-y-5 w-full">
        {data.map((history) => (
          <TestHistoryItem
            key={history.testId}
            history={{
              testId: history.testId,
              scriptName: history.scriptName,
              date: new Date(history.testDate),
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default TestHistoryList;
