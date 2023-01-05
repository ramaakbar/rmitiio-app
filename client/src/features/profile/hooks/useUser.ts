import { useQuery } from "@tanstack/react-query";
import { fetchUserByUsername } from "../profileApi";

export const useUser = (username: string | undefined) =>
  useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUserByUsername(username),
  });
