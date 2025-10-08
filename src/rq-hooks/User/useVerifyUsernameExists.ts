import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/api/apiClient";

type HookParams = {
  username: string;
  enabled?: boolean;
}
const useVerifyUsernameExists = ({
  username,
  enabled = true,
}: HookParams) => {
  return useQuery({
    queryKey: ["verify-username-exists", username],
    queryFn: async () => {
      return await usersApi.verifyUsernameExists(username)
    },
    enabled: Boolean(username) && enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export default useVerifyUsernameExists;