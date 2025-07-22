'use client';
export default function IncidentPlayer() {
    return (
        <div className="flex flex-col gap-4">
            <video
                src="../assets/test.mp4"
                controls
                className="w-full rounded-lg bg-gray-900 aspect-video"
            />
            <div className="flex gap-4">
                {/* {[1, 2, 3].map(i => (
                    <img
                        key={i}
                        src={`/thumb/${i}.jpg`}
                        className="w-1/3 rounded bg-gray-700 aspect-video object-cover"
                        alt={`cam ${i}`}
                    />
                ))} */}
            </div>
        </div>
    );
}