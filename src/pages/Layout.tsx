import BottomNavigationBar from "@components/BottomNavigationBar";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <BottomNavigationBar />
    </>
  );
}

export default Layout;
