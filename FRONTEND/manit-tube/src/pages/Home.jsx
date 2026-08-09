import { Flame, Sparkles, TrendingUp } from "lucide-react";
import VideoGrid from "../components/common/VideoGrid";

const videos = [
  {
    id: 1,
    title: "Building My First Production-Level MERN Project",
    channel: "Ayush Codes",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    avatar: "https://i.pravatar.cc/100?img=12",
    views: "12K",
    uploadedAt: "2 days ago",
    duration: "12:42",
  },
  {
    id: 2,
    title: "Complete React Architecture for Large Projects",
    channel: "CodeWithDev",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900",
    avatar: "https://i.pravatar.cc/100?img=11",
    views: "28K",
    uploadedAt: "5 days ago",
    duration: "18:21",
  },
  {
    id: 3,
    title: "MongoDB Aggregation Pipeline Explained",
    channel: "Backend Labs",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900",
    avatar: "https://i.pravatar.cc/100?img=13",
    views: "9.4K",
    uploadedAt: "1 week ago",
    duration: "24:08",
  },
  {
    id: 4,
    title: "How I Designed a Scalable Node.js Backend",
    channel: "Dev Architecture",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
    avatar: "https://i.pravatar.cc/100?img=14",
    views: "17K",
    uploadedAt: "3 days ago",
    duration: "15:33",
  },
  {
    id: 5,
    title: "DSA Patterns Every CSE Student Should Know",
    channel: "Algo Room",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
    avatar: "https://i.pravatar.cc/100?img=15",
    views: "41K",
    uploadedAt: "2 weeks ago",
    duration: "31:17",
  },
  {
    id: 6,
    title: "From College Project to Production Application",
    channel: "Build In Public",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    avatar: "https://i.pravatar.cc/100?img=16",
    views: "7.8K",
    uploadedAt: "4 days ago",
    duration: "11:46",
  },
  {
    id: 7,
    title: "REST API Design: Beginner to Production",
    channel: "Backend Labs",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900",
    avatar: "https://i.pravatar.cc/100?img=17",
    views: "19K",
    uploadedAt: "6 days ago",
    duration: "20:14",
  },
  {
    id: 8,
    title: "How Authentication Actually Works",
    channel: "Security First",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900",
    avatar: "https://i.pravatar.cc/100?img=18",
    views: "32K",
    uploadedAt: "1 week ago",
    duration: "17:51",
  },
];

const filters = [
  "All",
  "Trending",
  "Coding",
  "College",
  "Technology",
  "AI & ML",
  "Music",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1800px]">

      {/* Hero */}
      <section className="mb-8 overflow-hidden rounded-3xl border border-[#24282E] bg-gradient-to-br from-[#111814] via-[#0D1110] to-[#090B0D] p-6 sm:p-8 lg:p-10">

        <div className="max-w-2xl">

          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#22C55E]">
            <Sparkles size={17} />
            Welcome to MANIT Tube
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Discover ideas.
            <br />
            <span className="text-[#22C55E]">
              Share what you build.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            A modern video platform built for creators, students,
            developers and communities.
          </p>

          <button className="mt-6 rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-semibold text-[#07100A] transition hover:bg-[#2DD468] hover:shadow-lg hover:shadow-[#22C55E]/10">
            Start Exploring
          </button>

        </div>
      </section>

      {/* Filter */}
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition
              ${
                index === 0
                  ? "bg-[#22C55E] text-[#07100A]"
                  : "bg-[#111418] text-gray-400 hover:bg-[#181C21] hover:text-white"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Section */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <TrendingUp
            size={20}
            className="text-[#22C55E]"
          />

          <h2 className="text-xl font-bold">
            Recommended for you
          </h2>
        </div>

        <button className="text-sm font-medium text-gray-500 hover:text-white">
          View all
        </button>

      </div>

      <VideoGrid videos={videos} />

    </div>
  );
}