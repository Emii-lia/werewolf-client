import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/api/openapi";
import { authApi } from "@/api/apiClient";

const useRqLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginRequest) => {
      return authApi.login(data);
    }
  })
}

export default useRqLogin;