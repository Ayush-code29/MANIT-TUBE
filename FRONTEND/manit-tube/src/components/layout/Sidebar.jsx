import {
  Home,
  Compass,
  Flame,
  History,
  Bookmark,
  ListVideo,
  Code2,
  Brain,
  Database,
  BriefcaseBusiness,
  Users,
  GraduationCap,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const mainLinks = [
  {
    name: "Home",
    icon: Home,
    path: "/",
  },
  {
    name: "Explore",
    icon: Compass,
    path: "/search",
  },
  {
    name: "Trending",
    icon: Flame,
    path: "/trending",
  },
];

const libraryLinks = [
  {
    name: "History",
    icon: History,
    path: "/history",
  },
  {
    name: "Saved",
    icon: Bookmark,
    path: "/saved",
  },
  {
    name: "Playlists",
    icon: ListVideo,
    path: "/playlists",
  },
];

const learningLinks = [
  {
    name: "CSE",
    icon: Code2,
    path: "/category/cse",
  },
  {
    name: "AI & ML",
    icon: Brain,
    path: "/category/ai-ml",
  },
  {
    name: "DBMS",
    icon: Database,
    path: "/category/dbms",
  },
  {
    name: "Placements",
    icon: BriefcaseBusiness,
    path: "/category/placements",
  },
];

function SidebarSection({ title, links }) {
  return (
    <div className="mb-7">

      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#969791]">
        {title}
      </p>

      <div className="space-y-0.5">

        {links.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                  isActive
                    ? "bg-[#e8f2f7] text-[#075b8d] dark:bg-[#12303f] dark:text-[#64b5dc]"
                    : "text-[#60615c] hover:bg-[#ecece8] hover:text-[#171817] dark:text-[#aaaCA7] dark:hover:bg-[#1c1e1f] dark:hover:text-[#f0f0ed]"
                }`
              }
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {item.name}
            </NavLink>
          );
        })}

      </div>

    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-[68px] z-40 hidden w-[230px] overflow-y-auto border-r border-[#deded9] bg-[#f7f7f4] px-3 py-6 dark:border-[#292a2b] dark:bg-[#101112] lg:block">

      <SidebarSection
        title="Discover"
        links={mainLinks}
      />

      <SidebarSection
        title="Library"
        links={libraryLinks}
      />

      <SidebarSection
        title="Learn"
        links={learningLinks}
      />

      {/* Community */}

      <div className="border-t border-[#deded9] pt-5 dark:border-[#292a2b]">

        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#969791]">
          Community
        </p>

        <NavLink
          to="/creators"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#60615c] transition hover:bg-[#ecece8] hover:text-[#171817] dark:text-[#aaaCA7] dark:hover:bg-[#1c1e1f] dark:hover:text-[#f0f0ed]"
        >
          <Users size={18} />
          Creators
        </NavLink>

        <NavLink
          to="/campus"
          className="mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#60615c] transition hover:bg-[#ecece8] hover:text-[#171817] dark:text-[#aaaCA7] dark:hover:bg-[#1c1e1f] dark:hover:text-[#f0f0ed]"
        >
          <GraduationCap size={18} />
          Campus
        </NavLink>

      </div>

      {/* Footer */}

      <div className="mt-10 px-3">

        <p className="text-[11px] leading-5 text-[#969791]">
          MANIT Tube
          <br />
          Student Video Network
        </p>

        <p className="mt-2 text-[10px] text-[#aaaBA6]">
          © 2026 MANIT
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;