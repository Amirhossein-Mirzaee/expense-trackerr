import React, { useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  ReceiptText,
  Sparkles,
  Wallet,
  Search,
  ArrowUpDown,
  ArrowUpRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TranactionList = () => {
  const { transactions } = useContext(GlobalContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filter === "income") {
      result = result.filter((transaction) => Number(transaction.amount) > 0);
    } else if (filter === "expense") {
      result = result.filter((transaction) => Number(transaction.amount) < 0);
    }

    if (search.trim()) {
      result = result.filter((transaction) =>
        String(transaction.text || "")
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      );
    }

    if (sort === "newest") {
      result.reverse();
    } else if (sort === "highest") {
      result.sort(
        (a, b) => Math.abs(Number(b.amount)) - Math.abs(Number(a.amount)),
      );
    } else if (sort === "lowest") {
      result.sort(
        (a, b) => Math.abs(Number(a.amount)) - Math.abs(Number(b.amount)),
      );
    }

    return result;
  }, [transactions, filter, search, sort]);

  const filters = [
    { id: "all", label: "All", count: transactions.length },
    {
      id: "income",
      label: "Income",
      count: transactions.filter((t) => Number(t.amount) > 0).length,
    },
    {
      id: "expense",
      label: "Expenses",
      count: transactions.filter((t) => Number(t.amount) < 0).length,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.07] bg-gradient-to-br from-[#151B29] to-[#101520] p-5 shadow-xl shadow-black/10 sm:p-7"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-[80px]" />

      <div className="relative z-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/10 text-violet-300">
              <History size={21} />
            </div>

            <div>
              <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                Transaction History
              </h3>
              <p className="mt-1 text-[11px] text-slate-500">
                Keep track of your financial activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
            <ReceiptText size={14} className="text-violet-400" />
            <span className="text-xs font-semibold text-slate-300">
              {filteredTransactions.length}
            </span>
            <span className="text-[10px] text-slate-500">
              / {transactions.length} Records
            </span>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-white/[0.07] bg-[#0D121D] py-3 pl-11 pr-10 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-400"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0D121D] py-3 pl-9 pr-8 text-xs font-medium text-slate-300 outline-none transition focus:border-violet-400/40 sm:w-auto"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest amount</option>
              <option value="lowest">Lowest amount</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={14} className="mr-1 text-slate-500" />

          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-semibold transition-all duration-200 ${
                filter === item.id
                  ? "border-violet-400/30 bg-violet-500/15 text-violet-300 shadow-lg shadow-violet-950/10"
                  : "border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[9px] ${
                  filter === item.id
                    ? "bg-violet-400/15 text-violet-200"
                    : "bg-white/[0.05] text-slate-500"
                }`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-violet-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-slate-400">
              Recent Activity
            </span>
          </div>

          {filteredTransactions.length > 0 && (
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {filteredTransactions.length} results
            </span>
          )}
        </div>

        {filteredTransactions.length > 0 ? (
          <ul id="list" className="list !flex !flex-col !gap-3">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.97 }}
                  transition={{
                    duration: 0.25,
                    delay: index < 5 ? index * 0.04 : 0,
                  }}
                  className="!m-0"
                >
                  <Transaction transaction={transaction} />
                </motion.div>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] px-5 py-10 text-center"
          >
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] border border-violet-400/15 bg-violet-500/[0.08] text-violet-300">
              {transactions.length === 0 ? (
                <Wallet size={28} strokeWidth={1.6} />
              ) : (
                <Search size={26} strokeWidth={1.6} />
              )}

              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#151B29] bg-violet-500 text-white">
                <ArrowUpRight size={12} />
              </div>
            </div>

            <h4 className="mb-2 text-sm font-bold text-white">
              {transactions.length === 0
                ? "No transactions yet"
                : "No matching transactions"}
            </h4>

            <p className="max-w-[260px] text-xs leading-relaxed text-slate-500">
              {transactions.length === 0
                ? "Your financial activity will appear here once you add your first income or expense."
                : "Try changing your search or selecting a different filter."}
            </p>

            {transactions.length === 0 ? (
              <div className="mt-5 flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/[0.06] px-3 py-2 text-[10px] font-medium text-violet-300">
                <Sparkles size={12} />
                Start tracking your money
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="mt-5 rounded-lg border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-[11px] font-semibold text-violet-300 transition hover:bg-violet-500/20"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
