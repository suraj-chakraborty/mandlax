'use server';
import { prisma } from '@/app/lib/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const resolved = req.nextUrl.searchParams.get('resolved');
    const filter = resolved !== null
        ? { resolved: resolved === "true" }
        : { resolved: resolved === "false" };
    try {
        const incidents = await prisma.incident.findMany({
            where: filter,
            include: { camera: true },
            orderBy: { tsStart: 'desc' },
        });

        return NextResponse.json(incidents);
    } catch (error) {
        console.error('Failed to fetch incidents:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}