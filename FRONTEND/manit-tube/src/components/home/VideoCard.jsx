import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

function VideoCard({ video, index }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
      }}
    >

      <Link
        to={`/watch/${video.id}`}
        className="group block"
      >

        {/* Thumbnail */}

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111418]">

          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />


          {/* Dark overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />


          {/* Play button */}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">

            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e] text-black shadow-2xl shadow-black/40"
            >

              <Play
                size={19}
                fill="currentColor"
                strokeWidth={0}
                className="ml-0.5"
              />

            </motion.div>

          </div>


          {/* Duration */}

          <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            {video.duration}
          </span>

        </div>


        {/* Information */}

        <div className="mt-3 flex gap-3">

          <img
            src={video.avatar}
            alt=""
            className="h-9 w-9 shrink-0 rounded-full border border-white/[0.08] object-cover"
          />


          <div className="min-w-0">

            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-100 transition-colors group-hover:text-[#4ade80]">
              {video.title}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-500">
              {video.channel}
            </p>

            <p className="mt-0.5 text-xs text-gray-600">
              {video.views} • {video.time}
            </p>

          </div>

        </div>

      </Link>

    </motion.div>
  );
}

export default VideoCard;