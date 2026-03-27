
import { Request, Response } from "express";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/schema"
// import {prisma} from "@repo/db/client";
import { prisma } from "@repo/db/client"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/backend-common/config";
// import { MY_JWT_SECRET } from "@repo/backend-common/config";
  
const MY_JWT_SECRET = process.env.JWT_SECRET;


export async function signUp(req: Request, res: Response) {
  try {
    const body = CreateUserSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({
        message: "Incorrect Inputs",
        errors: body.error.flatten()
      });
    }

    // console.log("reached 1")

    const { email, password, name, photo } = body.data;
    console.log("reached 20")
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    // console.log("reached 2000")

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("reached 2")

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        photo: photo ?? ""
      }
    });

    // console.log("reached 3")

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
    console.log("the error is : - ", error)
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}




// export async function logIn(req: Request, res: Response) {
//   try {
//     const body = SigninSchema.safeParse(req.body);

//     if (!body.success) {
//       return res.json({
//         message: "Incorrect Input"
//       })
//     }


//     const { email, password } = body.data;

//     const existingUser = await prisma.user.findUnique({
//       where: { email }
//     })


//     if (!existingUser) {
//       return res.status(404).json({
//         message: "No User Exists"
//       })
//     }

//     const isMatch = await bcrypt.compare(password, existingUser.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Incorrect Password"
//       })
//     }


//     const token = jwt.sign({
//       userId: existingUser.id
//     }, MY_JWT_SECRET as string)


//     return res.status(200).json({
//       message: "Login Successful",
//       token
//     })



//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }

export async function logIn(req: Request, res: Response) {
  try {
    const parsed = SigninSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input"
      });
    }

    // console.log("reach 1")

    const { email, password } = parsed.data;
    
      console.log("reach 10")
    const user = await prisma.user.findUnique({
      where: { email }
    });
     

    // Don't reveal whether user exists or not
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }
      
  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    
    if (!MY_JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    } 

    

    const token = jwt.sign(
      { userId: user.id },
      MY_JWT_SECRET,
      { expiresIn: "7d" }
    );

   
    return res.status(200).json({
      message: "Login successful",
      token
    });


    

  } catch (error) {
  
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR"     
    });
  }
}




export async function Createroom(req: Request, res: Response) {
  try {


    const parsedata = CreateRoomSchema.safeParse(req.body);


    if (!parsedata.success) {
      return res.json({
        message: "Incorrect Input"
      })
    }



    const { name } = parsedata.data;


    //@ts-ignore

    const userId = req.userId;


    await prisma.room.create({
      data: {
        slug: name,
        adminId: userId
      }
    })
    return res.status(200).json({ message: "Signup endpoint working" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

