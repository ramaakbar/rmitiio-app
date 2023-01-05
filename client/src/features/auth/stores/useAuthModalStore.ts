import create from "zustand";

export type AuthType = "Register" | "Login";

type AuthModalState = {
  isOpen: boolean;
  type: AuthType;
  openModal: (type: AuthType) => void;
  closeModal: () => void;
};

const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  type: "Login",
  openModal: (type) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false }),
}));

export default useAuthModalStore;
