"use client"
import Modal from "@/components/Modal";
import useJoinRoomModal from "@/features/JoiRoomModal/useJoinRoomModal";
import { Loader2Icon } from "lucide-react";
import RoomCard from "@/features/JoiRoomModal/components/RoomCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./JoinRoomModal.scss"

type Props = {
  disabled?: boolean;
}
const JoiRoomModal = ({
  disabled = false,
}: Props) => {
  const {
    rooms,
    isLoading,
    selectedRoomId,
    handleSelectRoom,
    handleJoinRoom,
    handleModalOpenChange
  } = useJoinRoomModal()
  return (
    <Modal
      trigger="Join a room"
      title="Select a room"
      className="JoinRoomModal"
      disabled={disabled}
      onOpenChange={handleModalOpenChange}
      footer={
        <Button
          disabled={!selectedRoomId}
          onClick={handleJoinRoom}
        >
          Join Room
        </Button>
      }
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin"/>
      ):
        rooms.length <= 0?
        <div className="no-rooms">
          No room found.
        </div>:
        <div className="room-list">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => handleSelectRoom(room.id)}
            >
              <RoomCard
                room={room}
                className={cn({
                  "selected": selectedRoomId === room.id
                })}
              />
            </div>
          ))}
        </div>
      }
    </Modal>
  )
}

export default JoiRoomModal;