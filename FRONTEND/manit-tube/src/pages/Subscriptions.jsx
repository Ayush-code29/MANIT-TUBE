import { Users } from "lucide-react";

export default function Subscriptions() {
  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Subscriptions
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Latest videos from creators you follow.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#2A3037] py-24 text-center">

        <Users
          size={40}
          className="text-gray-700"
        />

        <h2 className="mt-4 font-semibold">
          No subscriptions yet
        </h2>

        <p className="mt-2 max-w-sm text-sm text-gray-600">
          Subscribe to creators and their latest videos
          will appear here.
        </p>

      </div>

    </div>
  );
}