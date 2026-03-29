import express, { Router } from 'express';
import { Createroom ,findRoom,getChats } from '../controllers/authControllers.js';
import { authcheck } from '../middlewares/auth.js';

const roomRouter : Router = express.Router();


roomRouter.post("/create" , authcheck , Createroom);
roomRouter.get("/chats/:roomId" , getChats)
roomRouter.get("/room/:slug" , findRoom)

export {roomRouter}


