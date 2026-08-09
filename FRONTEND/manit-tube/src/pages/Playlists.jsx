import { ListVideo, Plus } from "lucide-react";

export default function Playlists() {
  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Your playlists
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Organize videos you want to watch later.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#22C55E] px-4 py-2.5 text-sm font-semibold text-[#07100A] hover:bg-[#2DD468]">
          <Plus size={17} />
          Create playlist
        </button>

      </div>

      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#2A3037] py-24 text-center">

        <ListVideo
          size={40}
          className="text-gray-700"
        />

        <h2 className="mt-4 font-semibold">
          No playlists yet
        </h2>

        <p className="mt-2 max-w-sm text-sm text-gray-600">
          Create playlists to organize your favorite
          videos.
        </p>

      </div>

    </div>
  );
}