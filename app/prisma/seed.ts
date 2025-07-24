import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum IncidentType {
    UNAUTHORISED_ACCESS = 'UNAUTHORISED_ACCESS',
    GUN_THREAT = 'GUN_THREAT',
    FACE_RECOGNISED = 'FACE_RECOGNISED',
}



async function main() {
    await prisma.camera.createMany({
        data: [
            { id: 'c1', name: 'Shop Floor A', location: 'Ground Level' },
            { id: 'c2', name: 'Vault', location: 'Basement' },
            { id: 'c3', name: 'Entrance', location: 'Reception' },
        ],
    });

    const incidents = Array.from({ length: 12 }).map((_, i) => {
        const start = new Date();
        start.setHours(23 - i * 2, 0, 0, 0);
        const end = new Date(start.getTime() + 1000 * 60 * (5 + i % 5));

        const types = [
            IncidentType.UNAUTHORISED_ACCESS,
            IncidentType.GUN_THREAT,
            IncidentType.FACE_RECOGNISED,
        ];

        const data: Record<string, string> = {
            data1: "https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/1.jpg",
            data2: "https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/2.jpg",
            data3: "https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/3.jpg"
        }
        const key = `data${(i % 3) + 1}`
        return {
            cameraId: `c${(i % 3) + 1}`,
            type: types[i % 3],
            tsStart: start,
            tsEnd: end,
            thumbnailUrl: data[key],
            resolved: i % 4 === 0,
        };
    });

    await prisma.incident.createMany({ data: incidents });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());