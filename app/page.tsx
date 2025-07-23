import IncidentPlayer from "./components/IncidentPlayer";
import IncidentList from "./components/IncidentList";
import Providers from "./components/Providet";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <div className=" w-full flex flex-row md:flex-row sm:flex-col items-start justify-between gap-2 px-4 py-8 bg-gray-900 text-white">
        <div className="w-3/5 pr-3">
          <IncidentPlayer />

        </div>
        <div className="w-2/5">
          <IncidentList />
        </div>

      </div>
    </Providers>
  );
}
