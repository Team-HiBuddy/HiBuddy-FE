import { Skeleton } from "@mui/material";

function ThreadItemSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 h-80 p-2 rounded-xl  ">
      <section className="flex items-center gap-x-2 h-10">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width="70%" />
      </section>

      <section>
        <Skeleton className="text-lg" />
        <Skeleton className="text-lg" />
      </section>

      <section className="mt-auto h-36">
        <Skeleton variant="rounded" height={"100%"} />
      </section>

      <section className="h-8">
        <Skeleton width={"35%"} height={"100%"} />
      </section>
    </div>
  );
}

export default ThreadItemSkeleton;
