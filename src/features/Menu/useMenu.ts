import useSendMessage from "@/hooks/useSendMessage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useGameStore from "@/stores/room";

const useMenu = () => {
  const router  = useRouter()
  const [roomName, setRoomName] = useState("")
  const [roomCreated, setRoomCreated] = useState(false)

  const sendMessage = useSendMessage()
  const {
    currentRoom
  } = useGameStore()
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRoomName(event.currentTarget.value)
  }

  const hostGame = () => {
    if (roomName.trim() === "") return
    sendMessage({ type: "CreateRoom", room_name: roomName })
    setRoomName("")
    setRoomCreated(true)
  }

  const toCatalog = () => {
    router.push("/roles")
  }

  useEffect(() => {
    if (roomCreated && currentRoom) {
      router.push(`/room/${currentRoom.id}`)
    }
  }, [roomCreated, currentRoom]);

  return {
    roomName,
    handleInputChange,
    hostGame,
    toCatalog,
    roomCreated
  }
}

export default useMenu;