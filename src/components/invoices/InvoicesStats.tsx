"use client";

import React from "react";
import { ArrowUpRight, Clock, DollarSign, TrendingUp } from "lucide-react";

interface InvoicesStatsProps {
  onOpenCardDetails: (title: string) => void;
}

export default function InvoicesStats({ onOpenCardDetails }: InvoicesStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Total Subscriptions */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:bg-gray-200/90 transition-all duration-200">
        <div>
          <div className="w-10 h-10 rounded-lg bg-amber-100/90 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-1">480</h2>
          <p className="text-sm font-medium text-gray-600 mb-3">Total Subscriptions</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onOpenCardDetails("Total Subscriptions Breakdown")}
            className="text-xs font-semibold underline text-amber-600 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Click for Details
          </button>
        </div>
      </div>

      {/* Card 2: Total Payout */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:bg-gray-200/90 transition-all duration-200">
        <div>
          <div className="w-10 h-10 rounded-lg bg-red-100/90 text-red-600 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-1">$1,240</h2>
          <p className="text-sm font-medium text-gray-600 mb-3">Total Payout</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onOpenCardDetails("Total Payout Ledger")}
            className="text-xs font-semibold underline text-red-600 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Click for Details
          </button>
        </div>
      </div>

      {/* Card 3: Total commission Income */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:bg-gray-200/90 transition-all duration-200">
        <div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100/90 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-1">$41,460</h2>
          <p className="text-sm font-medium text-gray-600 mb-3">Total commission Income</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onOpenCardDetails("Platform Commission Earnings")}
            className="text-xs font-semibold underline text-emerald-600 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Click for Details
          </button>
        </div>
      </div>

      {/* Card 4: Total Revenue (Jun) */}
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:bg-gray-200/90 transition-all duration-200">
        <div>
          <div className="w-10 h-10 rounded-lg bg-purple-100/90 text-[#8E25E3] flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-1">$42,700</h2>
          <p className="text-sm font-medium text-gray-600 mb-3">Total Revenue (Jun)</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onOpenCardDetails("Monthly Revenue (June)")}
            className="text-xs font-semibold underline text-[#8E25E3] hover:opacity-80 transition-opacity cursor-pointer"
          >
            Click for Details
          </button>
        </div>
      </div>
    </div>
  );
}
