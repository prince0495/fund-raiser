import { interestPayloadType } from "@/components/ui/Search";
import { globalPrismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as interestPayloadType;
        if(!body.slots || body.slots.length !== 2) {
            return NextResponse.json({success: false, msg: 'Two slots required'}, {status: 501})
        }
        const prisma = globalPrismaClient;

        const alreadyExist = await prisma.interest.findFirst({
            where: {
                investorId: body.userId,
                dealId: body.dealId
            }
        })
        if(alreadyExist) {
            return NextResponse.json({success: false, msg: 'Interest already exist for this deal'})
        }

        const interest = await prisma.interest.create({
            data: {
                investorId: body.userId,
                dealId: body.dealId,
                investorMessage: body.investorMessage
            }
        })
        await prisma.slot.create({
            data: {
                startTime: body.slots[0].startTime,
                endTime: body.slots[0].endTime,
                interestId: interest.id
            }
        })
        await prisma.slot.create({
            data: {
                startTime: body.slots[1].startTime,
                endTime: body.slots[1].endTime,
                interestId: interest.id
            }
        })
        const user = await prisma.user.findUnique({where: {id: body.userId},select: {name: true}})

        await prisma.notification.create({
            data: {
                founderId: body.founderId,
                investorId: body.userId,
                message: `New interest been shown in your dealId:${body.dealId} by a ${user?.name}`
            }
        })
        
        return NextResponse.json({success: true, msg: 'Interest created successfully'});
    } catch (error) {
            console.error("Error in POST /api/interest:", error);
        return NextResponse.json({success: false, msg: 'Internal Server Error'}, {status: 500});
    }
}