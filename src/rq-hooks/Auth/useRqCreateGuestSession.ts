import { useMutation } from "@tanstack/react-query";
import { CreateGuestRequest } from "@/api/openapi";
import { guestApi } from "@/api/apiClient";

const useRqCreateGuestSession = () => {
  return useMutation({
    mutationKey: ["createGuestSession"],
    mutationFn: async (data: CreateGuestRequest) => {
      return guestApi.createGuestSession(data);
    }
  })
}

export default useRqCreateGuestSession;
