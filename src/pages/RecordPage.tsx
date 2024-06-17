import AudioRecorder from "@components/AudioRecorder";
import useKoreanTest from "@hooks/query/koreanTest/useKoreanTest";
import usePageRouter from "@hooks/usePageRouter";
import { useParams } from "react-router-dom";

function RecordPage() {
  const { goToKoreanTestPage } = usePageRouter();
  const {
    scriptsResult: { data },
  } = useKoreanTest();

  const { scriptId } = useParams();

  const script = data.find((value) => Number(value.scriptId) === Number(scriptId));

  if (!scriptId || !script) {
    alert("The script does not exist.");

    goToKoreanTestPage();
  }

  return (
    <div className="flex flex-col items-center gap-y-10 p-6 h-full">
      <h2 className="font-bold text-2xl">Read the script</h2>
      <div className="h-80 border rounded border-inhaSkyBlue p-4 text-lg overflow-y-auto whitespace-pre-wrap">
        {script?.text}
      </div>
      <AudioRecorder />
    </div>
  );
}

export default RecordPage;
