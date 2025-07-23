'use client';
import ReactPlayer from "react-player"
export default function IncidentPlayer() {
    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="rounded overflow-hidden">
                <ReactPlayer
                    url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWN5MDhxYWhsNXV5YnBiNG5ycGJyYmFnOGJyOXZnNjNob2s5eG14aiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/Ty9Sg8oHghPWg/giphy.gif"
                    controls
                    playing
                    muted
                    loop
                    width="100%"
                    height="100%"
                    className="rounded"
                />
            </div>


            <div className="absolute bottom-5 right-3 flex gap-3 z-12">
                {[2, 3].map(i => (
                    <div key={i}>
                        <p className="bg-black w-full text-white rounded pl-1" >camera - 0{i}</p>
                        <img
                            key={i}
                            src={`https://raw.githubusercontent.com/suraj-chakraborty/mandlax/refs/heads/master/thumb/${i}.jpg`}
                            className="w-34 rounded bg-gray-700 aspect-video object-cover"
                            alt={`cam ${i}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}