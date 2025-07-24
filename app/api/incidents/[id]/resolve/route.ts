import { prisma } from "@/app/lib/PrismaClient";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: Request, { params }: any) {
    const updated = await prisma.incident.update({
        where: { id: params.id },
        data: { resolved: true },
        include: { camera: true },
    });
    return NextResponse.json(updated);
}