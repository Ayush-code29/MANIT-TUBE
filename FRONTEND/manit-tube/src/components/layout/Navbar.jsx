import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  Upload,
  Menu,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-[#deded9] bg-[#f7f7f4]/95 backdrop-blur-md dark:border-[#292a2b] dark:bg-[#101112]/95">

      <div className="flex h-full items-center justify-between px-4 lg:px-6">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <button className="flex h-10 w-10 items-center justify-center rounded-lg text-[#555650] transition hover:bg-[#e9e9e5] dark:text-[#b4b5b0] dark:hover:bg-[#1d1f20] lg:hidden">
            <Menu size={21} />
          </button>

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            {/* Brand symbol */}

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#075b8d] shadow-sm"
            >
              <Play
                size={18}
                fill="white"
                strokeWidth={0}
                className="ml-0.5 text-white"
              />
            </motion.div>

            {/* Wordmark */}

            <div className="leading-none">

              <div className="text-[18px] font-extrabold tracking-[-0.04em] text-[#171817] dark:text-[#f1f1ed]">
                MANIT<span className="text-[#075b8d] dark:text-[#4ca9d6]">Tube</span>
              </div>

              <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#777871]">
                Student Video Network
              </div>

            </div>

          </Link>

        </div>


        {/* SEARCH */}

        <div className="mx-8 hidden w-full max-w-[620px] md:block">

          <div className="flex h-11 items-center rounded-xl border border-[#d9d9d4] bg-white transition focus-within:border-[#075b8d] dark:border-[#303234] dark:bg-[#181a1b]">

            <Search
              size={18}
              className="ml-4 shrink-0 text-[#85867f]"
            />

            <input
              type="text"
              placeholder="Search videos, creators and topics"
              className="h-full w-full bg-transparent px-3 text-sm text-[#20211f] outline-none placeholder:text-[#979891] dark:text-[#f0f0ed]"
            />

            <span className="mr-2 hidden rounded-md bg-[#f1f1ed] px-2 py-1 text-[11px] text-[#85867f] lg:block dark:bg-[#232526]">
              /
            </span>

          </div>

        </div>


        {/* RIGHT */}

        <div className="flex items-center gap-1">

          <button className="rounded-lg p-2.5 text-[#686963] transition hover:bg-[#e9e9e5] dark:text-[#b4b5b0] dark:hover:bg-[#1d1f20] md:hidden">
            <Search size={19} />
          </button>

          <button className="hidden items-center gap-2 rounded-lg border border-[#d6d6d1] bg-white px-3.5 py-2 text-sm font-semibold text-[#343532] transition hover:border-[#075b8d] hover:text-[#075b8d] dark:border-[#363839] dark:bg-[#181a1b] dark:text-[#deded9] dark:hover:border-[#4ca9d6] dark:hover:text-[#4ca9d6] sm:flex">
            <Upload size={16} />
            Upload
          </button>

          <button className="relative rounded-lg p-2.5 text-[#686963] transition hover:bg-[#e9e9e5] dark:text-[#b4b5b0] dark:hover:bg-[#1d1f20]">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c9362b]" />
          </button>

          <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#075b8d] text-sm font-bold text-white">
            A
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;