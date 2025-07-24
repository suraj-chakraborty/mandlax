import { prisma } from "@/app/lib/PrismaClient";
import { NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function PUT(req: Request, { params }: { params: Params }) {
    try {
        const updated = await prisma.incident.update({
            where: { id: params.id },
            data: { resolved: true },
            include: { camera: true },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Failed to update incident", error);
        return NextResponse.json({ error: "Failed to update incident" }, { status: 500 });
    }
}
