"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 ,
             color : "grey"
         }}>Join Room</h2>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <button
          onClick={() => {
            if (!roomId.trim()) return;
            router.push(`/room/${roomId}`);
          }}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#1d4ed8")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#2563eb")
          }
        >
          JOIN ROOM
        </button>
      </div>
    </div>
  );
}