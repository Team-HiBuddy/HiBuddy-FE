import ThreadList from "@components/ThreadList";
import ThreadListSkeleton from "@components/skeleton/ThreadListSkeleton";
import useMyThreadList from "@hooks/query/user/useMyThreadList";
import { Suspense } from "react";

function MyThreadListPage() {
  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <Suspense fallback={<ThreadListSkeleton length={2} />}>
        <ThreadList infiniteQuery={useMyThreadList} />
      </Suspense>
    </main>
  );
}

export default MyThreadListPage;
