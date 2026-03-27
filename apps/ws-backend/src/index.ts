import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import {prisma} from "@repo/db/client"


const ws = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

// ugly approach not good for scaling
const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET as string;

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") return null;

        if (!decoded || !decoded.userId) return null;

        return decoded.userId;
    } catch {
        return null;
    }
}

ws.on("connection", function connection(ws, request) {
    const url = request.url;

    if (!url) return;

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    if (!token) {
        ws.close();
        return;
    }

    const userId = checkUser(token);

    if (userId == null) {
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms: [],
        ws
    });

    ws.on("message",async function message(data) {
        const parsedData = JSON.parse(data.toString());

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) return;

            
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
        }

        if(parsedData.type === "chat"){

            const roomId = parsedData.roomId;
            const msg = parsedData.message;

            const numericRoomId = Number(roomId);

            await prisma.chat.create({
                data : {
                    roomId : numericRoomId,
                    message : msg,
                    userId
                }
            })

            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message : msg,
                        roomId
                    }))
                }
            })

        }



    });
});