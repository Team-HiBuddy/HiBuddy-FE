import BottomNavigationBar from "@components/layout/BottomNavigationBar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-white">
        <Outlet />
      </main>
      <BottomNavigationBar />
    </div>
  );
}

export default Layout;
