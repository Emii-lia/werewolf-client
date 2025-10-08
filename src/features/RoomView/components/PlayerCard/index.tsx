import { PlayerDetails } from "@/api/openapi";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import usePlayerCard from "@/features/RoomView/components/PlayerCard/usePlayerCard";
import { CircleQuestionMark, Trash2Icon } from "lucide-react";
import "./PlayerCard.scss"
import { cn } from "@/lib/utils";

type Props = {
  player: PlayerDetails
  isHost: boolean
  className?: string
}
const PlayerCard = ({
  isHost,
  player,
  className
}: Props) => {
  const {
    handleRemovePlayer,
    isConfirming,
    isMe,
    role,
  } = usePlayerCard({
    player,
    isHost
  })
  return (
    <div className={cn("PlayerCard", className)}>
      <div className="player-info">
        <h2 className="player-name">
          {player.username}
        </h2>
        {isHost && role && (
          <span className="player-role">{role.name}</span>
        )}
      </div>
      <div className="player-status">
        <StatusBadge variant={player.is_ready? "online" : "offline"} />
        {(isHost && !isMe) &&
          <Button
            variant="ghost"
            onClick={handleRemovePlayer}
            size="icon"
          >
            {!isConfirming?
              <Trash2Icon className="trash-icon"/>:
              <CircleQuestionMark className="trash-icon"/>
            }

          </Button>
        }
      </div>
    </div>
  )
}

export default PlayerCard;