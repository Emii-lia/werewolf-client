import { create } from "zustand";
import { GameActions, GameStates } from "@/stores/room/types";

type GameStore = GameStates & GameActions;
const useGameStore = create<GameStore>((set) => ({
  socket: null,
  isConnected: false,
  currentRoom: null,
  myRole: null,
  error: null,
  playersWithRoles: null,

  setSocket: (socket) => set({ socket }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setCurrentRoom: (currentRoom) => set({ currentRoom }),
  setMyRole: (myRole) => set({ myRole }),
  setError: (error) => set({ error }),
  setPlayersWithRoles: (players) => set({ playersWithRoles: players }),

  updatePlayer: (userId, updates) =>
    set((state) => ({
      currentRoom: state.currentRoom ?
        {
          ...state.currentRoom,
          players: state.currentRoom.players.map((player) =>
            player.user_id === userId ? { ...player, ...updates } : player)
        }: null
  })),
  addPlayer: (player) =>
    set((state) => ({
      currentRoom: state.currentRoom ?
        {
          ...state.currentRoom,
          players: player ? [...state.currentRoom.players, player] : state.currentRoom.players
        } : null
  })),
  removePlayer: (userId) =>
    set((state) => ({
      currentRoom: state.currentRoom ?
        {
          ...state.currentRoom,
          players: state.currentRoom.players.filter((player) => player.user_id !== userId)
        } : null,
  })),
  setGameState: (gameState) =>
    set((state) => ({
      currentRoom: state.currentRoom ? { ...state.currentRoom, game_state: gameState } : null,
  })),
  clearRoom: () =>
    set({
      currentRoom: null,
      myRole: null,
  })
}))

export default useGameStore;