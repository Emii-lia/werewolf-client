import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/api/apiClient";

const useFetchRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      return roomsApi.getRooms()
    }
  })
}

export default useFetchRooms;