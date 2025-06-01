import RegisterRoomForm from "@/components/RegisterRoomForm";
import LoginRoomForm from "@/components/LoginRoomForm";
import { useState } from "react";

export default function RoomForm({onClose}: {onClose: () => void}) {
    const [isRegisterRoomForm, setIsRegisterRoomForm] = useState<"login" | "create" | null>("create");

    // Function to handle setting the room form state
    const handleSetRoomForm = (panel: "create" | "login" | null) => {
        if (panel === null) {
            onClose();
        } else {
            setIsRegisterRoomForm(panel);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative">
                {isRegisterRoomForm === "create" && <RegisterRoomForm setRoomForm={handleSetRoomForm} />}
                {isRegisterRoomForm === "login" && <LoginRoomForm setRoomForm={handleSetRoomForm} />}
            </div>
        </div>
    );
}