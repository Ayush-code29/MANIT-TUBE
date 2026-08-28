import { useState } from "react";

import {
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  Code2,
  Compass,
  Database,
  Flame,
  History,
  Home as HomeIcon,
  ListVideo,
  LogIn,
  LogOut,
  Menu,
  Play,
  Search,
  Users,
  X,
  BrainCircuit,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const navigationGroups = [
  {
    title: "DISCOVER",
    items: [
      {
        label: "Home",
        href: "/",
        icon: HomeIcon,
      },
      {
        label: "Explore",
        href: "/search",
        icon: Compass,
      },
      {
        label: "Trending",
        href: "/trending",
        icon: Flame,
      },
    ],
  },
  {
    title: "LIBRARY",
    items: [
      {
        label: "History",
        href: "/history",
        icon: History,
      },
      {
        label: "Saved",
        href: "/saved",
        icon: Bookmark,
      },
      {
        label: "Playlists",
        href: "/playlists",
        icon: ListVideo,
      },
    ],
  },
  {
    title: "LEARN",
    items: [
      {
        label: "CSE",
        href: "/search?category=cse",
        icon: Code2,
      },
      {
        label: "AI & ML",
        href: "/search?category=ai-ml",
        icon: BrainCircuit,
      },
      {
        label: "DBMS",
        href: "/search?category=dbms",
        icon: Database,
      },
      {
        label: "Placements",
        href: "/search?category=placements",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      {
        label: "Creators",
        href: "/creators",
        icon: Users,
      },
    ],
  },
];

function Logo() {
  return (
    <NavLink
      to="/"
      className="flex shrink-0 items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#075b8d] shadow-lg shadow-[#075b8d]/20">
        <Play
          size={21}
          fill="white"
          className="ml-0.5 text-white"
        />
      </div>

      <div className="hidden sm:block">
        <div className="text-[21px] font-black leading-none tracking-tight">
          MANIT
          <span className="text-[#39a9df]">
            Tube
          </span>
        </div>

        <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#656762]">
          Student Video Network
        </div>
      </div>
    </NavLink>
  );
}

function SidebarLink({
  item,
  onNavigate,
}) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-[#12384b] text-[#55bdf4]"
            : "text-[#b1b2ad] hover:bg-[#181c20] hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={
              isActive
                ? "text-[#55bdf4]"
                : "text-[#8b8d87] group-hover:text-white"
            }
          />

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

function Sidebar({
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-[76px] z-50 h-[calc(100vh-76px)] w-[265px] overflow-y-auto border-r border-[#25282b] bg-[#101112] px-3 py-6 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="mb-3 flex items-center justify-between px-3 lg:hidden">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#777871]">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#85867f] hover:bg-[#181c20] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-7">
          {navigationGroups.map(
            (group) => (
              <div key={group.title}>
                <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.18em] text-[#777871]">
                  {group.title}
                </p>

                <div className="space-y-1">
                  {group.items.map(
                    (item) => (
                      <SidebarLink
                        key={item.label}
                        item={item}
                        onNavigate={onClose}
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </nav>
      </aside>
    </>
  );
}

function UserMenu({
  user,
  onLogout,
  onLogin,
}) {
  const [open, setOpen] =
    useState(false);

  const navigate = useNavigate();

  const displayName =
    user?.fullName ||
    user?.username ||
    "MANIT Student";

  const username =
    user?.username || "";

  const avatar =
    user?.avatar ||
    "https://i.pravatar.cc/100?img=12";

  const initials =
    displayName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  const handleLogout = async () => {
    setOpen(false);

    await onLogout();

    navigate("/");
  };

  if (!user) {
    return (
      <button
        type="button"
        onClick={onLogin}
        className="flex items-center gap-2 rounded-xl border border-[#2c3034] bg-[#17191b] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#075b8d] hover:bg-[#1b2024]"
      >
        <LogIn size={17} />

        <span>Login</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-[#1a1d20]"
      >
        {user?.avatar ? (
          <img
            src={avatar}
            alt={displayName}
            className="h-10 w-10 rounded-full border border-[#2b3035] object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#075b8d] text-sm font-bold text-white">
            {initials}
          </div>
        )}

        <ChevronDown
          size={15}
          className={`hidden text-[#85867f] transition sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-[#2a2e32] bg-[#151719] shadow-2xl shadow-black/50">
            <div className="border-b border-[#282b2e] p-4">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={avatar}
                    alt={displayName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#075b8d] text-sm font-bold text-white">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {displayName}
                  </p>

                  {username && (
                    <p className="truncate text-xs text-[#777871]">
                      @{username}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/saved");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#b7b8b3] transition hover:bg-[#1d2023] hover:text-white"
              >
                <Bookmark size={17} />
                Saved videos
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/history");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#b7b8b3] transition hover:bg-[#1d2023] hover:text-white"
              >
                <Clock3 size={17} />
                Watch history
              </button>

              <div className="my-2 h-px bg-[#282b2e]" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    loading: authLoading,
    logout,
  } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  const handleLogin = () => {
    navigate(
      `/login?redirect=${encodeURIComponent(
        location.pathname + location.search
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-[#101112] text-white">
      {/* =========================
          TOP HEADER
      ========================== */}

      <header className="fixed left-0 right-0 top-0 z-[60] h-[76px] border-b border-[#25282b] bg-[#101112]/95 backdrop-blur-xl">
        <div className="flex h-full items-center gap-4 px-4 sm:px-7">
          {/* Mobile menu */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(true)
            }
            className="rounded-lg p-2 text-[#a1a29d] hover:bg-[#181c20] hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}

          <Logo />

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="mx-auto hidden w-full max-w-[715px] md:block"
          >
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#777871]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search videos, creators and topics"
                className="h-12 w-full rounded-xl border border-[#2b2f33] bg-[#17191b] pl-14 pr-14 text-sm text-white outline-none transition placeholder:text-[#777871] focus:border-[#075b8d] focus:bg-[#191c1f]"
              />

              <span className="absolute right-3 top-1/2 flex h-7 -translate-y-1/2 items-center justify-center rounded-md bg-[#222528] px-2 text-xs font-bold text-[#777871]">
                /
              </span>
            </div>
          </form>

          {/* Right actions */}

          <div className="ml-auto flex items-center gap-2">
            {/* Notification icon removed */}

            {!authLoading && (
              <UserMenu
                user={user}
                onLogout={logout}
                onLogin={handleLogin}
              />
            )}
          </div>
        </div>

        {/* Mobile search */}

        <form
          onSubmit={handleSearch}
          className="border-t border-[#25282b] bg-[#101112] px-4 py-3 md:hidden"
        >
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777871]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search videos, creators and topics"
              className="h-11 w-full rounded-xl border border-[#2b2f33] bg-[#17191b] pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#777871] focus:border-[#075b8d]"
            />
          </div>
        </form>
      </header>

      {/* =========================
          SIDEBAR
      ========================== */}

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="min-h-screen pt-[76px] md:pt-[76px] lg:ml-[265px]">
        <div className="px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
          <Outlet />
        </div>
      </main>
    </div>
  );
}