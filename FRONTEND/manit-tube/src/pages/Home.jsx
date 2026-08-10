import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Flame,
  Play,
  Users,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const featured = {
  title: "Getting Started with Competitive Programming",
  description:
    "A practical introduction to competitive programming, problem solving and the right approach for placement preparation.",
  creator: "MANIT Coding Club",
  duration: "28:42",
  views: "8.4K views",
  thumbnail:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
};

const continueWatching = [
  {
    id: 1,
    title: "Complete DSA Roadmap for Placements",
    creator: "MANIT Coding Club",
    progress: 68,
    duration: "32:15",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    id: 2,
    title: "React Project Architecture Explained",
    creator: "Web Dev Club",
    progress: 42,
    duration: "24:18",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    creator: "AI Club MANIT",
    progress: 31,
    duration: "41:05",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];

const trending = [
  {
    id: 4,
    title: "How to Prepare for Product-Based Companies",
    creator: "MANIT Placement Cell",
    category: "Placements",
    views: "18K",
    time: "2 days ago",
    duration: "21:34",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    id: 5,
    title: "Build a Full Stack MERN Application",
    creator: "Web Dev Club",
    category: "Web Development",
    views: "12K",
    time: "4 days ago",
    duration: "46:20",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 6,
    title: "DBMS Most Important Concepts",
    creator: "MANIT Academics",
    category: "DBMS",
    views: "9.7K",
    time: "1 week ago",
    duration: "34:12",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
  {
    id: 7,
    title: "Life Inside MANIT: Campus Tour",
    creator: "MANIT Media",
    category: "Campus",
    views: "24K",
    time: "3 days ago",
    duration: "12:48",
    thumbnail:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d",
  },
];

const creators = [
  {
    name: "MANIT Coding Club",
    role: "Coding & DSA",
    videos: "42 videos",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "AI Club MANIT",
    role: "AI & Machine Learning",
    videos: "36 videos",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Web Dev Club",
    role: "Web Development",
    videos: "28 videos",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "MANIT Media",
    role: "Campus & Events",
    videos: "51 videos",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

function SectionHeading({ icon: Icon, title, description, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              size={18}
              className="text-[#075b8d]"
            />
          )}

          <h2 className="text-xl font-bold tracking-tight">
            {title}
          </h2>
        </div>

        {description && (
          <p className="mt-1 text-sm text-[#777871] dark:text-[#969791]">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          to={action.href}
          className="hidden items-center gap-1 text-sm font-semibold text-[#075b8d] hover:underline sm:flex dark:text-[#58a9d2]"
        >
          {action.label}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

function FeaturedVideo() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-[#deded9] bg-white dark:border-[#292a2b] dark:bg-[#181a1b]"
    >
      <div className="grid lg:grid-cols-[1.55fr_1fr]">

        {/* Thumbnail */}

        <Link
          to="/watch/featured"
          className="group relative block aspect-video overflow-hidden bg-[#161819] lg:aspect-auto"
        >
          <img
            src={featured.thumbnail}
            alt={featured.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-md bg-black/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <Play size={13} fill="white" />
            {featured.duration}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#075b8d] shadow-xl">
              <Play
                size={21}
                fill="currentColor"
                className="ml-0.5"
              />
            </div>
          </div>
        </Link>

        {/* Information */}

        <div className="flex flex-col justify-center p-6 sm:p-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#075b8d]">
            Featured this week
          </p>

          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {featured.title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#70716c] dark:text-[#a1a29d]">
            {featured.description}
          </p>

          <div className="mt-6 flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f1f6] text-xs font-bold text-[#075b8d] dark:bg-[#173442] dark:text-[#62afd6]">
              MC
            </div>

            <div>
              <p className="text-sm font-semibold">
                {featured.creator}
              </p>

              <p className="text-xs text-[#85867f]">
                {featured.views} · {featured.duration}
              </p>
            </div>

          </div>

          <Link
            to="/watch/featured"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-[#075b8d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#064d77]"
          >
            <Play size={15} fill="currentColor" />
            Watch now
          </Link>

        </div>
      </div>
    </motion.section>
  );
}

function ContinueCard({ video, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        to={`/watch/${video.id}`}
        className="group block"
      >

        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#ddd]">
          <img
            src={video.thumbnail}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          />

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-[#c9362b]"
              style={{ width: `${video.progress}%` }}
            />
          </div>

          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-1 text-[10px] font-semibold text-white">
            {video.duration}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5 group-hover:text-[#075b8d] dark:group-hover:text-[#58a9d2]">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-[#85867f]">
          {video.creator}
        </p>

      </Link>
    </motion.div>
  );
}

function TrendingCard({ video, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        to={`/watch/${video.id}`}
        className="group block"
      >

        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#ddd]">
          <img
            src={video.thumbnail}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          />

          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-1 text-[10px] font-semibold text-white">
            {video.duration}
          </span>
        </div>

        <div className="mt-3">

          <p className="text-[10px] font-bold uppercase tracking-wider text-[#075b8d]">
            {video.category}
          </p>

          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 group-hover:text-[#075b8d] dark:group-hover:text-[#58a9d2]">
            {video.title}
          </h3>

          <p className="mt-1 text-xs text-[#85867f]">
            {video.creator}
          </p>

          <p className="text-xs text-[#999a94]">
            {video.views} views · {video.time}
          </p>

        </div>

      </Link>
    </motion.div>
  );
}

function CreatorCard({ creator }) {
  return (
    <Link
      to="/creators"
      className="group flex items-center gap-4 rounded-xl border border-[#deded9] bg-white p-4 transition hover:border-[#c8c8c2] hover:shadow-sm dark:border-[#292a2b] dark:bg-[#181a1b] dark:hover:border-[#3a3c3d]"
    >

      <img
        src={creator.avatar}
        alt=""
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold group-hover:text-[#075b8d] dark:group-hover:text-[#58a9d2]">
          {creator.name}
        </h3>

        <p className="mt-0.5 text-xs text-[#85867f]">
          {creator.role}
        </p>

        <p className="mt-1 text-[11px] text-[#a0a19b]">
          {creator.videos}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="text-[#aaa]"
      />

    </Link>
  );
}

function Home() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-12 pb-16">

      {/* Intro */}

      <section>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#075b8d]">
          MANIT Tube
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          What do you want to learn today?
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777871] dark:text-[#969791]">
          Discover lectures, projects, coding resources and
          experiences shared by the MANIT community.
        </p>
      </section>

      {/* Featured */}

      <FeaturedVideo />

      {/* Continue */}

      <section>

        <SectionHeading
          icon={Clock3}
          title="Continue watching"
          description="Pick up where you left off"
          action={{
            label: "View history",
            href: "/history",
          }}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {continueWatching.map((video, index) => (
            <ContinueCard
              key={video.id}
              video={video}
              index={index}
            />
          ))}
        </div>

      </section>

      {/* Trending */}

      <section>

        <SectionHeading
          icon={Flame}
          title="Trending this week"
          description="Popular among MANIT students"
          action={{
            label: "See all",
            href: "/trending",
          }}
        />

        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((video, index) => (
            <TrendingCard
              key={video.id}
              video={video}
              index={index}
            />
          ))}
        </div>

      </section>

      {/* Creators */}

      <section>

        <SectionHeading
          icon={Users}
          title="Popular creators"
          description="People and clubs worth following"
          action={{
            label: "Explore creators",
            href: "/creators",
          }}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.name}
              creator={creator}
            />
          ))}
        </div>

      </section>

    </div>
  );
}

export default Home;