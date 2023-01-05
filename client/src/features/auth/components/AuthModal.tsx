import { Dialog, Transition } from "@headlessui/react";
import useAuthModalStore from "../stores/useAuthModalStore";
import { Fragment } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CloseIcon from "../../../components/CloseIcon";

export default function AuthModal() {
  const isOpen = useAuthModalStore((state) => state.isOpen);
  const type = useAuthModalStore((state) => state.type);
  const closeModal = useAuthModalStore((state) => state.closeModal);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center p-4 sm:top-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto w-full max-w-xl rounded-md bg-white p-4 ">
              <Dialog.Title
                as="div"
                className="mb-3 flex items-center justify-between"
              >
                <h3 className="text-lg font-medium text-grey-900">{type}</h3>
                <CloseIcon onClick={closeModal} />
              </Dialog.Title>
              {type === "Login" ? <LoginForm /> : <RegisterForm />}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
