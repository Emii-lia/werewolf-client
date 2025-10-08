import { RoomInfo } from "@/api/openapi";
import StatusBadge from "@/components/StatusBadge";
import useRoomCard from "@/features/JoiRoomModal/components/RoomCard/useRoomCard";
import "./RoomCard.scss"
import { cn } from "@/lib/utils";

type Props = {
  room: RoomInfo
  className?: string
}
const RoomCard = ({
  room,
  className
}: Props) => {
  const {
    status
  } = useRoomCard(room)
  return (
    <div className={cn("RoomCard", className)}>
      <div className="room-card-header">
        <h2 className="room-name">
          {room.name}
        </h2>
        <div className="room-place-state">
          <p className="room-place">
            {room.player_count} / {room.max_players}
          </p>
          <StatusBadge variant={status}/>
        </div>
      </div>
      <div className="room-players">

      </div>
    </div>
  )
}

export default RoomCard;