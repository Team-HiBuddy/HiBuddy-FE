import ScriptItem, { Script } from "./ScriptItem";

const mocks: Script[] = [
  {
    id: 1,
    difficulty: 1,
    text: `나라의 말이 중국과 달라
문자와 서로 통하지 아니하므로,
이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도
마침내 제 뜻을 능히 펴지 못하는 사람이 많으니라.
내가 이를 위하여 가엾게 여겨
새로 스물여덟 자를 만드니
사람마다 하여금 쉽게 익혀 날로 쓰기 편하게 하고자 할 따름이니라.`,
  },
  {
    id: 2,
    difficulty: 2,
    text: `나라의 말이 중국과 달라
문자와 서로 통하지 아니하므로,
이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도
마침내 제 뜻을 능히 펴지 못하는 사람이 많으니라.
내가 이를 위하여 가엾게 여겨
새로 스물여덟 자를 만드니
사람마다 하여금 쉽게 익혀 날로 쓰기 편하게 하고자 할 따름이니라.`,
  },
  {
    id: 3,
    difficulty: 3,
    text: `나라의 말이 중국과 달라
문자와 서로 통하지 아니하므로,
이런 까닭으로 어리석은 백성이 이르고자 하는 바가 있어도
마침내 제 뜻을 능히 펴지 못하는 사람이 많으니라.
내가 이를 위하여 가엾게 여겨
새로 스물여덟 자를 만드니
사람마다 하여금 쉽게 익혀 날로 쓰기 편하게 하고자 할 따름이니라.`,
  },
];

function ScriptList() {
  return (
    <ul className="flex flex-col gap-y-8 w-full">
      {mocks.map((value) => (
        <ScriptItem key={value.id} script={value} />
      ))}
    </ul>
  );
}

export default ScriptList;
