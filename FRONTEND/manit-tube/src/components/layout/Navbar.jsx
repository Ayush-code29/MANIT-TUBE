import {
  Bell,
  Menu,
  Plus,
  Search,
  UserCircle
} from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#24282E] bg-[#090B0D]/95 backdrop-blur-md">
      <div className="flex h-full items-center gap-4 px-4 md:px-6">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-[#181C21] hover:text-white lg:hidden"
        >
          <Menu size={21} />
        </button>

        {/* Logo */}
        <div className="flex min-w-fit items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22C55E]">
            <span className="text-lg font-black text-[#07100A]">
              M
            </span>
          </div>

          <span className="hidden text-lg font-bold tracking-tight sm:block">
            MANIT<span className="text-[#22C55E]">Tube</span>
          </span>
        </div>

        {/* Search */}
        <div className="mx-auto hidden w-full max-w-2xl md:block">
          <div className="flex h-10 items-center overflow-hidden rounded-full border border-[#2A3037] bg-[#111418] transition focus-within:border-[#22C55E]/60">
            <Search
              size={19}
              className="ml-4 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search videos, creators..."
              className="h-full flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button className="mr-1 flex h-8 w-10 items-center justify-center rounded-full bg-[#181C21] text-gray-400 hover:text-white">
              <Search size={17} />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">

          <button className="hidden items-center gap-2 rounded-full border border-[#2A3037] bg-[#111418] px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-[#3A424C] hover:bg-[#181C21] sm:flex">
            <Plus size={17} />
            Create
          </button>

          <button className="rounded-full p-2.5 text-gray-400 transition hover:bg-[#181C21] hover:text-white">
            <Bell size={20} />
          </button>

          <button className="rounded-full p-1 transition hover:bg-[#181C21]">
            <UserCircle size={31} className="text-gray-400" />
          </button>

        </div>
      </div>
    </header>
  );
}