// app/api/incidents/route.ts
import { prisma } from '@/app/lib/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const resolved = req.nextUrl.searchParams.get('resolved') === 'true';
    const incidents = await prisma.incident.findMany({
        where: { resolved },
        include: { camera: true },
        orderBy: { tsStart: 'desc' },
    });
    console.log(resolved)
    return NextResponse.json(incidents);
}