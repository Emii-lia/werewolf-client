import { GameState } from "@/api/openapi";
import { useAuthStore } from "@/stores/auth";
import { useCallback, useMemo } from "react";
import useGameStore from "@/stores/room";
import useSendMessage from "@/hooks/useSendMessage";

const useRoomView = () => {
  const { user } = useAuthStore()
  const {
    currentRoom,
    setGameState,
    updatePlayer
  } = useGameStore()
  const sendMessage = useSendMessage()

  const isHost = useMemo(() =>
    currentRoom?.host_id === user?.id
  , [currentRoom?.host_id, user])

  const player = currentRoom?.players.find(p => p.user_id === user?.id)
  const all_ready = currentRoom?.players.every(p => p.is_ready)
  const canStartGame = isHost && currentRoom && currentRoom.players.length >= 3

  const handleUpdateGameState = useCallback(() => {
    if (!canStartGame) return;
    if (currentRoom.game_state === GameState.WAITING) {
      setGameState(GameState.STARTING)
      sendMessage({
        type: "StartGame",
        room_id: currentRoom.id,
      })
    } else {
      setGameState(GameState.WAITING)
    }
  }, [currentRoom, sendMessage, canStartGame, setGameState])

  const toggleIsReady = useCallback(() => {
    if (player && currentRoom) {
      try {
        sendMessage({
          type: "ToggleReady",
          room_id: currentRoom.id,
        })
        updatePlayer(player.user_id, {
          is_ready: !player.is_ready
        })
      } catch (err) {
        console.error(err)
      }
    }
  }, [currentRoom, player, updatePlayer, sendMessage])

  const handleLeaveRoom = useCallback(() => {
    if (currentRoom) {
      sendMessage({
        type: "LeaveRoom",
        room_id: currentRoom.id,
      })
    }
  }, [currentRoom, sendMessage])

  return {
    room: currentRoom,
    isHost,
    handleUpdateGameState,
    toggleIsReady,
    handleLeaveRoom,
    isReady: useMemo(() => player?.is_ready, [player]),
    all_ready,
    canStartGame
  }
}

export default useRoomView;