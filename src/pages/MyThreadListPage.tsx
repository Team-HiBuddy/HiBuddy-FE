import ThreadList from "@components/ThreadList";
import ThreadListSkeleton from "@components/skeleton/ThreadListSkeleton";
import useMyThreadList from "@hooks/query/user/useMyThreadList";
import { Suspense } from "react";

function MyThreadListPage() {
  return (
    <div className="flex-col px-2 pb-14">
      <h2 className="text-lg font-semibold p-2">My Posts</h2>
      <hr className="w-full" />
      <Suspense fallback={<ThreadListSkeleton length={2} />}>
        <ThreadList infiniteQuery={useMyThreadList} />
      </Suspense>
    </div>
  );
}

export default MyThreadListPage;
