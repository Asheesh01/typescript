import express from 'express';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type{ Request, Response, NextFunction } from "express";

import bcrypt from 'bcrypt'
import { connectDB, ContentModel, UserModel } from './db.js';
const app = express();
app.use(express.json())
dotenv.config();

function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    (req as any).userId = (decoded as any).id;

    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const HashPasword = await bcrypt.hash(password, 10)
        await UserModel.create({
            username: username,
            password: HashPasword
        })
        res.json({
            message: "User sign up"
        })
    } catch (error) {
        res.status(411).json({
            message: "User already exists"
        })
    }

})


app.post("/login", async (req, res) => {
    try {
        
        const username = req.body.username;
        const password = req.body.password;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newPass = await bcrypt.compare(password, user.password as string);
         if (!newPass) {
      return res.status(400).json({ message: "Incorrect password" })
    }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY as string);
            res.json({
                message:"Login Successfully",token
            })

    } catch (error) {
  res.status(411).json({
            message: "Login Error"
        })
    }
})

app.post("/content",authMiddleware,async(req,res)=>{
    try {
        const { title, link, tags } = req.body;
const userId = (req as any).userId;
    await ContentModel.create({
        title,
        link,
        tags,
        userId
    })
    res.json({message:"Content created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mesage:"Content not created"})
    }

})

app.get("/content",authMiddleware,async(req,res)=>{
    try {
        const userID=(req as any).userId;
  const content =await  ContentModel.find({
        userId:userID
    }).populate("userId","username")
    res.json({content})
    } catch (error) {
        console.log(error)
        res.json({message:"Not fetch Content"})
    }

})

app.delete("/delete",authMiddleware,async(req,res)=>{
    const contentId=req.body.contentId;
    const deleteContent=await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })
})
async function start() {
  await connectDB();

  app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
    
  });
}


start();

