import GreaterThanSVG from "@assets/greater-than.svg?react";
import { formatDate } from "@utils/date";

interface TestHistory {
  id: string;
  name: string;
  date: Date;
}

interface Props {
  history: TestHistory;
}

function TestHistoryItem({ history }: Props) {
  return (
    <div className="flex justify-between items-center border rounded border-inhaSkyBlue p-4 cursor-pointer">
      <section className="flex flex-col gap-y-1 mr-10">
        <p className="text-lg font-semibold ">{history.name}</p>
        <p className="text-gray-500">{formatDate(history.date)}</p>
      </section>

      <section>
        <GreaterThanSVG />
      </section>
    </div>
  );
}

export default TestHistoryItem;
