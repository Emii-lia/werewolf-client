import { useEffect, useMemo, useState } from "react";
import useGameStore from "@/stores/room";
import useSendMessage from "@/hooks/useSendMessage";
import { useAuthStore } from "@/stores/auth";
import { PlayerDetails } from "@/api/openapi";
import { PlayerWithRole } from "@/types/websocket";

const useGameView = () => {
  const {
    currentRoom,
    myRole,
    playersWithRoles
  } = useGameStore();
  const {
    user
  } = useAuthStore()
  const sendMessage = useSendMessage();
  const [showRoleReveal, setShowRoleReveal] = useState(false);
  const [showRole, setShowRole] = useState(true);

  const isHost = useMemo(() => (
    !!currentRoom &&
    !!user &&
    currentRoom.host_id === user.id
  ), [currentRoom?.host_id, user]);

  const players: (PlayerDetails | PlayerWithRole)[] = useMemo(() =>
    (isHost? (playersWithRoles ?? [] ) : currentRoom?.players) ?? []
  , [isHost, playersWithRoles, currentRoom?.players])

  useEffect(() => {
    if (myRole) {
      setShowRoleReveal(true);
    }
  }, [myRole]);

  const handleCloseRoleReveal = () => {
    setShowRoleReveal(false);
  };

  const handleLeaveRoom = () => {
    if (currentRoom) {
      sendMessage({
        type: "LeaveRoom",
        room_id: currentRoom.id,
      });
    }
  };

  const handleReassign = () => {
    if (currentRoom && isHost) {
      sendMessage({
        type: "ReassignRoles",
        room_id: currentRoom.id,
      });
    }
  }

  const toggleShowRole = () => {
    setShowRole(prevState => (!prevState));
  }

  return {
    room: currentRoom,
    players,
    myRole,
    showRoleReveal,
    handleCloseRoleReveal,
    handleLeaveRoom,
    toggleShowRole,
    handleReassign,
    showRole,
    isHost
  };
};

export default useGameView;
