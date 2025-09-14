import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,context: { params: Promise<{ slug?: string[] }> }) {
    try {
        const prisma = globalPrismaClient;
        const { slug } = await context.params;
        if (!slug || slug.length === 0) {
            return NextResponse.json({ error: "Missing params" }, { status: 400 });
        }
        const founderId = slug[0];

        const notifications = await prisma.notification.findMany({
            where: {
                founderId: founderId
            },
            select: {
                createdAt: true,
                message: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        })
        return NextResponse.json({notifications});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500})
    }
}