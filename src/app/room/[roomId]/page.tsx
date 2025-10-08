"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useGameStore from "@/stores/room";
import useSendMessage from "@/hooks/useSendMessage";
import RoomView from "@/features/RoomView";
import GameView from "@/features/GameView";
import { GameState } from "@/api/openapi";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { currentRoom, isConnected } = useGameStore();
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (isConnected && roomId && !currentRoom) {
      sendMessage({
        type: "JoinRoom",
        room_id: roomId
      });
    }
  }, [isConnected, roomId, currentRoom, sendMessage]);

  useEffect(() => {
    if (!currentRoom) return;

    if (currentRoom.id !== roomId) {
      router.push(`/room/${currentRoom.id}`);
    }
  }, [currentRoom, roomId, router]);

  if (!currentRoom) {
    return (
      <div className="loading-container">
        <p>Loading room...</p>
      </div>
    );
  }

  if (currentRoom.game_state === GameState.STARTING || currentRoom.game_state === GameState.IN_PROGRESS) {
    return <GameView />;
  }

  return <RoomView />;
}
