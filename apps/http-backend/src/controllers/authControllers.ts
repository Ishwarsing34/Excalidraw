
import { Request, Response } from "express";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/schema"
// import {prisma} from "@repo/db/client";
import {prisma} from "@repo/db/client"
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export async function signUp(req: Request, res: Response) {
  try {
    const body = CreateUserSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({
        message: "Incorrect Inputs",
        errors: body.error.flatten()
      });
    }

    const { email, password, name, photo } = body.data;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        photo: photo ?? ""
      }
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}




export async function logIn(req: Request, res: Response) {
  try {
    const body = SigninSchema.safeParse(req.body);

    if (!body.success) {
      return res.json({
        message: "Incorrect Input"
      })
    }


    const {email , password} = body.data;

    const existingUser = await prisma.user.findUnique({
        where : {email}
    })


    if(!existingUser){
        return res.status(404).json({
          message : "No User Exists"
        })
    }

     const isMatch = await bcrypt.compare(password , existingUser.password);

     if(!isMatch){
      return res.status(400).json({
        message : "Incorrect Password"
      })
     }


    const token = jwt.sign({
       userId : existingUser.id
    }, JWT_SECRET)


    return res.status(200).json({
        message: "Login Successful",
        token
    })



  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}




export async function room(req: Request, res: Response) {
  try {


    const data = CreateRoomSchema.safeParse(req.body);

    if (!data.success) {
      return res.json({
        message: "Incorrect Input"
      })
    }
    res.json({ message: "Signup endpoint working" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

