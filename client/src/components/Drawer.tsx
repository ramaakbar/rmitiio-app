import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { useLogout } from "../features/auth/hooks/useLogout";
import useAuthModalStore from "../features/auth/stores/useAuthModalStore";
import useDrawerStore from "../stores/useDrawerStore";

export default function Drawer() {
  const openModal = useAuthModalStore((state) => state.openModal);
  const { open, toggle } = useDrawerStore();
  const { data: session } = useAuth();
  const mutation = useLogout();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={() => toggle(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30"></div>
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
              <div className="flex w-full flex-col pt-5 pb-2 ">
                <div className="mb-5 flex items-center justify-between px-4 ">
                  <h1
                    className="cursor-pointer select-none text-xl font-bold uppercase tracking-wide"
                    onClick={() => {
                      toggle(false);
                    }}
                  >
                    Rmitiio
                  </h1>
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-grey-400 transition duration-200 ease-in hover:bg-grey-100 hover:text-grey-500"
                    onClick={() => toggle(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col">
                  <Link
                    to={"/"}
                    onClick={() => {
                      toggle(false);
                    }}
                    className="px-4 py-2 text-grey-700 hover:text-grey-800"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/search"}
                    onClick={() => {
                      toggle(false);
                    }}
                    className="px-4 py-2 text-grey-700 hover:text-grey-800"
                  >
                    Search
                  </Link>
                  {!session && (
                    <>
                      <button
                        onClick={() => {
                          toggle(false);
                          openModal("Login");
                        }}
                        className="px-4 py-2 text-start text-grey-700 hover:text-grey-800"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          toggle(false);
                          openModal("Register");
                        }}
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
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
