import RecommendedChat from "./RecommendedChat";

const chats = [
  { title: "어쩌구 저쩌구 이러쿵 저러쿵 어쩌구 저쩌구 이러쿵 저러쿵", members: 3 },
  { title: "이거 실화냐?", members: 2 },
  { title: "어쩌구 저쩌구 이러쿵 저러쿵 어쩌구 저쩌구 이러쿵 저러쿵", members: 1 },
];

function RecommendedChatList() {
  return (
    <div>
      <h2 className="text-xl font-bold px-1 mb-2">Recommended</h2>
      <div>
        <ul className="flex flex-col gap-2 border rounded border-inhaSkyBlue p-3">
          {chats.map((chat) => (
            <RecommendedChat {...chat} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecommendedChatList;
