import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="mx-auto grid min-h-screen max-w-3xl grid-cols-4">
      <Sidebar />
      <Drawer />
      <main className="col-span-4 border-r sm:col-span-3">
        <Header />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
