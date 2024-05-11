import PlusSVG from "@assets/plus.svg?react";
import ThreadList from "@components/ThreadList";
import { Fab } from "@mui/material";

function ThreadListPage() {
  return (
    <main className="flex-col gap-6 px-2 pb-14">
      <ThreadList />
      <div className="fixed bottom-24 right-4 lg:right-28 z-50">
        <Fab color="secondary" href="/post">
          <PlusSVG />
        </Fab>
      </div>
    </main>
  );
}

export default ThreadListPage;
