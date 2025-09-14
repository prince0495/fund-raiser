import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type DealBody = {
    sector: string;
    companyAge: number;
    description: string;
    TTMRevenue: number;
    AskPrice: number;
    customers: number;
    userId: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as DealBody;

        const prisma = globalPrismaClient;
        await prisma.deal.create({
            data: {
                userId: body.userId,
                sector: body.sector,
                companyAge: body.companyAge,
                description: body.description,
                TTMRevenue: body.TTMRevenue,
                AskPrice: body.AskPrice,
                customers: body.customers,
            }
        })
        return NextResponse.json({success: true, msg: 'deal created successfully'})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, msg: 'Internal server error'}, {status: 500})
    }
    
}

export async function GET() {
    try {
        const prisma = globalPrismaClient;
        const deals = await prisma.deal.findMany({})
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