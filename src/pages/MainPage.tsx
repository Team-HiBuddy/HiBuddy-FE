import BottomNavigationBar from "@components/BottomNavigationBar";
import Header from "@components/Header";
import PopularThreadList from "@components/PopularThreadList";
import RecommendedChats from "@components/RecommendedChatList";
import SchoolRelatedInfoBar from "@components/SchoolRelatedInfoBar";

function MainPage() {
  return (
    <div>
      <Header />
      <main className="flex flex-col gap-6 px-2 pb-14">
        <SchoolRelatedInfoBar />
        <PopularThreadList />
        <RecommendedChats />
      </main>
      <BottomNavigationBar />
    </div>
  );
}

export default MainPage;
