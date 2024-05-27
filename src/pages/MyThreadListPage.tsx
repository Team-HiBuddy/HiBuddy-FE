import ThreadList from "@components/ThreadList";
import useMyThreadList from "@hooks/query/user/useMyThreadList";

function MyThreadListPage() {
  const queryResult = useMyThreadList();

  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <ThreadList infiniteQueryResult={queryResult} />
    </main>
  );
}

export default MyThreadListPage;
