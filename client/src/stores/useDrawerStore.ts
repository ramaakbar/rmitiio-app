import create from "zustand";

type DrawerState = {
  open: boolean;
  toggle: (state: boolean) => void;
};

const useDrawerStore = create<DrawerState>((set) => ({
  open: false,
  toggle: (state) => set({ open: state }),
}));

export default useDrawerStore;
