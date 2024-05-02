import BottomNavigationBar from "@components/BottomNavigationBar";
import Header from "@components/Header";
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
