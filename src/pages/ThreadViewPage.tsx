import ThreadView from "@components/ThreadView";
import useThread from "@hooks/query/thread/useThread";
import usePageRouter from "@hooks/usePageRouter";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ThreadViewPage() {
  const { postId } = useParams();

  const { data, isPending, isSuccess } = useThread(Number(postId));

  const { goBack } = usePageRouter();

  useEffect(() => {
    if (isPending) return;

    if (!isSuccess) {
      alert("The thread does not exist.");

      goBack();
    }
  }, [isPending]);

  return (
    <div className="px-4 py-2">
      <ThreadView threadData={data} />
    </div>
  );
}

export default ThreadViewPage;
