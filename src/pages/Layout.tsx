import BottomNavigationBar from "@components/layout/BottomNavigationBar";
import Header from "@components/layout/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BubbleLoadingSVG from "@assets/bubble-loading.svg?react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import ApiErrorBoundary from "@components/errorBoundary/ApiErrorBoundary";
import DeferredComponent from "@components/DeferredComponent";

function Layout() {
  return (
    <div className="flex flex-col h-svh">
      <Header />
      <main className="bg-white">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ApiErrorBoundary onReset={reset}>
              <Suspense
                fallback={
                  <DeferredComponent>
                    <BubbleLoadingSVG className="w-16 h-16 ml-auto mr-auto mt-12 text-inhaSkyBlue" />
                  </DeferredComponent>
                }
              >
                <Outlet />
              </Suspense>
            </ApiErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
      <BottomNavigationBar />
    </div>
  );
}

export default Layout;
