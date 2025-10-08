import useGameStore from "@/stores/room";
import useFetchRooms from "@/rq-hooks/Room/useFetchRooms";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSendMessage from "@/hooks/useSendMessage";

const useJoinRoomModal = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>()
  const {
    currentRoom
  } = useGameStore()

  const sendMessage = useSendMessage()

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch
  } = useFetchRooms()

  const rooms = useMemo(() => {
    if (isSuccess && data)
      return data
    if (isError || isLoading) return []
    return []
  }, [data, isSuccess, isLoading, isError])

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch rooms")
    }
  }, [isError]);

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId)
  }

  const handleJoinRoom = () => {
    if (selectedRoomId) {
      sendMessage({
        type: "JoinRoom",
        room_id: selectedRoomId
      })
    }
  }

  const handleModalOpenChange = (open: boolean) => {
    if (open) {
      refetch()
    }
  }

  return {
    currentRoom,
    rooms,
    isLoading,
    handleSelectRoom,
    handleJoinRoom,
    selectedRoomId,
    handleModalOpenChange
  }
}

export default useJoinRoomModal;