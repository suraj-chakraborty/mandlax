'use client';
import Image from "next/image";
import ReactPlayer from "react-player";

export default function IncidentPlayer() {

    return (
        <div className="relative w-full max-w-3xl mx-auto pb-10">
            <div className="rounded-xl overflow-hidden mb-5 aspect-[14/6.6]">
                <ReactPlayer
                    src="https://www.youtube.com/watch?v=6BIFnvjpquk"
                    controls={false}
                    playing={false}
                    muted
                    loop={false}
                    width="100%"
                    height="100%"
                    className="!w-full !h-full"
                />
            </div>
            <div className="absolute bottom-4 right-4 flex gap-3 z-20 bg-black/60 p-3 rounded-xl backdrop-blur-md shadow-lg">
                {[2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <p className="text-white text-xs">Camera - 0{i}</p>
                        <Image
                            src={`https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/${i}.jpg`}
                            alt={`cam ${i}`}
                            className="rounded-md bg-gray-700 aspect-video object-cover"
                            width={120}
                            height={67}
                        />
                    </div>
                ))}
            </div>
        </div>


    );
}