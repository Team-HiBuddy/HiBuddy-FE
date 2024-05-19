import BottomNavigationBar from "@components/layout/BottomNavigationBar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <BottomNavigationBar />
    </>
  );
}

export default Layout;
