import { PlayerDetails } from "@/api/openapi";
import useGameStore from "@/stores/room";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/stores/auth";
import useSendMessage from "@/hooks/useSendMessage";
import { PlayerWithRole } from "@/types/websocket";

type HookParams = {
  isHost: boolean;
  player: PlayerDetails | PlayerWithRole;
}
const usePlayerCard = ({
  isHost,
  player
}: HookParams) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { currentRoom } = useGameStore()
  const sendMessage = useSendMessage()

  const { user } = useAuthStore()

  const role = (player as PlayerWithRole).role || null;

  const isMe = useMemo(() =>
    user?.id === player.user_id
  , [user, player])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleRemovePlayer = () => {
    if (!isHost || !currentRoom) return;

    if (!isConfirming) {
      setIsConfirming(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsConfirming(false)
        timeoutRef.current = null
      }, 4000)
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      sendMessage({
        type: "RemovePlayer",
        room_id: currentRoom.id,
        user_id: player.user_id
      })
    }
  }

  return {
    handleRemovePlayer,
    isConfirming,
    isMe,
    role,
  }
}

export default usePlayerCard