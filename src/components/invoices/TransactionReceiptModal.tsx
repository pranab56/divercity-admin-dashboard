"use client";

import React from "react";
import { X } from "lucide-react";
import { TransactionItem } from "./types";

interface TransactionReceiptModalProps {
  transaction: TransactionItem | null;
  onClose: () => void;
}

export default function TransactionReceiptModal({
  transaction,
  onClose,
}: TransactionReceiptModalProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#8E25E3]">{transaction.id}</span>
            <h3 className="text-base font-bold text-gray-900">{transaction.description}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Transaction Date:</span>
            <span className="font-semibold text-gray-900">{transaction.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Property / Partner:</span>
            <span className="font-semibold text-gray-900">{transaction.partner}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Payment Method:</span>
            <span className="font-semibold text-gray-900">{transaction.paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Transaction Type:</span>
            <span className="font-semibold text-gray-900">{transaction.type}</span>
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-bold">
            <span>Total Amount:</span>
            <span className={transaction.type === "Income" ? "text-emerald-600" : "text-red-600"}>
              {transaction.type === "Income" ? "+" : "-"}${transaction.amount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
