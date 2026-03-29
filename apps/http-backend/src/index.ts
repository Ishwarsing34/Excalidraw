import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { authRouter } from "./routes/authRoutes.js";
import { roomRouter } from "./routes/roomRoutes.js";
import { Request , Response } from "express";


const app = express()


app.use(express.json());


app.use("/auth" , authRouter);
app.use("/rooms" , roomRouter);


app.get('/' , (req : Request , res : Response) =>{
     
    res.send("BACKEND IS LIVE")
})


app.listen(3001 , () =>{

    console.log("http backend is running at 3001")
})