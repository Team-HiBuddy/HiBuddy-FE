import ThreadView from "@components/ThreadView";
import ThreadViewSkeleton from "@components/skeleton/ThreadViewSkeleton";
import usePageRouter from "@hooks/usePageRouter";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

function ThreadViewPage() {
  const { postId } = useParams();

  const { goToThreadListPage } = usePageRouter();

  if (!postId) {
    alert("The thread does not exist.");

    goToThreadListPage();
  }

  return (
    <div className="px-4 py-2">
      <Suspense fallback={<ThreadViewSkeleton />}>
        <ThreadView postId={Number(postId)} />
      </Suspense>
    </div>
  );
}

export default ThreadViewPage;
