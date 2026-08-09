import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          {...video}
        />
      ))}
    </div>
  );
}