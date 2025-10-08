import useGameStore from "@/stores/room";
import { ClientMessage } from "@/types/websocket";

const useSendMessage = () => {
  const socket = useGameStore(state => state.socket);

  return (mesage: ClientMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(mesage));
    }
  }
}

export default useSendMessage;