'use server'
import { prisma } from '@/app/lib/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const resolved = req.nextUrl.searchParams.get('resolved');
    const filter = resolved !== null
        ? { resolved: resolved === "true" }
        : { resolved: resolved === "false" };
    const incidents = await prisma.incident.findMany({
        where: filter,
        include: { camera: true },
        orderBy: { tsStart: 'desc' },
    });
    console.log(resolved)
    return NextResponse.json(incidents);
}