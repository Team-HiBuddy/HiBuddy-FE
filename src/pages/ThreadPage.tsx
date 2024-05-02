import ThreadList from "@components/ThreadList";

function ThreadPage() {
  return (
    <div>
      <main className="flex flex-col gap-6 px-2 pb-14">
        <ThreadList />
      </main>
    </div>
  );
}

export default ThreadPage;
