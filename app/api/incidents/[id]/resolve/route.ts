import { prisma } from "@/app/lib/PrismaClient";
import { NextResponse } from "next/server";

// app/api/incidents/[id]/resolve/route.ts
export async function PATCH(_: Request, { params }: { params: { id: string } }) {
    const updated = await prisma.incident.update({
        where: { id: params.id },
        data: { resolved: true },
        include: { camera: true },
    });
    return NextResponse.json(updated);
}