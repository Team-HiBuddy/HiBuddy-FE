import ThreadList from "@components/ThreadList";
import useMyThreadList from "@hooks/query/user/useMyThreadList";

function MyThreadListPage() {
  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <ThreadList infiniteQuery={useMyThreadList} />
    </main>
  );
}

export default MyThreadListPage;
