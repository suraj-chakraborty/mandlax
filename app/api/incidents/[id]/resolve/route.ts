import { prisma } from "@/app/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const updated = await prisma.incident.update({
        where: { id: params.id },
        data: { resolved: true },
        include: { camera: true },
    });
    return NextResponse.json(updated);
}