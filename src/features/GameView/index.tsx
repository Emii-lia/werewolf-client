"use client"
import { Button } from "@/components/ui/button";
import useGameView from "@/features/GameView/useGameView";
import PlayerCard from "@/features/RoomView/components/PlayerCard";
import RoleReveal from "@/features/RoleReveal";
import "./GameView.scss";
import { cn } from "@/lib/utils";
import { CircleQuestionMarkIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AlertModal from "@/components/AlertModal";
import Modal from "@/components/Modal";
import CatalogCard from "@/components/CatalogCard";

const GameView = () => {
  const {
    room,
    myRole,
    showRoleReveal,
    showRole,
    handleCloseRoleReveal,
    handleLeaveRoom,
    toggleShowRole,
    handleReassign,
    players,
    isHost
  } = useGameView();

  if (!room) return null;

  return (
    <div className="GameView">
      {myRole && (
        <RoleReveal
          role={myRole}
          open={showRoleReveal}
          onClose={handleCloseRoleReveal}
        />
      )}

      <div className="game-header">
        <div className="room-info">
          <h3 className="room-name">{room.name}</h3>
          <p className="game-status">Game in progress</p>
        </div>

        {myRole && (
          <div className="my-role-display">
            <span className="role-label">Your role:</span>
            <Badge className={cn(
              "role-badge",
              myRole.role_type.toLowerCase(),
              { showRole }
            )}>
              {myRole.name}
            </Badge>
            <Modal
              trigger={
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn("help-btn", {showRole})}
                >
                  <CircleQuestionMarkIcon/>
                </Button>
              }
              title={"Role Information"}
              asChild
            >
              <CatalogCard role={myRole}/>
            </Modal>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShowRole}
            >
              {showRole ?
                <EyeOffIcon/>:
                <EyeIcon/>
              }
            </Button>
          </div>
        )}
      </div>

      <div className="game-content">
        <div className="players-section">
          <h4 className="section-title">Players ({room.players.length})</h4>
          <div className="players-grid">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isHost={isHost}
                className="player-card"
              />
            ))}
          </div>
        </div>

        <div className="game-actions">
          <Button
            variant="destructive"
            onClick={handleLeaveRoom}
          >
            Leave Game
          </Button>
          {isHost &&
            <AlertModal
              title={"End current round"}
              description={
                "Reassign all roles and start a new round?"
              }
              actionText={"Reassign"}
              trigger={"Reassign Roles"}
              onConfirm={handleReassign}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default GameView;
