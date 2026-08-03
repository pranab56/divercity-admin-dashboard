"use client";

import React from "react";
import { X } from "lucide-react";

interface InvoicesCardDetailsModalProps {
  cardTitle: string | null;
  onClose: () => void;
}

export default function InvoicesCardDetailsModal({
  cardTitle,
  onClose,
}: InvoicesCardDetailsModalProps) {
  if (!cardTitle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-base font-bold text-gray-900">{cardTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs text-gray-600">
          <p>
            Detailed transaction log and platform ledger calculations for{" "}
            <strong>{cardTitle}</strong>.
          </p>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-1.5 font-medium">
            <div className="flex justify-between">
              <span>Gross Processed:</span>
              <span className="font-bold text-gray-900">$52,400.00</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee (10%):</span>
              <span className="font-bold text-[#8E25E3]">$5,240.00</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1">
              <span>Net Ledger Balance:</span>
              <span className="font-bold text-emerald-600">$47,160.00</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
