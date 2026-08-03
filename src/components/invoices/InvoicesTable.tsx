"use client";

import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";
import { TransactionItem } from "./types";

interface InvoicesTableProps {
  transactions: TransactionItem[];
  setSelectedTxn: (txn: TransactionItem) => void;
}

export default function InvoicesTable({
  transactions,
  setSelectedTxn,
}: InvoicesTableProps) {
  return (
    <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300/80 text-gray-500 text-xs font-semibold">
              <th className="py-4 px-5 font-medium">Transaction ID</th>
              <th className="py-4 px-5 font-medium">Date</th>
              <th className="py-4 px-5 font-medium">Description</th>
              <th className="py-4 px-5 font-medium">Property partner</th>
              <th className="py-4 px-5 font-medium">Amount</th>
              <th className="py-4 px-5 font-medium">Payment Method</th>
              <th className="py-4 px-5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300/60 text-xs font-medium text-gray-800">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500 font-medium">
                  No transactions match your search.
                </td>
              </tr>
            ) : (
              transactions.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedTxn(item)}
                  className="hover:bg-gray-200/60 transition-colors cursor-pointer"
                >
                  {/* Transaction ID */}
                  <td className="py-4 px-5 font-bold text-[#8E25E3]">
                    {item.id}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-5 text-gray-600 font-normal">
                    {item.date}
                  </td>

                  {/* Description */}
                  <td className="py-4 px-5 font-bold text-gray-900">
                    {item.description}
                  </td>

                  {/* Property partner */}
                  <td className="py-4 px-5 text-gray-600 font-medium">
                    {item.partner}
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1 font-bold text-sm">
                      {item.type === "Income" ? (
                        <>
                          <ArrowDownLeft className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-emerald-600">
                            +${item.amount.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="text-red-600">
                            -${item.amount.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Payment Method */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-gray-700 font-normal">
                      <CreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{item.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-semibold">
                      {item.status === "Completed" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-emerald-600">Completed</span>
                        </>
                      )}
                      {item.status === "Pending" && (
                        <>
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="text-amber-600">Pending</span>
                        </>
                      )}
                      {item.status === "Failed" && (
                        <>
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span className="text-red-600">Failed</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
