import usePageRouter from "@hooks/usePageRouter";
import { Button } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { Gauge } from "@mui/x-charts/Gauge";

const SCRIPT =
  "나라의 말이 중국과 달라 문자와 서로 통하지 아니하므로, 이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도 마침내 제 뜻을 능히 펴지 못하는 사람이 많으니라. 내가 이를 위하여 가엾게 여겨 새로 스물여덟 자를 만드니 사람마다 하여금 쉽게 익혀 날로 쓰기 편하게 하고자 할 따름이니라.";

function TestResultPage() {
  const { goToTestStartPage } = usePageRouter();

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

  const score = 60;
  const pitch = 80;
  const criteria = 140;

  const dataSet = [
    {
      type: "Result",
      value: pitch,
    },
    {
      type: "Native",
      value: criteria,
    },
  ];

  return (
    <div className="flex flex-col gap-y-10 p-6">
      <h2 className="font-bold text-2xl text-center">Analysis Result</h2>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Recognized Text</h3>
        <div className="border rounded border-inhaSkyBlue p-4 text-lg overflow-y-auto">
          {SCRIPT}
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
          <p className="text-center text-lg font-semibold">{getPitchResultText(pitch, criteria)}</p>
        </div>
      </section>

      <section className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-xl">Score</h3>
        <div className="flex items-center justify-around border rounded border-inhaSkyBlue p-4 h-44">
          <div className="w-3/6 h-40">
            <Gauge value={score} startAngle={-90} endAngle={90} innerRadius={"50%"} text="" />
          </div>
          <div className="flex flex-col items-center gap-y-2 text-lg font-semibold">
            <div className="flex gap-x-1">
              <p>{score}</p>
              <p className="text-gray-500">/ 100</p>
            </div>
            <p className="text-center">{getScoreResultText(score, 100)}</p>
          </div>
        </div>
      </section>

      <Button variant="contained" onClick={goToTestStartPage}>
        CONFIRM
      </Button>
    </div>
  );
}

export default TestResultPage;
