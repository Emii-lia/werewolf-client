"use client"
import useGameStore from "@/stores/room";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useMenu from "@/features/Menu/useMenu";
import "./Menu.scss"
import JoiRoomModal from "@/features/JoiRoomModal";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter()
  const {
    error,
    isConnected,
  } = useGameStore()

  const {
    roomName,
    hostGame,
    handleInputChange,
    toCatalog
  } = useMenu()

  return (
    <div className="Menu">
      <div className="menu-content">
        <Modal
          trigger="Host Game"
          title="Host a new game"
          className="host-btn"
          footer={
            <Button
              onClick={hostGame}
              disabled={roomName.trim() === ""}
            >
              Create Room
            </Button>
          }
        >
          <div className="room-form">
            <div className="room-name-field">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                defaultValue="Room 1"
                onInput={handleInputChange}
                value={roomName}
              />
            </div>
          </div>
        </Modal>
        <JoiRoomModal
          disabled={!isConnected}

        />
        <Button
          className="menu-button"
          onClick={toCatalog}
          variant="secondary"
        >
          Roles Catalog
        </Button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}

export default Menu