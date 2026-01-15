import "dotenv/config";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { loginSchema, registerSchema } from "../schemas/authschema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export const register = async (req:Request, res:Response) =>{

    // Validate body
    const { username, email, password, } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {email: email},
        select: {userId: true}
    })

    if (existingUser) {
      return res.status(409).json({ message: "Email ou mot de passe incorrect" });
    }

    // Hash password
    const hashPassword = await argon2.hash(password)

    // Create user
    const CreateUser = await prisma.user.create({
        data:{
            username: username,
            email: email,
            passwordHash: hashPassword
        }, 
        
    })

    return res
    .status(201)
    .json({message: "Enregistrement réussi", data: CreateUser})

}

export const login = async (req:Request, res:Response) =>{

    // Validate body
    const { email, password} = loginSchema.parse(req.body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!existingUser) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
    
    // compare if password is valid
    const isValid = await argon2.verify(existingUser.passwordHash ,password)

    if (!isValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Create a token
    const paydload = {
        userId: existingUser.userId
    } 
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({ message: "JWT_SECRET manquant dans .env" });
    }

    const accessToken = jwt.sign(paydload, secret, { expiresIn: "1h"});
    
    // send token in cookies
    res.cookie("accessToken", accessToken, {
        maxAge: 1*60*60*1000,
        httpOnly: true
    });

    return res.status(200).json({
        message: "Connexion réussie",
        data: existingUser
    });

    

    
}