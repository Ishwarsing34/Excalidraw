import express, { Router } from 'express';
import { Createroom } from '../controllers/authControllers.js';
import { authcheck } from '../middlewares/auth.js';

const roomRouter : Router = express.Router();


roomRouter.post("/create" , authcheck , Createroom);


export {roomRouter}


