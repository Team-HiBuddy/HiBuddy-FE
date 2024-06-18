import useTestHistory from "@hooks/query/koreanTest/useTestHistory";
import TestHistoryItem from "./TestHistoryItem";
import usePageRouter from "@hooks/usePageRouter";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";

function TestHistoryList() {
  const { goToTestResultPage } = usePageRouter();

  const { data, hasNextPage, fetchNextPage } = useTestHistory();

  const lastItemRef = useRef<HTMLElement>(null);

  const { isIntersecting } = useIntersectionObserver(lastItemRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  if (data.length < 1) return null;

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="text-xl font-semibold">Test History</h2>
      <ul className="flex flex-col gap-y-5 w-full">
        {data.map(({ testId, scriptName, testDate }) => (
          <li
            key={testId}
            onClick={() => {
              goToTestResultPage(testId);
            }}
          >
            <TestHistoryItem
              history={{
                testId: testId,
                scriptName: scriptName,
                date: new Date(testDate),
              }}
            />
          </li>
        ))}
      </ul>

      <section ref={lastItemRef}>
        {hasNextPage ? (
          <BubbleLoadingSVG className="w-12 h-12 ml-auto mr-auto text-inhaSkyBlue" />
        ) : null}
      </section>
    </div>
  );
}

export default TestHistoryList;
