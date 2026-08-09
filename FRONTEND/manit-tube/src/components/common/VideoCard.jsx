import { MoreVertical } from "lucide-react";

export default function VideoCard({
  thumbnail,
  title,
  channel,
  avatar,
  views,
  uploadedAt,
  duration
}) {
  return (
    <article className="group cursor-pointer">

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#181C21]">

        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        {/* Duration */}
        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-[11px] font-semibold text-white">
          {duration}
        </span>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E] text-black shadow-xl">
            ▶
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex gap-3">

        <img
          src={avatar}
          alt={channel}
          className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-100 transition group-hover:text-white">
            {title}
          </h3>

          <p className="mt-1.5 text-xs text-gray-500">
            {channel}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {views} views • {uploadedAt}
          </p>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="h-fit rounded-full p-1 text-gray-600 opacity-0 transition hover:bg-[#181C21] hover:text-white group-hover:opacity-100"
        >
          <MoreVertical size={18} />
        </button>

      </div>
    </article>
  );
}