import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import useDrawerStore from "../stores/useDrawerStore";

export default function Header() {
  const loc = useLocation();
  const toggle = useDrawerStore((state) => state.toggle);

  let pathName = "";
  if (loc.pathname === "/") {
    pathName = "Home";
  } else if (loc.pathname.includes("/posts")) {
    pathName = "Post";
  } else {
    pathName = loc.pathname.substring(1);
  }

  return (
    <div className="sticky top-0 mb-5 flex items-center border-b bg-white px-4 py-2">
      <button
        className="mr-2 rounded-md p-2 hover:bg-grey-100 hover:text-grey-500 sm:hidden"
        onClick={() => toggle(true)}
      >
        <Bars3BottomLeftIcon className="h-6 w-6 text-grey-900" />
      </button>
      <h1 className="text-lg font-bold capitalize text-grey-900">{pathName}</h1>
    </div>
  );
}
