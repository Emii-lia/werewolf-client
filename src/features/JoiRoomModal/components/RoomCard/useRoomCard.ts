import { GameState, type RoomInfo } from "@/api/openapi";
import type { StatusBadgeVariant } from "@/components/StatusBadge/type";
import { useMemo } from "react";

const useRoomCard = (
  room: RoomInfo
) => {
  const status: StatusBadgeVariant = useMemo(() => {
    switch (room.game_state) {
      case GameState.WAITING:
        return "none"
      case GameState.STARTING:
        return "idle"
      case GameState.IN_PROGRESS:
        return "online"
      case GameState.FINISHED:
        return "offline"
      default:
        return "none"
    }
  }, [room.game_state])

  return {
    status
  }
}

export default useRoomCard