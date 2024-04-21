import PeopleSVG from "@assets/people.svg?react";

interface Props {
  title: string;
  members: number;
}

const MAX_MEMBER = 8;

function RecommendedChat({ title, members }: Props) {
  return (
    <li className="flex flex-col gap-1">
      <p className="text-ellipsis text-nowrap overflow-hidden">{title}</p>
      <div className="flex justify-end gap-4 ml-auto">
        <div className="flex items-center gap-2 text-red">
          <PeopleSVG className="w-6" />
          <p className=" text-sm">
            {members}/{MAX_MEMBER}
          </p>
        </div>
      </div>
    </li>
  );
}

export default RecommendedChat;
