import {
  Clock3,
  Compass,
  History,
  Home,
  ListVideo,
  Settings,
  ThumbsUp,
  Upload,
  Users,
  X
} from "lucide-react";

const mainLinks = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Subscriptions", icon: Users },
];

const libraryLinks = [
  { label: "History", icon: History },
  { label: "Playlists", icon: ListVideo },
  { label: "Liked Videos", icon: ThumbsUp },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 z-50 h-[calc(100vh-4rem)]
          w-64 border-r border-[#24282E]
          bg-[#090B0D]
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col overflow-y-auto px-3 py-5">

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="mb-4 ml-auto rounded-lg p-2 text-gray-500 hover:bg-[#181C21] hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>

          {/* Main */}
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
            Discover
          </p>

          <nav className="space-y-1">
            {mainLinks.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium transition
                  ${
                    label === "Home"
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "text-gray-400 hover:bg-[#181C21] hover:text-white"
                  }
                `}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>

          <div className="my-6 h-px bg-[#24282E]" />

          {/* Library */}
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
            Library
          </p>

          <nav className="space-y-1">
            {libraryLinks.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-[#181C21] hover:text-white"
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>

          <div className="my-6 h-px bg-[#24282E]" />

          {/* Creator */}
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
            Creator
          </p>

          <button className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-[#181C21] hover:text-white">
            <Upload size={19} />
            Upload Video
          </button>

          <button className="mt-1 flex w-full items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium text-gray-400 transition hover:bg-[#181C21] hover:text-white">
            <Settings size={19} />
            Settings
          </button>

          <div className="mt-auto pt-10">
            <p className="px-3 text-xs leading-5 text-gray-600">
              MANIT Tube
              <br />
              Built for creators.
            </p>
          </div>

        </div>
      </aside>
    </>
  );
}