import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wallet,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  Settings,
  UserRound,
  LogOut,
  Command,
  Sparkles,
  ArrowUpRight,
  CircleDollarSign,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Welcome to ExpenseFlow",
    description: "Your personal finance dashboard is ready.",
    time: "Just now",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Track your spending",
    description: "Add your first transaction to get started.",
    time: "Today",
    icon: CircleDollarSign,
  },
];

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const closeMenus = () => {
    setNotificationsOpen(false);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    closeMenus();
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    setProfileOpen(false);
    setSearchOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setNotificationsOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b  border-white/[0.06] bg-[#080B12]/80 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-4 sm:px-7 lg:px-10">
        <div className="flex items-center gap-10">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[15px] bg-gradient-to-br from-violet-500 via-violet-600 to-blue-600 shadow-lg shadow-violet-600/20 transition duration-300 group-hover:scale-105 group-hover:shadow-violet-500/40">
              <Wallet size={22} strokeWidth={2.2} className="text-white" />
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-[2.5px] border-[#080B12] bg-emerald-400" />
            </div>

            <div>
              <h1 className="text-[19px] font-extrabold tracking-[-0.8px] text-white">
                Expense<span className="text-violet-400">Flow.</span>
              </h1>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[2.3px] text-slate-500">
                Personal Finance
              </p>
            </div>
          </motion.a>

          <div className="hidden h-8 w-px bg-white/[0.07] lg:block" />

          <div className="hidden items-center gap-2 lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
            <span className="text-xs font-medium text-slate-400">
              Your finances, simplified.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "min(260px, 42vw)" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex h-10 items-center gap-2 rounded-xl  bg-white/[0.04] px-3 ">
                  <Search size={16} className="shrink-0 text-violet-400" />
                  <input
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    className="w-full min-w-0 bg-transparent text-sm  text-white !outline-none placeholder:text-slate-500"
                    aria-label="Search transactions"
                  />
                  <button
                    onClick={() => {
                      setSearchValue("");
                      setSearchOpen(false);
                    }}
                    className="shrink-0 text-slate-500 transition hover:text-white"
                    aria-label="Close search"
                  >
                    <X size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleSearch}
            type="button"
            aria-label="Search"
            className={`hidden h-10 w-10 items-center justify-center rounded-xl border transition sm:flex ${
              searchOpen
                ? "border-violet-400/30 bg-violet-500/10 text-violet-300"
                : "border-white/[0.07] bg-white/[0.03] text-slate-400 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            }`}
          >
            <Search size={18} />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleNotifications}
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                notificationsOpen
                  ? "border-violet-400/30 bg-violet-500/10 text-violet-300"
                  : "border-white/[0.07] bg-white/[0.03] text-slate-400 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
              }`}
            >
              <Bell size={18} />
              <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-[#080B12] bg-violet-400" />
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-14 w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111622] shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Notifications
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Your latest updates
                      </p>
                    </div>
                    <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-semibold text-violet-300">
                      {notifications.length} New
                    </span>
                  </div>

                  <div className="p-2">
                    {notifications.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.id}
                          className="flex gap-3 rounded-xl p-3 transition hover:bg-white/[0.04]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                            <Icon size={17} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-white">
                                {item.title}
                              </p>
                              <span className="shrink-0 text-[10px] text-slate-500">
                                {item.time}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mx-1 hidden h-8 w-px bg-white/[0.08] sm:block" />

          <div className="relative hidden sm:block">
            <button
              onClick={toggleProfile}
              type="button"
              aria-expanded={profileOpen}
              className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-white/[0.06] hover:bg-white/[0.04]"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 text-sm font-bold text-violet-200 ring-1 ring-violet-400/20">
                A
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080B12] bg-emerald-400" />
              </div>

              <div className="hidden text-left xl:block">
                <p className="text-xs font-semibold text-white">My Account</p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Personal Wallet
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`text-slate-500 transition duration-200 group-hover:text-white ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-14 w-60 rounded-2xl border border-white/[0.08] bg-[#111622] p-2 shadow-2xl shadow-black/40"
                >
                  <div className="border-b border-white/[0.06] px-3 py-3">
                    <p className="text-sm font-semibold text-white">
                      My Account
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Personal Wallet
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <UserRound size={16} />
                    My Profile
                    <ArrowUpRight
                      size={13}
                      className="ml-auto text-slate-500"
                    />
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <Settings size={16} />
                    Settings
                    <ArrowUpRight
                      size={13}
                      className="ml-auto text-slate-500"
                    />
                  </button>

                  <div className="my-1 border-t border-white/[0.06]" />

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setSearchOpen(false);
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white sm:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden  border-t border-white/[0.06] bg-[#0D111B] sm:hidden"
          >
            <div className="space-y-3 px-5 py-5">
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 font-bold text-violet-200">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">My Account</p>
                  <p className="text-xs text-slate-500">Personal Wallet</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSearch}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Search size={18} />
                Search transactions
                <Command size={14} className="ml-auto text-slate-500" />
              </button>

              <button
                type="button"
                onClick={toggleNotifications}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Bell size={18} />
                Notifications
                <span className="ml-auto rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                  2
                </span>
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Settings size={18} />
                Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
export { Header };
