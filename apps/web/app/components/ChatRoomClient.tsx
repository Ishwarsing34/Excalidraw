"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const { socket, loading } = useSocket();

  const [currMsg, setCurrMsg] = useState("");
  const [chats, setChats] = useState(messages);

  useEffect(() => {
    if (!socket || loading) return;

    const handleMessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "chat") {
        setChats((c) => [...c, { message: parsedData.message }]);
      }
    };

    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId: id,
      })
    );

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, loading, id]);

  const sendMessage = () => {
    if (!currMsg.trim()) return;

    socket?.send(
      JSON.stringify({
        type: "chat",
        roomId: id,
        message: currMsg,
      })
    );

    setCurrMsg("");
  };

  return (
    <div>
      {chats.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}

      <input
        type="text"
        placeholder="message"
        value={currMsg}
        onChange={(e) => setCurrMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}