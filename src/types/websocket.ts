import { GameState, PlayerDetails, RoleResponse } from "@/api/openapi";

export type PlayerWithRole = PlayerDetails & {
  role?: RoleResponse;
};

export type ClientMessage =
  | { type: 'CreateRoom'; room_name: string }
  | { type: 'JoinRoom'; room_id: string }
  | { type: 'LeaveRoom'; room_id: string }
  | { type: 'ToggleReady'; room_id: string }
  | {type: 'GetRoomState'; room_id: string}
  | { type: 'SendMessage'; room_id: string; message: string }
  | { type: 'StartGame'; room_id: string }
  | { type: 'RemovePlayer'; room_id: string; user_id: string }
  | { type: 'ReassignRoles'; room_id: string }

export type ServerMessage =
  | { type: 'RoomCreated'; room_id: string; room_name: string }
  | { type: 'RoomJoined'; room_id: string; players: PlayerDetails[]; game_state: GameState; host_id: string; max_players: number; room_name: string }
  | { type: 'RoomLeft'; room_id: string }
  | { type: 'PlayerJoined'; room_id: string; player: PlayerDetails }
  | { type: 'PlayerLeft'; room_id: string; user_id: string }
  | { type: 'PlayerReady'; room_id: string; user_id: string; is_ready: boolean }
  | { type: 'PlayerKicked'; room_id: string; user_id: string }
  | { type: 'Message'; room_id: string; user_id: string; username: string; message: string }
  | { type: 'GameStarting'; room_id: string }
  | { type: 'RoleAssigned'; role_id: string }
  | { type: 'AllRolesAssigned'; players: PlayerWithRole[] }
  | { type: 'Error'; message: string };