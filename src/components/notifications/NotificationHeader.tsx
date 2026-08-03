"use client";

import React from "react";
import { CheckCheck, Trash2 } from "lucide-react";

interface NotificationHeaderProps {
  unreadCount: number;
  totalCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationHeader({
  unreadCount,
  totalCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="bg-[#8E25E3] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
              {unreadCount} new
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
          Stay updated on property maintenance, invoices, and system alerts ({totalCount} total)
        </p>
      </div>

      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="bg-[#EBEBEB] hover:bg-gray-300/80 text-gray-800 font-medium px-4 py-2 rounded-md border border-gray-300/60 text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-[#8E25E3]" />
            <span>Mark all as read</span>
          </button>
        )}

        {totalCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-md border border-red-200/80 text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Clear all</span>
          </button>
        )}
      </div>
    </div>
  );
}
