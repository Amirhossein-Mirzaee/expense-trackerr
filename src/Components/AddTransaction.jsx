import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
  Wallet,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { addTransaction } = useContext(GlobalContext);

  const isIncome = Number(amount) > 0;
  const isExpense = Number(amount) < 0;

  const onsubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    const numericAmount = Number(amount);

    if (!trimmedText) {
      setError("Please enter a transaction description.");
      setSuccess(false);
      return;
    }

    if (!amount || !Number.isFinite(numericAmount) || numericAmount === 0) {
      setError("Please enter a valid amount other than zero.");
      setSuccess(false);
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: trimmedText,
      amount: numericAmount,
    };

    addTransaction(newTransaction);

    setText("");
    setAmount("");
    setError("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.07] bg-gradient-to-br from-[#171E2C] to-[#101520] p-5 shadow-xl shadow-black/10 sm:p-7"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-violet-500/[0.07] blur-[80px]" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/10 text-violet-300">
            <Plus size={22} />
          </div>

          <div>
            <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Add New Transaction
            </h3>
            <p className="mt-1 text-[11px] text-slate-500">
              Record your income or expenses
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div
            className={`rounded-xl border p-3 transition-all duration-300 ${
              isIncome
                ? "border-emerald-400/30 bg-emerald-400/[0.08]"
                : "border-white/[0.06] bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                <ArrowDownLeft size={17} />
              </div>
              <span
                className={`text-xs font-semibold ${
                  isIncome ? "text-emerald-300" : "text-slate-400"
                }`}
              >
                Income
              </span>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              Positive amount (+)
            </p>
          </div>

          <div
            className={`rounded-xl border p-3 transition-all duration-300 ${
              isExpense
                ? "border-rose-400/30 bg-rose-400/[0.08]"
                : "border-white/[0.06] bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-400/10 text-rose-400">
                <ArrowUpRight size={17} />
              </div>
              <span
                className={`text-xs font-semibold ${
                  isExpense ? "text-rose-300" : "text-slate-400"
                }`}
              >
                Expense
              </span>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              Negative amount (-)
            </p>
          </div>
        </div>

        <form id="form" onSubmit={onsubmit} className="space-y-5">
          <div>
            <label
              htmlFor="text"
              className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300"
            >
              <ReceiptText size={14} className="text-violet-400" />
              Transaction Description
            </label>

            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder="e.g. Salary, Shopping, Groceries..."
              maxLength={60}
              autoComplete="off"
              className="w-full rounded-xl border border-white/[0.07] bg-[#0D121D] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/10"
            />

            <p className="mt-2 text-right text-[10px] text-slate-600">
              {text.length}/60 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300"
            >
              <Wallet size={14} className="text-violet-400" />
              Transaction Amount
            </label>

            <div className="relative">
              <span
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold ${
                  isIncome
                    ? "text-emerald-400"
                    : isExpense
                      ? "text-rose-400"
                      : "text-slate-500"
                }`}
              >
                $
              </span>

              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                step="0.01"
                inputMode="decimal"
                className="w-full rounded-xl border border-white/[0.07] placeholder:pl-5 bg-[#0D121D] py-4 !pl-10  pr-4 text-lg font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              Use a positive number for income and a negative number for
              expenses.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-3 py-3 text-xs text-rose-300"
            >
              <AlertCircle size={15} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-3 text-xs text-emerald-300"
            >
              <CheckCircle2 size={15} />
              Transaction added successfully!
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-900/25 transition duration-300 hover:shadow-xl hover:shadow-violet-700/30"
          >
            <Plus
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Add Transaction
            <Sparkles
              size={15}
              className="ml-1 text-violet-200 transition-transform group-hover:scale-125"
            />
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
};
