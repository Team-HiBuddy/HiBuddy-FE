import StarSVG from "@assets/star.svg?react";
import StarOutlineSVG from "@assets/star-outline.svg?react";
import GreaterThanSVG from "@assets/greater-than.svg?react";
import usePageRouter from "@hooks/usePageRouter";

export interface Script {
  id: number;
  difficulty: 1 | 2 | 3;
  name: string;
}

interface Props {
  script: Script;
}

const DIFFICULTY_COLORS = {
  1: " text-green-500",
  2: " text-orange-300",
  3: " text-red",
};

const DIFFICULTY_LABELS = {
  1: "EASY",
  2: "MEDIUM",
  3: "HARD",
};

function ScriptItem({ script }: Props) {
  const { goToRecordPage } = usePageRouter();

  const handleClick = () => {
    goToRecordPage(script.id);
  };

  return (
    <li
      className="flex justify-between items-center border rounded border-inhaSkyBlue p-4 cursor-pointer"
      onClick={handleClick}
    >
      <section className={"flex flex-col items-center" + DIFFICULTY_COLORS[script.difficulty]}>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, idx) =>
            idx < script.difficulty ? (
              <StarSVG key={idx} className="w-7 h-7" />
            ) : (
              <StarOutlineSVG key={idx} className="w-7 h-7" />
            )
          )}
        </div>
        {DIFFICULTY_LABELS[script.difficulty]}
      </section>
      <section className="font-semibold text-lg mr-10">Script {script.id}</section>
      <section>
        <GreaterThanSVG />
      </section>
    </li>
  );
}

export default ScriptItem;
