import create from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

const getAuthFromCookie = () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getAuthFromCookie(),
  setToken: (newToken) => {
    localStorage.setItem("accessToken", newToken);
    set({
      token: newToken,
    });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      token: undefined,
    });
  },
}));
