"use client";

import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

     
    
   
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
      ws.close(); // ✅ cleanup
    };
  }, []);

  return {
    socket,
    loading,
  };
}