"use client"
import { useAuthStore } from "@/stores/auth";
import useWebsocket from "@/hooks/useWebsocket";

const Websocket= () => {
  const { token } = useAuthStore()
  useWebsocket(token)

  return (
    <div></div>
  )
}

export default Websocket