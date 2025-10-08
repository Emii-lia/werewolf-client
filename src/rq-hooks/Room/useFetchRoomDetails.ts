import { useQuery } from "@tanstack/react-query";
import { roomsApi } from "@/api/apiClient";

type HookParams = {
  roomId: string;
  enabled?: boolean;
}
const useFetchRoomDetails = ({
  roomId,
  enabled = true,
}: HookParams) => {
  return useQuery({
    queryKey: ["room-details", roomId],
    queryFn: async () => {
      return roomsApi.getRoomDetails(roomId);
    }
  })
}

export default useFetchRoomDetails;