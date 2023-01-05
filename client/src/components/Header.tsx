import { useLocation } from "react-router-dom";

export default function Header() {
  const loc = useLocation();

  return (
    <div className="sticky top-0 mb-5 border-b bg-white px-4 py-2">
      <h1 className="text-lg font-bold capitalize text-grey-900">
        {loc.pathname === "/" ? "Home" : loc.pathname.substring(1)}
      </h1>
    </div>
  );
}
