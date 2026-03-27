import dotenv from "dotenv";
dotenv.config();
import { WebSocketServer } from "ws";
import jwt, { decode } from 'jsonwebtoken'
const ws = new WebSocketServer({ port: 8080 });


function checkUser(token: string): string | null {

    const decoded = jwt.verify(token as string, JWT_SECRET as string)


    if (typeof decoded === "string") {
        return null;
    }


    if (!decoded || !decoded.userId) {
        return null;
    }


    return decoded.userId;

}

const JWT_SECRET = process.env.JWT_SECRET;

ws.on("connection", function connection(ws, request) {
    const url = request.url;

    if (!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    const userAuth = checkUser(token as string);

    if (!userAuth) {
        ws.close();
    }


    ws.on("message", function message(data) {
        ws.send("pong");
    });
});