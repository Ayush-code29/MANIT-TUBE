import { Clock3, Trash2 } from "lucide-react";

export default function History() {
  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Watch history
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Videos you've recently watched.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#2A3037] px-4 py-2 text-sm text-gray-500 hover:text-white">
          <Trash2 size={16} />
          Clear history
        </button>

      </div>

      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#2A3037] py-24 text-center">

        <Clock3
          size={40}
          className="text-gray-700"
        />

        <h2 className="mt-4 font-semibold">
          Your history is empty
        </h2>

        <p className="mt-2 max-w-sm text-sm text-gray-600">
          Videos you watch will appear here.
        </p>

      </div>

    </div>
  );
}