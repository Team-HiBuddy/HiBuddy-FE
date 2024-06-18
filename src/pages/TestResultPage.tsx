import useTestResult from "@hooks/query/koreanTest/useTestResult";
import usePageRouter from "@hooks/usePageRouter";
import { Button } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts/Gauge";
import { formatDate } from "@utils/date";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DIFFICULTY_COLORS = {
  easy: " text-green-500",
  medium: " text-orange-300",
  hard: " text-red",
};

function TestResultPage() {
  const { testId } = useParams();

  const {
    data: { result },
    isError,
  } = useTestResult(Number(testId));

  const { goToKoreanTestPage } = usePageRouter();

  useEffect(() => {
    if (isError) {
      alert("The result does not exist.");

      goToKoreanTestPage();
    }
  }, [isError]);

  const { scriptName, testDate, recognizedText, pitch, basePitch, difficulty, pronunciationScore } =
    result;

  const getScoreResultText = (value: number, max: number) => {
    const percentage = (value / max) * 100;

    if (percentage >= 90) {
      return "Excellent! 🤩";
    }

    if (percentage >= 80) {
      return "Very Good! 😊";
    }

    if (percentage >= 70) {
      return "Good! 👍";
    }

    return "Needs Improvement! 🥲";
  };

  const getPitchResultText = (value: number, criteria: number) => {
    const diff = value - criteria;

    if (Math.abs(diff) < 27) {
      return "GOOD!";
    }

    if (diff <= -60) {
      return "It's too low!";
    }

    if (diff <= -27) {
      return "A little low!";
    }

    if (diff >= 60) {
      return "It's too high!";
    }

    if (diff >= 27) {
      return "A little high!";
    }
  };

  const valueFormatter = (value: number | null) => `${value}Hz`;

  const dataSet = [
    {
      type: "You",
      value: pitch,
    },
    {
      type: "Native",
      value: basePitch,
    },
  ];

  return (
    <div className="flex flex-col gap-y-10 p-6">
      <h2 className="font-bold text-2xl text-center">Analysis Result</h2>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Test Info</h3>
        <div className="flex justify-between border rounded border-inhaSkyBlue p-4 text-lg overflow-y-auto">
          <div className="flex flex-col font-semibold">
            <p className="font-semibold">Script name</p>
            <p className="font-semibold">Test Date</p>
            <p className="font-semibold">Difficulty</p>
          </div>
          <div className="flex flex-col ">
            <p>{scriptName}</p>
            <p>{formatDate(new Date(testDate))}</p>
            <p className={DIFFICULTY_COLORS[difficulty]}>{difficulty.toUpperCase()}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Recognized Text</h3>
        <div className="border rounded border-inhaSkyBlue p-4 text-lg overflow-y-auto">
          {recognizedText}
        </div>
      </section>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Pitch</h3>
        <div className="flex flex-col gap-y-5 border rounded border-inhaSkyBlue p-4">
          <div className="w-full h-40">
            <BarChart
              dataset={dataSet}
              xAxis={[{ label: "Pitch (Hz)", min: 0, max: 200 }]}
              yAxis={[{ scaleType: "band", dataKey: "type" }]}
              series={[{ dataKey: "value", valueFormatter }]}
              layout="horizontal"
            />
          </div>
          <p className="text-center text-lg font-semibold">
            {getPitchResultText(pitch, basePitch)}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Pronunciation Score</h3>
        <div className="flex items-center justify-around border rounded border-inhaSkyBlue p-4 h-44">
          <div className="w-3/6 h-40">
            <Gauge
              value={pronunciationScore}
              startAngle={-90}
              endAngle={90}
              innerRadius={"50%"}
              text=""
            />
          </div>
          <div className="flex flex-col items-center gap-y-2 text-lg font-semibold">
            <div className="flex gap-x-1">
              <p>{pronunciationScore}</p>
              <p className="text-gray-500">/ 100</p>
            </div>
            <p className="text-center">{getScoreResultText(pronunciationScore, 100)}</p>
          </div>
        </div>
      </section>

      <Button variant="contained" onClick={goToKoreanTestPage}>
        CONFIRM
      </Button>
    </div>
  );
}

export default TestResultPage;
