import emptyBox from "@assets/empty-box.png";

function EmptyThreadList() {
  return (
    <div className="flex flex-col items-center gap-y-8 w-full">
      <img src={emptyBox} className="w-2/5 h-2/5 " />
      <p className="font-bold text-2xl">There is nothing yet.</p>
    </div>
  );
}

export default EmptyThreadList;
