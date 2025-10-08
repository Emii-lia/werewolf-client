import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "@/api/openapi";
import { authApi } from "@/api/apiClient";

const useRqSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupRequest) => {
      return  authApi.signup(data);
    }
  })
}

export default useRqSignup;