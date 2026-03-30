"use client";

import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMjI2YWUzNC0zOTgwLTQ5NTQtODU3Ny1hNDVlOWFjOTI1YjIiLCJpYXQiOjE3NzQ3ODA0MzEsImV4cCI6MTc3NTM4NTIzMX0.B084Uyvvt11BUqsTpIxqPcPAiw_g_4QxVlZ69eEK7D0`);

     

   
    ws.onopen = () => {
      console.log("Connected");
      setLoading(false);
      setSocket(ws);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    socket,
    loading,
  };
}