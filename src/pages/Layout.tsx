import BottomNavigationBar from "@components/layout/BottomNavigationBar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNavigationBar />
    </>
  );
}

export default Layout;
