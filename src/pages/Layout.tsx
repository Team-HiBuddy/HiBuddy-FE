import BottomNavigationBar from "@components/layout/BottomNavigationBar";
import Header from "@components/layout/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-white">
        <Suspense
          fallback={
            <BubbleLoadingSVG className="w-16 h-16 ml-auto mr-auto mt-12 text-inhaSkyBlue" />
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <BottomNavigationBar />
    </div>
  );
}

export default Layout;
