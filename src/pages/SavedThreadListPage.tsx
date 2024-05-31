import ThreadList from "@components/ThreadList";
import useSavedThreadList from "@hooks/query/user/useSavedThreadList";

function SavedThreadListPage() {
  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <ThreadList infiniteQuery={useSavedThreadList} />
    </main>
  );
}

export default SavedThreadListPage;
