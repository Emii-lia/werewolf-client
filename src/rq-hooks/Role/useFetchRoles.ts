import { useQuery } from "@tanstack/react-query";
import { rolesApi, setAuthToken } from "@/api/apiClient";
import { useAuthStore } from "@/stores/auth";

const useFetchRoles = () => {
  const token = useAuthStore(state => state.token);

  if (token) {
    setAuthToken(token)
  }
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      return rolesApi.getRoles()
    }
  })
}

export default useFetchRoles;