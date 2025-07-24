'use server';
import { prisma } from "@/app/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: NextRequest, context: any
) {
    const id = context.params.id;

    try {
        const updated = await prisma.incident.update({
            where: { id },
            data: { resolved: true },
            include: { camera: true },
        });
        console.log("incident updated successfully")
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Failed to update incident:", error);
        return NextResponse.json(
            { error: "Failed to update incident" },
            { status: 500 }
        );
    }
}
