import { FormUserType, UserType } from "@/components/screen/UserProfilePage";
import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    try {
        const prisma = globalPrismaClient;
        const { slug } = await context.params;
        if (!slug || slug.length === 0) {
            return NextResponse.json({ error: "Missing params" }, { status: 400 });
        }
        const userId = slug[0] || "";
        const user: UserType | null = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
                role: true,
                location: true,
                bio: true,
                linkedinUrl: true,
                twitterUrl: true,
                personalWebsite: true,
                companyName: true,
                industry: true
            }
        });
        return NextResponse.json({user})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: 'Internal Error'}, {status: 500})
    }
}

export async function POST(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    try {
        const prisma = globalPrismaClient;
        const { slug } = await context.params;
        if (!slug || slug.length === 0) {
            return NextResponse.json({ error: "Missing params" }, { status: 400 });
        }
        const userId = slug[0] || "";
        const body = await req.json() as FormUserType;
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: body.name,
                role: body.role,
                location: body.location,
                bio: body.bio,
                linkedinUrl: body.linkedinUrl,
                twitterUrl: body.twitterUrl,
                personalWebsite: body.personalWebsite,
                companyName: body.companyName,
                industry: body.industry
            }
        })
        return NextResponse.json({success: true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, msg: 'Internal Server Error'}, {status: 500})
    }
}