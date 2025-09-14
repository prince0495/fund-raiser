import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export type InterestReceived = {
  id: string;
  investorId: string;
  dealId: string;
  investorMessage: string;
  slots: {
    id: string;
    startTime: Date;
    endTime: Date;
    interestId: string;
  }[];
  deal: {
    description: string;
  };
  investor: {
    name: string;
  };
};


export async function GET(req: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
    try {
        const prisma = globalPrismaClient;
        const { slug } = await context.params;
        if (!slug || slug.length === 0) {
            return NextResponse.json({ error: "Missing params" }, { status: 400 });
        }
        const founderId = slug[0] || "";
        const interests: InterestReceived[] = await prisma.interest.findMany({
            where: {
                deal: {
                    userId: founderId
                },
                status: 'Pending'
            },
            select: {
                id: true,
                investorId: true,
                dealId: true,
                investorMessage: true,
                slots: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        interestId: true
                    }
                },
                deal: {
                    select: {
                        description: true
                    }
                },
                investor: {
                    select: {
                        name: true
                    }
                }
            }
        });
        
        return NextResponse.json({interests, success: true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, msg: 'Internal Server Error'}, {status: 500});
    }
}

