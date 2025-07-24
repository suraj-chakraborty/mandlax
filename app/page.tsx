'use client'
import IncidentPlayer from "./components/IncidentPlayer";
import IncidentList from "./components/IncidentList";
import Providers from "./components/Providet";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <Providers>
      <div className="max-h-screen  bg-[#131313] overflow-hidden flex flex-col">
        <Navbar />
        <div className="w-full flex h-[57vh] flex-row md:flex-row sm:flex-col xs:flex-col items-start justify-between gap-2 px-4 py-2 bg-[#131313] text-white">
          <div className="flex w-[50vw] h-full rounded">
            <IncidentPlayer />
          </div>
          <div className="flex-grow h-full overflow-auto scrollbar-hide">
            <IncidentList />
          </div>
        </div>
        <div className="w-full bg-[#121313] absolute bottom-4 scrollbar-hide">
          <Timeline />
        </div>
      </div>
    </Providers>

  );
}
