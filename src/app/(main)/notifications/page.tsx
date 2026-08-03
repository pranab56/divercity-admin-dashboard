"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BellOff,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Handshake,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

type NotificationCategory =
  | "all"
  | "unread"
  | "user_requests"
  | "mentorship"
  | "content"
  | "system";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  category: "user_requests" | "mentorship" | "content" | "system";
  timestamp: string;
  read: boolean;
  link?: string;
  actionText?: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Mentor Application Submitted",
    message: "Ayesha Rahman (Senior Product Manager at Grameenphone) submitted a mentor application for DIC Programme 2024.",
    category: "mentorship",
    timestamp: "10 minutes ago",
    read: false,
    link: "/mentorship-program",
    actionText: "View Application",
  },
  {
    id: "notif-2",
    title: "Organisation Partnership Enquiry",
    message: "Digital Innovation & Incubation Centre (DIIC) requested a partnership to sponsor 30 fellows.",
    category: "user_requests",
    timestamp: "45 minutes ago",
    read: false,
    link: "/user-requests",
    actionText: "Review Enquiry",
  },
  {
    id: "notif-3",
    title: "Video Submitted for Approval",
    message: "National Build Forum uploaded 'Women in Construction – Inspiring Stories' awaiting moderation.",
    category: "content",
    timestamp: "2 hours ago",
    read: false,
    link: "/content-management",
    actionText: "Review Video",
  },
  {
    id: "notif-4",
    title: "New Company Position Request",
    message: "Senior Quantity Surveyor position added under Traditional Trade category for admin approval.",
    category: "user_requests",
    timestamp: "4 hours ago",
    read: true,
    link: "/company-positions",
    actionText: "Check Position",
  },
  {
    id: "notif-5",
    title: "Mentee Smart Match Suggested",
    message: "System generated 94% compatibility match between Amina Hassan (Mentor) and David Osei (Mentee).",
    category: "mentorship",
    timestamp: "6 hours ago",
    read: true,
    link: "/mentorship-program",
    actionText: "Match Mentors",
  },
  {
    id: "notif-6",
    title: "Quiz Created & Awaiting Review",
    message: "Basic Construction Tools Quiz with 5 questions submitted for publishing.",
    category: "content",
    timestamp: "1 day ago",
    read: true,
    link: "/content-management",
    actionText: "View Quiz",
  },
  {
    id: "notif-7",
    title: "System Security Audit Completed",
    message: "Automated security scanning and user permission validation completed with zero vulnerabilities.",
    category: "system",
    timestamp: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marked as read");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("Cleared all notifications");
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = true;
    if (activeTab === "unread") matchesCategory = !item.read;
    else if (activeTab !== "all") matchesCategory = item.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (cat: NotificationItem["category"]) => {
    switch (cat) {
      case "mentorship":
        return (
          <span className="px-3 py-1 bg-purple-100 text-[#57154D] rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5" />
            <span>Mentorship</span>
          </span>
        );
      case "user_requests":
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            <span>User Requests</span>
          </span>
        );
      case "content":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Content</span>
          </span>
        );
      case "system":
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>System</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Top Header & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-[#57154D] text-white rounded-full text-xs font-bold">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Stay updated with incoming requests, mentorship applications, and content approvals.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2.5 bg-white/80 hover:bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-800 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck className="w-4 h-4 text-[#059669]" />
            <span>Mark all as read</span>
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            className="px-4 py-2.5 text-red-600 hover:text-red-800 bg-red-50/60 hover:bg-red-100 border border-red-200/80 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>Clear all</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E2E2E5] rounded-lg border border-gray-200/60 shadow-2xs">
          {[
            { id: "all", label: "All Notifications" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "user_requests", label: "User Requests" },
            { id: "mentorship", label: "Mentorship" },
            { id: "content", label: "Content" },
            { id: "system", label: "System" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as NotificationCategory)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive
                  ? "bg-white text-gray-900 shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#E8E8EB] border border-gray-300/40 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Notifications Container */}
      <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 sm:p-6 shadow-2xs space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-lg bg-gray-200/70 text-gray-400 flex items-center justify-center mx-auto">
              <BellOff className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              No notifications found
            </h3>
            <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
              You are all caught up! There are no pending notifications in this category.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-5 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${!notif.read
                ? "bg-white border-[#57154D]/30 shadow-xs"
                : "bg-white/60 border-gray-200/80 hover:bg-white"
                }`}
            >
              {/* Left Side: Unread dot + Icon + Info */}
              <div className="flex items-start gap-3.5">
                {!notif.read ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#57154D] shrink-0 mt-2" />
                ) : (
                  <span className="w-2.5 h-2.5 shrink-0" />
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      {notif.title}
                    </h4>
                    {getCategoryBadge(notif.category)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 pt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{notif.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Action Button & Controls */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {notif.link && notif.actionText && (
                  <Link
                    href={notif.link}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="px-4 py-2 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <span>{notif.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {!notif.read && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Mark as read"
                    className="p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(notif.id)}
                  title="Delete notification"
                  className="p-2 text-gray-400 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Row */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {[1, 2, 3, 4, 5, 6, "...", 10].map((pageItem, idx) => {
          if (pageItem === "...") {
            return (
              <span key={idx} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-gray-500">
                ...
              </span>
            );
          }
          const isSelected = currentPage === pageItem;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => typeof pageItem === "number" && setCurrentPage(pageItem)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${isSelected
                ? "bg-[#57154D] text-white shadow-xs"
                : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80"
                }`}
            >
              {pageItem}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
          className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
