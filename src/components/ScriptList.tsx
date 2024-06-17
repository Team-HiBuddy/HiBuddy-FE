import useKoreanTest from "@hooks/query/koreanTest/useKoreanTest";
import ScriptItem from "./ScriptItem";

function ScriptList() {
  const {
    scriptsResult: { data: scripts },
  } = useKoreanTest();

  return (
    <ul className="flex flex-col gap-y-8 w-full">
      {scripts.map(({ scriptId, scriptName, difficulty }) => (
        <ScriptItem
          key={scriptId}
          script={{
            id: scriptId,
            difficulty: difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3,
            name: scriptName,
          }}
        />
      ))}
    </ul>
  );
}

export default ScriptList;
