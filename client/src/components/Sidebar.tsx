import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUserFn } from "../features/auth/authApi";
import useAuth from "../features/auth/hooks/useAuth";
import useAuthModalStore from "../features/auth/stores/useAuthModalStore";

export default function Sidebar() {
  const openModal = useAuthModalStore((state) => state.openModal);
  const { data: session, logout } = useAuth();
  const mutation = useMutation({
    mutationFn: logoutUserFn,
    onSuccess: () => {
      if (session) {
        logout();
        toast.success("Successfuly Logout");
      } else {
        toast.error("There was an error");
      }
    },
    onError: (error: any) => {
      toast.error(`There was an error, ${error.response.data.message}`);
    },
  });

  return (
    <aside className="col-span-1 hidden border-r sm:block">
      <nav className="sticky top-0 flex flex-col px-5">
        <h2 className="px-4 py-2 text-grey-700">Rmitiio</h2>
        <Link to={"/"} className="px-4 py-2 text-grey-700 hover:text-grey-800">
          Home
        </Link>
        <Link
          to={"/search"}
          className="px-4 py-2 text-grey-700 hover:text-grey-800"
        >
          Search
        </Link>
        {!session && (
          <>
            <button
              onClick={() => openModal("Login")}
              className="px-4 py-2 text-start text-grey-700 hover:text-grey-800"
            >
              Login
            </button>
            <button
              onClick={() => openModal("Register")}
              className="px-4 py-2 text-start text-grey-700 hover:text-grey-800"
            >
              Register
            </button>
          </>
        )}
        {session && (
          <>
            <button
              onClick={() => mutation.mutate()}
              className="px-4 py-2 text-start text-grey-700 hover:text-grey-800"
            >
              Logout
            </button>
            <Link
              to={`/${session.username}`}
              className="px-4 py-2 text-grey-700 hover:text-grey-800"
            >
              Profile
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
