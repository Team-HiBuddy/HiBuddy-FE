import PlusSVG from "@assets/plus.svg?react";
import ThreadList from "@components/ThreadList";
import useThreadList from "@hooks/query/thread/useThreadList";
import usePageRouter from "@hooks/usePageRouter";
import { Fab } from "@mui/material";
import { Suspense } from "react";

function ThreadListPage() {
  const { goToPostThreadPage } = usePageRouter();

  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <Suspense fallback={<div>LOADING</div>}>
        <ThreadList infiniteQuery={useThreadList} />
      </Suspense>
      <div className="fixed bottom-24 right-4 lg:right-28 z-50">
        <Fab color="secondary" onClick={goToPostThreadPage}>
          <PlusSVG />
        </Fab>
      </div>
    </main>
  );
}

export default ThreadListPage;
