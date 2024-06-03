import ThreadItemSkeleton from "./ThreadItemSkeleton";

interface Props {
  length: number;
}

function ThreadListSkeleton({ length }: Props) {
  return (
    <ul className="flex flex-col gap-y-2 p-2">
      {Array.from({ length }).map((_, idx) => (
        <li key={idx} className="flex flex-col gap-y-4 mb-2">
          <ThreadItemSkeleton />
          <hr className="w-full" />
        </li>
      ))}
    </ul>
  );
}

export default ThreadListSkeleton;
