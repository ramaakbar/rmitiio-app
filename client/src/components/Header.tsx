import { useLocation } from "react-router-dom";

export default function Header() {
  const loc = useLocation();

  let pathName = "";
  if (loc.pathname === "/") {
    pathName = "Home";
  } else if (loc.pathname.includes("/posts")) {
    pathName = "Post";
  } else {
    pathName = loc.pathname.substring(1);
  }

  return (
    <div className="sticky top-0 mb-5 border-b bg-white px-4 py-2">
      <h1 className="text-lg font-bold capitalize text-grey-900">{pathName}</h1>
    </div>
  );
}
