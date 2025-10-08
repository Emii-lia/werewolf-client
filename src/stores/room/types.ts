import { GameState, PlayerDetails, RoomDetails, RoleResponse } from "@/api/openapi";
import { PlayerWithRole } from "@/types/websocket";

export type GameStates = {
  socket: WebSocket | null;
  isConnected: boolean;
  currentRoom: RoomDetails | null;
  myRole: RoleResponse | null;
  error: string | null;
  playersWithRoles: PlayerWithRole[] | null;
}

export type GameActions = {
  setSocket: (socket: WebSocket | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setCurrentRoom: (room: RoomDetails | null) => void;
  setMyRole: (role: RoleResponse | null) => void;
  setError: (error: string | null) => void;

  updatePlayer: (userId: string, updates: Partial<PlayerDetails>) => void;
  addPlayer: (player: PlayerDetails | null) => void;
  removePlayer: (userId: string) => void;
  setGameState: (state: GameState) => void;
  setPlayersWithRoles: (players: PlayerWithRole[] | undefined) => void;

  clearRoom: () => void;
}