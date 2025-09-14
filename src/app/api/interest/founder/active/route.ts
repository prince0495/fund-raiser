import { globalPrismaClient } from "@/lib/prisma";
import { InterestStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type ActiveDeal = {
  deal: {
    id: string;          
    description: string;
  };
  investor: {
    name: string;
  };
  investorMessage: string;
  status: InterestStatus;
  dealPartner: string | null;
  lastActivity: string | null;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userId = body?.userId || "";
        const prisma = globalPrismaClient;
        const interests: ActiveDeal[] = await prisma.interest.findMany({
            where: {
                deal: {
                    userId: userId
                },
                status: 'Active'
            },
            select: {
                deal: {
                    select: {
                        id: true,
                        description: true,
                    }
                },
                investor: {
                    select: {
                        name: true
                    }
                },
                investorMessage: true,
                status: true,
                dealPartner: true,
                lastActivity: true
            }
        });
        return NextResponse.json({interests, success: true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false})
    }
}