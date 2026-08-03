"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Check,
  ExternalLink,
  Info,
  Receipt,
  Trash2,
  Wrench,
} from "lucide-react";
import { NotificationItemType } from "@/types/notification";

interface NotificationItemProps {
  item: NotificationItemType;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationItem({
  item,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const router = useRouter();

  const getCategoryIcon = () => {
    switch (item.category) {
      case "service_request":
        return <Wrench className="w-5 h-5 text-[#8E25E3]" />;
      case "invoice":
        return <Receipt className="w-5 h-5 text-[#F59E0B]" />;
      case "property":
        return <Building2 className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Info className="w-5 h-5 text-[#10B981]" />;
    }
  };

  const getCategoryBg = () => {
    switch (item.category) {
      case "service_request":
        return "bg-purple-100";
      case "invoice":
        return "bg-amber-100";
      case "property":
        return "bg-blue-100";
      default:
        return "bg-emerald-100";
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(item.id);
    if (item.link) {
      router.push(item.link);
    }
  };

  return (
    <div
      onClick={() => !item.read && onMarkAsRead(item.id)}
      className={`p-4 sm:p-5 rounded-lg border transition-all cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-4 ${!item.read
        ? "bg-[#EBEBEB] border-purple-300 shadow-2xs"
        : "bg-[#EBEBEB]/80 hover:bg-[#EBEBEB] border-gray-300/50 opacity-90"
        }`}
    >
      {/* Icon + Main Info */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        {/* Category Icon Badge */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getCategoryBg()}`}
        >
          {getCategoryIcon()}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              className={`text-sm sm:text-base font-bold tracking-tight ${!item.read ? "text-gray-900" : "text-gray-700"
                }`}
            >
              {item.title}
            </h4>

            {/* Unread Indicator Dot */}
            {!item.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#8E25E3] shrink-0" title="Unread" />
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            {item.message}
          </p>

          <span className="text-[11px] text-gray-400 font-medium block pt-0.5">
            {item.timestamp}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {item.link && (
          <button
            type="button"
            onClick={handleActionClick}
            className="px-3.5 py-2 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-medium rounded-md text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{item.actionText || "View"}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}

        {!item.read && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(item.id);
            }}
            className="p-2 rounded-md bg-white border border-gray-300/80 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Mark as Read"
          >
            <Check className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="p-2 rounded-md bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition-colors cursor-pointer"
          title="Delete Notification"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
