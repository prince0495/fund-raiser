
import { globalPrismaClient } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type SignupBody = {
  name: string;
  role: Role;       
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as SignupBody;
        const { name, role, email, password } = body;
    
        const prisma = globalPrismaClient;
        const alreadyExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(alreadyExist) {
            return NextResponse.json({msg: "Incorrect email or password"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name,
                role,
            }
        })
        const token = jwt.sign({userId: user.id, role: user.role, email: user.email}, "james", {
            expiresIn: '7d'
        })

        const res = NextResponse.json({ msg: "User created", success: true });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            });

        return res;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Internal server error", success: false }, { status: 500 });
    }
}