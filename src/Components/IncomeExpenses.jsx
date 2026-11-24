import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  TrendingDown,
  TrendingUp,
  Wallet,
  PiggyBank,
  Sparkles,
} from "lucide-react";

import { GlobalContext } from "../context/GlobalState";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const { income, expense, incomeCount, expenseCount } = useMemo(() => {
    return transactions.reduce(
      (totals, transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (amount > 0) {
          totals.income += amount;
          totals.incomeCount += 1;
        } else if (amount < 0) {
          totals.expense += Math.abs(amount);
          totals.expenseCount += 1;
        }

        return totals;
      },
      {
        income: 0,
        expense: 0,
        incomeCount: 0,
        expenseCount: 0,
      },
    );
  }, [transactions]);

  const totalFlow = income + expense;
  const netCashFlow = income - expense;

  const incomePercentage = totalFlow > 0 ? (income / totalFlow) * 100 : 0;

  const expensePercentage = totalFlow > 0 ? (expense / totalFlow) * 100 : 0;

  const cashFlowStatus =
    netCashFlow > 0
      ? "Positive cash flow"
      : netCashFlow < 0
        ? "Negative cash flow"
        : "Balanced cash flow";

  const cards = [
    {
      title: "Total Income",
      amount: income,
      count: incomeCount,
      icon: TrendingUp,
      arrow: ArrowUpRight,
      color: "emerald",
      description: "Money coming in",
    },
    {
      title: "Total Expenses",
      amount: expense,
      count: expenseCount,
      icon: TrendingDown,
      arrow: ArrowDownRight,
      color: "rose",
      description: "Money going out",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const Arrow = card.arrow;

        const isIncome = card.color === "emerald";

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden rounded-3xl border p-6 shadow-2xl transition-colors duration-300 ${
              isIncome
                ? "border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.12] via-slate-900 to-slate-950 shadow-emerald-950/20"
                : "border-rose-400/15 bg-gradient-to-br from-rose-500/[0.12] via-slate-900 to-slate-950 shadow-rose-950/20"
            }`}
          >
            <div
              className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl ${
                isIncome ? "bg-emerald-400/10" : "bg-rose-400/10"
              }`}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    isIncome
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      : "border-rose-400/20 bg-rose-400/10 text-rose-400"
                  }`}
                >
                  <Icon size={23} />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    isIncome
                      ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400"
                      : "border-rose-400/20 bg-rose-400/[0.07] text-rose-400"
                  }`}
                >
                  <Arrow size={14} />
                  {isIncome ? "Income" : "Expense"}
                </div>
              </div>

              <div className="mt-7">
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <motion.h3
                  key={card.amount}
                  initial={{ opacity: 0.5, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 break-words text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  <span className="mr-1 text-xl text-slate-500">$</span>
                  {formatCurrency(card.amount)}
                </motion.h3>

                <p className="mt-2 text-xs text-slate-500">
                  {card.description}
                </p>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Activity size={15} />
                  <span>Transactions</span>
                </div>

                <span
                  className={`rounded-lg px-3 py-1.5 text-sm font-bold ${
                    isIncome
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-rose-400/10 text-rose-400"
                  }`}
                >
                  {card.count}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.10] via-slate-900 to-slate-950 p-6 shadow-2xl shadow-violet-950/20 lg:col-span-2"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet-500/[0.08] blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-400">
                  <Wallet size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-white">Cash Flow Overview</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Your income and expense distribution
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-semibold text-violet-300">
              <Sparkles size={13} />
              Financial Overview
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-400">
                Money distribution
              </span>
              <span className="font-semibold text-slate-300">
                ${formatCurrency(totalFlow)}
              </span>
            </div>

            <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${incomePercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 to-emerald-300"
              />

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${expensePercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="h-full rounded-r-full bg-gradient-to-r from-rose-400 to-rose-500"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Income share
                </div>

                <p className="mt-2 text-2xl font-bold text-white">
                  {incomePercentage.toFixed(1)}%
                </p>
              </div>

              <div className="rounded-2xl border border-rose-400/10 bg-rose-400/[0.04] p-4">
                <div className="flex items-center gap-2 text-xs text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Expense share
                </div>

                <p className="mt-2 text-2xl font-bold text-white">
                  {expensePercentage.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Net Cash Flow
                </p>

                <p
                  className={`mt-1 break-words text-2xl font-extrabold ${
                    netCashFlow > 0
                      ? "text-emerald-400"
                      : netCashFlow < 0
                        ? "text-rose-400"
                        : "text-slate-300"
                  }`}
                >
                  {netCashFlow < 0 ? "-$" : "$"}
                  {formatCurrency(Math.abs(netCashFlow))}
                </p>
              </div>

              <div
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
                  netCashFlow > 0
                    ? "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-400"
                    : netCashFlow < 0
                      ? "border-rose-400/15 bg-rose-400/[0.06] text-rose-400"
                      : "border-slate-400/15 bg-slate-400/[0.06] text-slate-300"
                }`}
              >
                {netCashFlow > 0 ? (
                  <TrendingUp size={16} />
                ) : netCashFlow < 0 ? (
                  <TrendingDown size={16} />
                ) : (
                  <PiggyBank size={16} />
                )}

                <span className="text-xs font-bold">{cashFlowStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default IncomeExpenses;
