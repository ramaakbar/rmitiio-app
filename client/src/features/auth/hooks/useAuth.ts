import jwtDecode from "jwt-decode";
import { UserType } from "../authTypes";
import { useAuthStore } from "../stores/useAuthStore";

interface TokenType {
  user: UserType;
  exp: number;
}

const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  if (token) {
    const { user: data } = jwtDecode<TokenType>(token);

    return { data, token, logout };
  }
  return {};
};

export default useAuth;
