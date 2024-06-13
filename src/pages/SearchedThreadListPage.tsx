import ThreadList from "@components/ThreadList";
import ThreadListSkeleton from "@components/skeleton/ThreadListSkeleton";
import useThreadSearch from "@hooks/query/thread/useThreadSearch";
import usePageRouter from "@hooks/usePageRouter";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

function SearchedThreadListPage() {
  const { keyword } = useParams();

  const { goToThreadListPage } = usePageRouter();

  if (!keyword) {
    alert("Invalid request.");

    goToThreadListPage();
    return;
  }

  const useThreadSearchQuery = () => useThreadSearch(keyword);

  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <h2 className="text-lg font-semibold p-2">{`Search results for '${keyword}'`}</h2>
      <hr className="w-full" />
      <Suspense fallback={<ThreadListSkeleton length={2} />}>
        <ThreadList infiniteQuery={useThreadSearchQuery} />
      </Suspense>
    </main>
  );
}

export default SearchedThreadListPage;
