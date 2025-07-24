import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Clock4 } from "lucide-react";

const events = [
    { camera: "Camera - 01", type: "Unauthorized Access", time: "01:12", color: "bg-red-600" },
    { camera: "Camera - 01", type: "Face Recognized", time: "01:18", color: "bg-blue-600" },
    { camera: "Camera - 01", type: "Multiple Events", time: "01:23", color: "bg-gray-700" },
    { camera: "Camera - 01", type: "Unauthorized Access", time: "01:30", color: "bg-red-600" },

    { camera: "Camera - 02", type: "Unauthorized Access", time: "01:12", color: "bg-red-600" },
    { camera: "Camera - 02", type: "Face Recognized", time: "01:20", color: "bg-blue-600" },
    { camera: "Camera - 02", type: "Gas Threat", time: "01:32", color: "bg-orange-600" },

    { camera: "Camera - 03", type: "Traffic Congestion", time: "01:18", color: "bg-teal-600" },
    { camera: "Camera - 03", type: "Unauthorized Access", time: "01:29", color: "bg-red-600" },
];

const cameras = ["Camera - 01", "Camera - 02", "Camera - 03"];

const TIMELINE_DURATION_MINUTES = 36;

export default function Timeline() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playheadPercent, setPlayheadPercent] = useState(20);
    const timelineRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (!timelineRef.current) return;
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const offsetX = clientX - timelineRect.left;
        const percent = Math.max(0, Math.min(100, (offsetX / timelineRect.width) * 100));
        setPlayheadPercent(percent);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        handleMove(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            handleMove(e.clientX);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const timeToMinutes = (time: string) => {
        const [, minutes] = time.split(":").map(Number);
        return minutes;
    };

    return (
        <div className="text-white pl-6 pr-6 pt-2 rounded-xl w-full max-w-full mx-auto space-y-4 shadow-lg">
            <div className="flex w-full bg-[#131313] items-center justify-between gap-2 p-2 rounded">
                <div className="flex items-center gap-2">
                    <button className="bg-white/10 p-2 rounded-full hover:bg-white/20" aria-label="Skip Backwards">
                        <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button className="bg-white/10 p-2 rounded-full hover:bg-white/20" aria-label="Skip Forward">
                        <SkipForward className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                    <Clock4 className="w-4 h-4" />
                    <span>01:33</span>
                </div>
            </div>

            <div className="overflow-x-auto relative" ref={timelineRef} onMouseDown={handleMouseDown}>
                <div className="min-w-[800px] relative cursor-pointer">
                    <div
                        className="absolute top-0 bottom-0 w-[1px] bg-yellow-400 z-20 pointer-events-none"
                        style={{ left: `${playheadPercent}%` }}
                    />

                    <div className="flex border-b border-white/10 z-10 relative bg-[#0c0c0c]">
                        <h1 className="font-bold flex align-middle justify-center text-center" >Camera List</h1>
                        <div className="w-32" />
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex-1 text-center text-xs text-white/40 select-none">
                                01:{(i * 3).toString().padStart(2, "0")}
                            </div>
                        ))}
                    </div>

                    {cameras.map((camera, idx) => {
                        const cameraEvents = events.filter((e) => e.camera === camera);

                        return (
                            <div key={camera} className={`flex border-b border-white/10 h-8 relative`}>
                                <div className="w-32 text-sm text-white/80 flex items-center">{camera}</div>
                                <div className="flex-1 relative">
                                    {cameraEvents.map((event, idx2) => {
                                        const minutes = timeToMinutes(event.time);
                                        const leftPercent = (minutes / TIMELINE_DURATION_MINUTES) * 100;

                                        return (
                                            <div
                                                key={idx2}
                                                className={`absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 ${event.color} text-xs text-white px-2 py-1 rounded-full shadow whitespace-nowrap`}
                                                style={{ left: `${leftPercent}%` }}
                                                title={`${event.type} (${event.time})`}
                                            >
                                                {event.type}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
