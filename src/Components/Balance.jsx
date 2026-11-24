import React, { useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Sparkles,
  Activity,
} from "lucide-react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const [showBalance, setShowBalance] = useState(true);

  const { total, income, expenses } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount || 0);

        acc.total += amount;

        if (amount > 0) {
          acc.income += amount;
        } else {
          acc.expenses += Math.abs(amount);
        }

        return acc;
      },
      { total: 0, income: 0, expenses: 0 },
    );
  }, [transactions]);

  const formatAmount = (value) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const formattedTotal = formatAmount(total);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative isolate mb-8 overflow-hidden rounded-[28px] border border-violet-400/20 bg-gradient-to-br from-[#211746] via-[#17142F] to-[#101827] p-6 shadow-2xl shadow-violet-950/20 sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-violet-500/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute right-0 top-0 -z-10 opacity-[0.06]">
        <Wallet size={280} strokeWidth={0.7} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-violet-200 backdrop-blur-xl">
                <Wallet size={22} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-violet-200/70">
                  Financial Overview
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] font-medium text-slate-400">
                    Your wallet is up to date
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3 flex items-center gap-3">
              <p className="text-sm font-medium text-slate-300">
                Total Available Balance
              </p>

              <button
                type="button"
                onClick={() => setShowBalance((prev) => !prev)}
                aria-label={showBalance ? "Hide balance" : "Show balance"}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            <div className="flex min-h-[65px] flex-wrap items-baseline gap-2">
              <span className="text-2xl font-semibold text-violet-200/70 sm:text-3xl">
                $
              </span>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={`${formattedTotal}-${showBalance}`}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.3 }}
                  id="balance"
                  className="break-all text-4xl font-extrabold tracking-[-2px] text-white sm:text-5xl lg:text-6xl"
                >
                  {showBalance ? formattedTotal : "••••••"}
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5">
              <Sparkles size={13} className="text-emerald-400" />
              <span className="text-[10px] font-semibold tracking-wide text-emerald-300">
                Stay on top of your finances
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 backdrop-blur-xl lg:min-w-[220px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
              <Activity size={22} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-slate-400">
                Total Transactions
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {transactions.length}
              </p>
            </div>

            <ArrowUpRight size={20} className="ml-auto text-violet-300" />
          </div>
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <TrendingUp size={19} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total Income
                </p>
                <p className="mt-1 text-lg font-bold text-emerald-300">
                  {showBalance ? `$${formatAmount(income)}` : "••••••"}
                </p>
              </div>
            </div>

            <ArrowUpRight size={18} className="text-emerald-400/70" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-rose-400/10 bg-rose-400/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/10 text-rose-400">
                <TrendingUp size={19} className="rotate-180" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total Expenses
                </p>
                <p className="mt-1 text-lg font-bold text-rose-300">
                  {showBalance ? `$${formatAmount(expenses)}` : "••••••"}
                </p>
              </div>
            </div>

            <ArrowDownRight size={18} className="text-rose-400/70" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
    </motion.section>
  );
};
