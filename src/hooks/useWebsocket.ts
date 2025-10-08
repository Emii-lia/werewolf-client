import { useEffect, useRef } from "react";
import useGameStore from "@/stores/room";
import { ServerMessage } from "@/types/websocket";
import { GameState } from "@/api/openapi";
import { useAuthStore } from "@/stores/auth";
import { queryClient } from "@/providers/ReactQuery";
import { toast } from "react-toastify";
import { rolesApi } from "@/api/apiClient";
import { useRouter } from "next/navigation";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws";
const useWebsocket = (token: string | null) => {
  const router = useRouter();
  const reconnectTimeout = useRef<NodeJS.Timeout>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const {
    user
  } = useAuthStore()
  const {
    setSocket,
    setIsConnected,
    setCurrentRoom,
    setMyRole,
    setError,
    updatePlayer,
    addPlayer,
    removePlayer,
    setGameState,
    setPlayersWithRoles,
  } = useGameStore()

  useEffect(() => {
    if (!token) return;

    const connect = () => {

      const ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`)
      ws.onopen = () => {
        console.log("WebSocket connected");
        const currentRoomId = useGameStore.getState().currentRoom?.id;
        if (currentRoomId) {
          ws.send(JSON.stringify({
            type : "GetRoomState",
            room_id : currentRoomId
          }));
        }
        setIsConnected(true);
        setSocket(ws);
        reconnectAttempts.current = 0;
      }
      ws.onmessage = (event) => {
        const message: ServerMessage = JSON.parse(event.data);
        switch (message.type) {
          case "RoomCreated":
            console.log("Room created:", message.room_name);
            setCurrentRoom({
              id: message.room_id,
              name: message.room_name,
              game_state: GameState.WAITING,
              max_players: 40,
              host_id: user?.id || '',
              players: []
            })
            ws.send(JSON.stringify({
              type: "JoinRoom",
              room_id: message.room_id
            }))
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            router.push(`/room/${message.room_id}`);
            break;
          case "RoomJoined":
            setCurrentRoom({
              id: message.room_id,
              host_id: message.host_id,
              game_state: message.game_state,
              players: message.players,
              name: message.room_name,
              max_players: message.max_players
            })
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            router.push(`/room/${message.room_id}`);
            break;
          case "RoomLeft":
            setCurrentRoom(null);
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            router.push("/menu");
            break;
          case "PlayerJoined":
            addPlayer(message.player);
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            break;
          case "PlayerLeft":
            removePlayer(message.user_id);
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            break;
          case "PlayerReady":
            updatePlayer(message.user_id, { is_ready: message.is_ready });
            break;
          case "PlayerKicked":
            removePlayer(message.user_id);
            if (message.user_id === user?.id) {
              toast.error("You have been kicked from the room");
              setCurrentRoom(null);
              router.push("/menu");
            }
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            break;
          case "Message":
            console.log(`[${message.username}]: ${message.message}`);
            break;
          case "GameStarting":
            setGameState(GameState.STARTING)
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            break;
          case "RoleAssigned":
            rolesApi.getRoleById(message.role_id)
              .then(role => {
                setMyRole(role);
                toast.success(`You are a ${role.name}!`);
              })
              .catch(err => {
                console.error("Failed to fetch role:", err);
                toast.error("Failed to load your role");
              });
            break;
          case "AllRolesAssigned":
            setCurrentRoom({
              ...useGameStore.getState().currentRoom!,
              players: message.players
            });
            setPlayersWithRoles(message.players)
            toast.success("All roles have been assigned!");
            break;
          case "Error":
            setError(message.message);
            toast.error(message.message);
            setTimeout(() => setError(null), 5000);
            break;
          default:
            console.warn("Unknown message type:", message);

        }
      }
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket error occurred");
      }
      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        setSocket(null);
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
            reconnectTimeout.current = setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, delay);
        }
      }
    }
    connect();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      const { socket } = useGameStore.getState();
      socket?.close()
    }
  }, [token]);
}

export default useWebsocket;