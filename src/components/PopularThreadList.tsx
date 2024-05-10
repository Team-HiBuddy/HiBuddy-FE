import { PopularThreadContents } from "@models/thread";
import PopularThread from "./PopularThread";

interface Props {
  threads?: PopularThreadContents[];
}

function PopularThreadList({ threads }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold px-1 mb-2">Popular</h2>
      <div>
        <ul className="flex flex-col gap-2 border rounded border-inhaSkyBlue p-3">
          {threads?.map((thread) => (
            <PopularThread key={thread.id} thread={thread} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopularThreadList;
