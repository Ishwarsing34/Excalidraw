"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "@/draw";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set size AFTER mount (important for Next.js)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        initDraw(canvas, ctx);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                backgroundColor: "black",
                display: "block",
            }}
        />
    );
}