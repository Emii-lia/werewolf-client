"use client"
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useRoomView from "@/features/RoomView/useRoomView";
import PlayerCard from "@/features/RoomView/components/PlayerCard";
import "./RoomView.scss"

const RoomView = () => {
  const {
    room,
    isHost,
    isReady,
    handleUpdateGameState,
    toggleIsReady,
    handleLeaveRoom,
    canStartGame
  } = useRoomView()

  if (!room) return null

  return (
    <div className="RoomView">
      <div className="view-header">
        <h3 className="room-name">
          {room.name}
        </h3>
        <p className="room-place">
          {room.players.length} / {room.max_players}
        </p>
      </div>
      <div className="room-players">
        <p className="players-title">
          Players
        </p>
        {room.players.map((player) => (
          <PlayerCard
            player={player}
            isHost={isHost}
            key={player.id}
          />
        ))}
      </div>
      <div className="room-actions">
        <Button
          variant="destructive"
          onClick={handleLeaveRoom}
        >
          Leave Room
        </Button>
        {!isHost && (
          <Button
            onClick={toggleIsReady}
          >
            {isReady? "Not Ready" : "Ready"}
          </Button>
        )}
        {isHost && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                disabled={!canStartGame}
                title={
                  room.players.length < 3?
                    "At least 3 players are required to start the game" :
                    ""
                }
              >
                Start Game
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start the game?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to start the game? All players will be assigned roles and the game will begin.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleUpdateGameState}>
                  Start Game
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

export default RoomView