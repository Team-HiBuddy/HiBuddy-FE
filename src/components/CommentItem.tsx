import { getTimeDiff } from "@utils/date";

export interface CommentItemContents {
  nickname: string;
  createdDate: Date;
  contents: string;
  profileUrl: string;
}

interface Props {
  comment: CommentItemContents;
}

function CommentItem({ comment }: Props) {
  const { nickname, profileUrl, contents, createdDate } = comment;

  return (
    <li className="flex gap-x-2">
      <img src={profileUrl} className="w-8 h-8" />
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2">
          <p>{nickname}</p>
          <p className="text-gray-400">{`· ${getTimeDiff(createdDate)}`}</p>
        </div>
        <p>{contents}</p>
      </div>
    </li>
  );
}

export default CommentItem;
