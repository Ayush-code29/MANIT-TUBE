import { useEffect, useMemo, useState } from "react";
import {
  Play,
  UserRound,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getVideos } from "../api/videoApi";
import VideoCard from "../components/video/VideoCard";

export default function Channel() {
  const { username } = useParams();

  const [videos, setVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadChannel = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getVideos(
          1,
          50
        );

        setVideos(data.videos || []);
      } catch (error) {
        console.error(
          "Channel error:",
          error
        );

        setError(
          "Unable to load this channel."
        );
      } finally {
        setLoading(false);
      }
    };

    loadChannel();
  }, [username]);

  const channelVideos = useMemo(() => {
    return videos.filter(
      (video) =>
        video.owner?.username?.toLowerCase() ===
        username?.toLowerCase()
    );
  }, [videos, username]);

  const owner =
    channelVideos[0]?.owner || null;

  const channelName =
    owner?.fullName ||
    owner?.username ||
    username;

  const avatar =
    owner?.avatar ||
    "https://i.pravatar.cc/150?img=12";

  return (
    <div className="mx-auto max-w-[1400px] pb-20">
      <section className="relative overflow-hidden rounded-3xl border border-[#24282E] bg-[#111418]">
        <div className="h-36 bg-gradient-to-r from-[#151A1F] via-[#18252A] to-[#101418] sm:h-48" />

        <div className="px-5 pb-7 sm:px-8">
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <img
                src={avatar}
                alt={channelName}
                className="h-24 w-24 rounded-full border-4 border-[#111418] object-cover sm:h-28 sm:w-28"
              />

              <div>
                <p className="text-xs font-medium text-gray-600">
                  @
                  {owner?.username ||
                    username}
                </p>

                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                  {channelName}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {channelVideos.length}{" "}
                  published{" "}
                  {channelVideos.length === 1
                    ? "video"
                    : "videos"}
                </p>
              </div>
            </div>

            <button className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:bg-gray-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <div className="flex items-center gap-2">
          <Play
            size={17}
            className="text-[#22C55E]"
          />

          <h2 className="text-lg font-bold">
            Videos
          </h2>
        </div>

        {loading && (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >
                <div className="aspect-video rounded-xl bg-[#181C21]" />

                <div className="mt-3 h-4 rounded bg-[#181C21]" />
                <div className="mt-2 h-3 w-2/3 rounded bg-[#181C21]" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-7 rounded-2xl border border-[#24282E] bg-[#111418] p-10 text-center">
            <UserRound
              size={22}
              className="mx-auto text-gray-600"
            />

            <p className="mt-3 text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          channelVideos.length === 0 && (
            <div className="mt-7 rounded-2xl border border-[#24282E] bg-[#111418] p-12 text-center">
              <UserRound
                size={22}
                className="mx-auto text-gray-600"
              />

              <h3 className="mt-4 text-lg font-bold">
                No videos yet
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                This creator hasn't published
                any videos yet.
              </p>

              <Link
                to="/"
                className="mt-5 inline-flex rounded-full bg-[#22C55E] px-5 py-2.5 text-xs font-bold text-black"
              >
                Explore videos
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          channelVideos.length > 0 && (
            <div className="mt-7 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {channelVideos.map(
                (video) => (
                  <VideoCard
                    key={video._id}
                    video={video}
                  />
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}