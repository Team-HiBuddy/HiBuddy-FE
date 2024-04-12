import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="max-w-xl mx-auto h-screen border border-sky-500">
      <Outlet />
    </div>
  );
}

export default App;
