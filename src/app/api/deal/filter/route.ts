import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const prisma = globalPrismaClient;
        const deals = await prisma.deal.findMany({
            where: {
                sector: {
                    contains: body?.sector || "",
                    mode: 'insensitive'
                },
                TTMRevenue: {
                    gte: Number(body?.revenue?.min) || 0,
                    lte: Number(body?.revenue?.max) || 1000,
                },
                AskPrice: {
                    gte: Number(body?.ebitda?.min )|| 0,
                    lte: Number(body?.ebitda?.max) || 1000,
                },
                companyAge: {
                    gte: Number(body?.age.min) || 0,
                    lte: Number(body?.age.max )|| 1000
                },
                description: {
                    contains: body?.searchTerm || "",
                    mode: 'insensitive'
                }
            }
        })
        return NextResponse.json({
            deals
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            deals: []
        })
    }
}