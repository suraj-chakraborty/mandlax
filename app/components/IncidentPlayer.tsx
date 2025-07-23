'use client';
import Image from "next/image";
import ReactPlayer from "react-player";
export default function IncidentPlayer() {
    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="rounded overflow-hidden">
                <ReactPlayer
                    src='https://www.youtube.com/watch?v=6BIFnvjpquk'
                    controls={false}
                    playing={false}
                    muted
                    loop={false}
                    width="100%"
                    height="10%"
                    className="rounded aspect-video"
                />
            </div>


            <div className="absolute bottom-5 right-3 flex gap-3 z-12">
                {[2, 3].map(i => (
                    <div key={i}>
                        <p className="bg-black w-full text-white rounded pl-1" >camera - 0{i}</p>
                        <Image
                            src={`https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/${i}.jpg`}
                            className="w-34 rounded bg-gray-700 aspect-video object-cover"
                            alt={`cam ${i}`}
                            width={120}
                            height={67}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}