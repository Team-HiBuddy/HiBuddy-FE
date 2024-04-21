import PopularThread from "./PopularThread";

const threads = [
  { title: "어쩌구 저쩌구 이러쿵 저러쿵 어쩌구 저쩌구 이러쿵 저러쿵", likes: 12, comments: 10 },
  { title: "이거 실화냐?", likes: 11, comments: 9 },
  { title: "어쩌구 저쩌구 이러쿵 저러쿵 어쩌구 저쩌구 이러쿵", likes: 9, comments: 8 },
];

function PopularThreadList() {
  return (
    <div>
      <h2 className="text-xl font-bold px-1 mb-2">Popular</h2>
      <div>
        <ul className="flex flex-col gap-2 border rounded border-inhaSkyBlue p-3">
          {threads.map((thread) => (
            <PopularThread key={thread.title} {...thread} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopularThreadList;
