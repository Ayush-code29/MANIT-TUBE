import VideoCard from "./VideoCard";

const videos = [
  {
    id: 1,
    title: "Complete DSA Roadmap for Placements in 2026",
    channel: "MANIT Coding Club",
    views: "12K views",
    time: "2 days ago",
    duration: "18:42",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    avatar:
      "https://i.pravatar.cc/100?img=12",
  },

  {
    id: 2,
    title: "How to Build Your First React Project",
    channel: "Ayush Codes",
    views: "8.4K views",
    time: "5 days ago",
    duration: "24:15",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    avatar:
      "https://i.pravatar.cc/100?img=11",
  },

  {
    id: 3,
    title: "Introduction to Artificial Intelligence",
    channel: "MANIT AI Club",
    views: "15K views",
    time: "1 week ago",
    duration: "32:10",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    avatar:
      "https://i.pravatar.cc/100?img=13",
  },

  {
    id: 4,
    title: "MongoDB Explained for Beginners",
    channel: "Code MANIT",
    views: "6.2K views",
    time: "3 days ago",
    duration: "16:35",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    avatar:
      "https://i.pravatar.cc/100?img=14",
  },

  {
    id: 5,
    title: "Campus Placement Preparation Guide",
    channel: "MANIT Placements",
    views: "21K views",
    time: "2 weeks ago",
    duration: "41:22",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    avatar:
      "https://i.pravatar.cc/100?img=15",
  },

  {
    id: 6,
    title: "Build a Full Stack MERN Application",
    channel: "Web Dev Club",
    views: "18K views",
    time: "4 days ago",
    duration: "52:18",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    avatar:
      "https://i.pravatar.cc/100?img=16",
  },

  {
    id: 7,
    title: "DBMS Important Questions for Exams",
    channel: "MANIT Academics",
    views: "9.8K views",
    time: "1 week ago",
    duration: "27:45",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    avatar:
      "https://i.pravatar.cc/100?img=17",
  },

  {
    id: 8,
    title: "How I Built My First College Project",
    channel: "Student Developers",
    views: "5.1K views",
    time: "3 days ago",
    duration: "14:26",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    avatar:
      "https://i.pravatar.cc/100?img=18",
  },
];

function VideoGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          index={index}
        />
      ))}

    </div>
  );
}

export default VideoGrid;