import ThreadList from "@components/ThreadList";
import ThreadListSkeleton from "@components/skeleton/ThreadListSkeleton";
import useSavedThreadList from "@hooks/query/user/useSavedThreadList";
import { Suspense } from "react";

function SavedThreadListPage() {
  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <h2 className="text-lg font-semibold p-2">Saved Posts</h2>
      <hr className="w-full" />
      <Suspense fallback={<ThreadListSkeleton length={2} />}>
        <ThreadList infiniteQuery={useSavedThreadList} />
      </Suspense>
    </main>
  );
}

export default SavedThreadListPage;
