import { globalPrismaClient } from "@/lib/prisma";
import { sendMail } from "@/lib/send-mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const prisma = globalPrismaClient;
        const body = await req.json();
        const interestId = body?.interestId;
        const selectedSlotId = body?.selectedSlotId;
        if (!interestId || !selectedSlotId) {
            return NextResponse.json({ success: false, msg: 'Hey do not attempt it again' }, { status: 400 })
        }
        const interest = await prisma.interest.update({
            where: {
                id: interestId
            },
            data: {
                status: 'Active'
            },
            select: {
                investor: {
                    select: { name: true, email: true, companyName: true, industry: true }
                },
                deal: {
                    select: {
                        description: true,
                        user: {
                            select: { name: true, email: true, companyName: true }
                        }
                    }
                },
                slots: {
                    where: { id: selectedSlotId },
                    select: { startTime: true, endTime: true }
                },
                dealPartner: true
            }
        })
        
        if (!interest || !interest.slots.length) {
            return NextResponse.json({ success: false, msg: 'Could not find necessary details' }, { status: 404 });
        }

        const founder = interest.deal.user;
        const investor = interest.investor;
        const companyDescription = interest.deal.description;
        const selectedSlot = interest.slots[0];
        const dealPartnerEmail = interest.dealPartner;
        const meetingLink = "https://meet.google.com/abc-xyz-pqr";

        const investorEmailPayload = {
    sendTo: investor.email,
    subject: `Connecting ${investor.companyName || investor.name} & ${founder.companyName || 'a promising venture'} for a Deal`,
    
    text: `
Hello ${investor.name},

Doing what we love doing the best, connecting ${founder.name} from ${founder.companyName || 'a promising venture'} and ${investor.name} from ${investor.companyName || 'your firm'} for a potential Deal.

A QUICK OVERVIEW:
The Company: ${founder.companyName || 'This venture'} - ${companyDescription}
The Investor: ${investor.companyName || investor.name} investing in ${investor.industry || 'relevant sectors'}.

Your initial call is scheduled for ${new Date(selectedSlot.startTime).toLocaleString('en-US', { dateStyle: 'long' })}, from ${new Date(selectedSlot.startTime).toLocaleString('en-US', { timeStyle: 'short' })} to ${new Date(selectedSlot.endTime).toLocaleString('en-US', { timeStyle: 'short' })}.

Join via: ${meetingLink}
We have also sent a calendar invite with the meeting link to your email.
${dealPartnerEmail ? `\nIf you need any help, please contact your Deal Partner at ${dealPartnerEmail}.` : ''}

We look forward to getting you a great deal!

Regards,
Monter Team

---
Confidentiality Alert: This email and its attachments are strictly confidential. If you are not the intended recipient of this communication or have received this email in error, please notify us at hello@monter.one and delete this email. Unauthorized actions with this email are prohibited.
    `,

    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; }
            .container { max-width: 600px; margin: 20px auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; }
            .header { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 15px; }
            .section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }
            .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
            .section h3 { font-size: 16px; color: #444444; margin-top: 0; margin-bottom: 10px; }
            .highlight { background-color: #f8f8f8; padding: 18px; border-radius: 8px; }
            .footer { font-size: 12px; color: #888888; margin-top: 25px; text-align: center; }
            a { color: #4f46e5; text-decoration: none; }
            a:hover { text-decoration: underline; }
            strong { font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="container">
            <p class="header">Connection for a Potential Deal</p>
            <div class="section">
                <p>Hello ${investor.name},</p>
                <p>Doing what we love doing the best, connecting <strong>${founder.name}</strong> from <strong>${founder.companyName || 'a promising venture'}</strong> and <strong>${investor.name}</strong> from <strong>${investor.companyName || 'your firm'}</strong> for a potential Deal.</p>
            </div>
            <div class="section">
                <h3>A Quick Overview</h3>
                <p><strong>The Company:</strong> ${founder.companyName || 'This venture'} &mdash; ${companyDescription}</p>
                <p><strong>The Investor:</strong> ${investor.companyName || investor.name} investing in ${investor.industry || 'relevant sectors'}.</p>
            </div>
            <div class="section highlight">
                <h3>Meeting Details</h3>
                <p>
                    <strong>Date & Time:</strong> ${new Date(selectedSlot.startTime).toLocaleString('en-US', { dateStyle: 'full' })} <br> from <strong>${new Date(selectedSlot.startTime).toLocaleString('en-US', { timeStyle: 'short' })}</strong> to <strong>${new Date(selectedSlot.endTime).toLocaleString('en-US', { timeStyle: 'short' })}</strong>
                </p>
                <p><strong>Join Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
                <p style="font-size: 13px; color: #555;">We have also sent a calendar invite with the meeting link to your email.</p>
            </div>
            <div class="section">
                ${dealPartnerEmail ? `<p>If you need any help, please contact your Deal Partner at <a href="mailto:${dealPartnerEmail}">${dealPartnerEmail}</a>.</p>` : ''}
                <p>We look forward to getting you a great deal!</p>
            </div>
            <p>Regards,<br><strong>Monter Team</strong></p>
            <div class="footer">
                <p><strong>Confidentiality Alert:</strong> This email and its attachments are strictly confidential. If you are not the intended recipient of this communication or have received this email in error, please notify us at hello@monter.one and delete this email. Unauthorized actions with this email are prohibited.</p>
            </div>
        </div>
    </body>
    </html>
    `
};
        
        const founderEmailPayload = {
    sendTo: founder.email,
    subject: `Connecting ${investor.companyName || investor.name} & ${founder.companyName || 'your Company'} for a Deal`,

    text: `
Hello ${founder.name},

Doing what we love doing the best, connecting ${founder.name} from ${founder.companyName || 'your Company'} and ${investor.name} from ${investor.companyName || 'their firm'} for a potential Deal.

A QUICK OVERVIEW:
The Company: ${founder.companyName || 'Your Company'} - ${companyDescription}
The Investor: ${investor.companyName || investor.name} investing in ${investor.industry || 'relevant sectors'}.

Your initial call is scheduled for ${new Date(selectedSlot.startTime).toLocaleString('en-US', { dateStyle: 'long' })}, from ${new Date(selectedSlot.startTime).toLocaleString('en-US', { timeStyle: 'short' })} to ${new Date(selectedSlot.endTime).toLocaleString('en-US', { timeStyle: 'short' })}.

Join via: ${meetingLink}
We have also sent a calendar invite with the meeting link to your email.

Hi ${founder.name}, please go through the investor's profile to make the initial conversation more insightful. This material is also accessible on the Deal page under the 'Active Deals' tab.
${dealPartnerEmail ? `\nIf you need any help, please contact your Deal Partner at ${dealPartnerEmail}.` : ''}

We look forward to getting you a great deal!

Regards,
Monter Team

---
Confidentiality Alert: This email and its attachments are strictly confidential. If you are not the intended recipient of this communication or have received this email in error, please notify us at hello@monter.one and delete this email. Unauthorized actions with this email are prohibited.
    `,

    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; }
            .container { max-width: 600px; margin: 20px auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; }
            .header { font-size: 22px; font-weight: 600; color: #1a1a1a; margin-bottom: 15px; }
            .section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }
            .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
            .section h3 { font-size: 16px; color: #444444; margin-top: 0; margin-bottom: 10px; }
            .highlight { background-color: #f8f8f8; padding: 18px; border-radius: 8px; }
            .footer { font-size: 12px; color: #888888; margin-top: 25px; text-align: center; }
            a { color: #4f46e5; text-decoration: none; }
            a:hover { text-decoration: underline; }
            strong { font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="container">
            <p class="header">Connection for a Potential Deal</p>
            <div class="section">
                <p>Hello ${founder.name},</p>
                <p>Doing what we love doing the best, connecting <strong>${founder.name}</strong> from <strong>${founder.companyName || 'your Company'}</strong> and <strong>${investor.name}</strong> from <strong>${investor.companyName || 'their firm'}</strong> for a potential Deal.</p>
            </div>
            <div class="section">
                <h3>A Quick Overview</h3>
                <p><strong>The Company:</strong> ${founder.companyName || 'Your Company'} &mdash; ${companyDescription}</p>
                <p><strong>The Investor:</strong> ${investor.companyName || investor.name} investing in ${investor.industry || 'relevant sectors'}.</p>
            </div>
            <div class="section highlight">
                <h3>Meeting Details</h3>
                <p>
                    <strong>Date & Time:</strong> ${new Date(selectedSlot.startTime).toLocaleString('en-US', { dateStyle: 'full' })} <br> from <strong>${new Date(selectedSlot.startTime).toLocaleString('en-US', { timeStyle: 'short' })}</strong> to <strong>${new Date(selectedSlot.endTime).toLocaleString('en-US', { timeStyle: 'short' })}</strong>
                </p>
                <p><strong>Join Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
                <p style="font-size: 13px; color: #555;">We have also sent a calendar invite with the meeting link to your email.</p>
            </div>
             <div class="section">
                <p>Hi ${founder.name}, please go through the investor's profile to make the initial conversation more insightful. This material is also accessible on the Deal page under the 'Active Deals' tab by selecting this particular deal.</p>
                ${dealPartnerEmail ? `<p>If you need any help, please contact your Deal Partner at <a href="mailto:${dealPartnerEmail}">${dealPartnerEmail}</a>.</p>` : ''}
                <p>We look forward to getting you a great deal!</p>
            </div>
            <p>Regards,<br><strong>Monter Team</strong></p>
            <div class="footer">
                <p><strong>Confidentiality Alert:</strong> This email and its attachments are strictly confidential. If you are not the intended recipient of this communication or have received this email in error, please notify us at hello@monter.one and delete this email. Unauthorized actions with this email are prohibited.</p>
            </div>
        </div>
    </body>
    </html>
    `
};

        const res1 = await sendMail({
            sendTo: investor.email,
            subject: investorEmailPayload.subject,
            text: investorEmailPayload.text,
            html: investorEmailPayload.html
        })

        const res2 = await sendMail({
            sendTo: founder.email,
            subject: founderEmailPayload.subject,
            text: founderEmailPayload.text,
            html: founderEmailPayload.html
        })

        if(res1?.messageId && res2?.messageId) {
            console.log('Mail sent to both of the parties');
        }
        
        return NextResponse.json({ success: true, msg: 'Accepted the interest in this deal' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const prisma = globalPrismaClient;
        const body = await req.json();
        const interestId = body?.interestId || "";
        await prisma.interest.delete({
            where: {
                id: interestId
            }
        })
        return NextResponse.json({ success: true, msg: 'Successfully deleted the Interest in this deal' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
    }
}