import TestHistoryItem from "./TestHistoryItem";

const mocks = [
  { id: "1", name: "Script 1", date: new Date("2024-05-17T12:34:56") },
  { id: "2", name: "Script 3", date: new Date("2024-05-14T12:34:56") },
  { id: "3", name: "Script 1", date: new Date("2024-05-12T12:34:56") },
];

function TestHistoryList() {
  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-xl font-semibold">Test History</h2>
      <ul className="flex flex-col gap-y-5 w-full">
        {mocks.map((history) => (
          <TestHistoryItem key={history.id} history={history} />
        ))}
      </ul>
    </div>
  );
}

export default TestHistoryList;
