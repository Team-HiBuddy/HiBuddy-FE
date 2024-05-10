import PopularThreadList from "@components/PopularThreadList";
import RecommendedChats from "@components/RecommendedChatList";
import SchoolRelatedInfoBar from "@components/SchoolRelatedInfoBar";
import usePopularThreads from "@hooks/query/usePopularThreads";

function MainPage() {
  const { data: threads } = usePopularThreads();

  return (
    <main className="flex flex-col gap-6 px-2 pb-14">
      <SchoolRelatedInfoBar />
      <PopularThreadList threads={threads} />
      <RecommendedChats />
    </main>
  );
}

export default MainPage;
