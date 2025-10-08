import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "@/api/apiClient";

type HookParams = {
  roleId: string;
  enabled?: boolean;
}
const useFetchRoleById = ({
  enabled = true,
  roleId
}: HookParams) => {
  const shouldFetch = enabled && !!roleId;

  return useQuery({
    queryKey: ["role", roleId || "none"],
    queryFn: async () => {
      if (!roleId) {
        throw new Error("Role ID is required");
      }
      return rolesApi.getRoleById(roleId);
    },
    enabled: shouldFetch,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export default useFetchRoleById;