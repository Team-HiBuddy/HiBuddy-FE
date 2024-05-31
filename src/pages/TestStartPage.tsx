import ScriptList from "@components/ScriptList";

function TestStartPage() {
  return (
    <div className="flex flex-col items-center gap-y-10 p-6">
      <h2 className="font-bold text-2xl">Select a script</h2>
      <ScriptList />
    </div>
  );
}

export default TestStartPage;
