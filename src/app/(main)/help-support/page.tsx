"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    Mail,
    MoreHorizontal,
    Search,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SupportRequest = {
    id: string;
    user: string;
    title: string;
    contact: string;
    status: "Solved" | "Pending" | "In Progress";
    date: string;
    message: string;
    reply?: string;
    image?: string;
    hasPdf?: boolean;
};

const initialRequests: SupportRequest[] = [
    {
        id: "req-1",
        user: "John Smith",
        title: "ID Card Issue",
        contact: "john@metromart.com",
        status: "Solved",
        date: "2024-01-15",
        message: "I am having an issue with the login system. It keeps showing an error.",
        reply: "Your login credentials have been reset. Please try signing in again.",
        hasPdf: true,
    },
    {
        id: "req-2",
        user: "Sarah Connor",
        title: "Profile Picture Upload",
        contact: "sarah@freshfarms.com",
        status: "Solved",
        date: "2024-01-14",
        message: "Cannot upload profile picture in dashboard settings.",
        reply: "Please try clearing browser cache.",
        hasPdf: true,
    },
    {
        id: "req-3",
        user: "Michael Brown",
        title: "ID Card Replacement",
        contact: "mike@citygrocers.com",
        status: "Solved",
        date: "2024-01-12",
        message: "Requesting replacement of company ID badge.",
        reply: "Approved.",
        hasPdf: false,
    },
    {
        id: "req-4",
        user: "Alan Miller",
        title: "Account Suspension Warning",
        contact: "alan@grainmasters.com",
        status: "Solved",
        date: "2024-01-10",
        message: "Account suspended notification issue.",
        reply: "Resolved by admin.",
        hasPdf: true,
    },
];

export default function HelpSupportPage() {
    const [requests, setRequests] = useState<SupportRequest[]>(initialRequests);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Active view: list vs detail
    const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);
    const [replyText, setReplyText] = useState("");

    const handleOpenDetail = (req: SupportRequest) => {
        setSelectedRequest(req);
        setReplyText(req.reply || "");
    };

    const handleRemoveRequest = (id: string) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        toast.success("Support request removed");
    };

    const handleMarkResolved = () => {
        if (!selectedRequest) return;
        setRequests((prev) =>
            prev.map((r) =>
                r.id === selectedRequest.id
                    ? { ...r, status: "Solved", reply: replyText }
                    : r
            )
        );
        toast.success("Request marked as Resolved!");
        setSelectedRequest(null);
    };

    const filteredRequests = requests.filter((r) => {
        const q = searchQuery.toLowerCase();
        return (
            r.user.toLowerCase().includes(q) ||
            r.title.toLowerCase().includes(q) ||
            r.contact.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* If Detail View Active */}
            {selectedRequest ? (
                <div className="space-y-6">
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => setSelectedRequest(null)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Request</span>
                    </button>

                    {/* Page Header */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Help & Support
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            Manage and resolve user support inquiries.
                        </p>
                    </div>

                    {/* Main Detail Container */}
                    <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
                        {/* Top Grid Info Header */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-gray-200/80">
                            <div>
                                <span className="text-xs font-semibold text-gray-400 block">From :</span>
                                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                                    {selectedRequest.user}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-gray-400 block">Date :</span>
                                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                                    {selectedRequest.date}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-gray-400 block">Status :</span>
                                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                                    {selectedRequest.status}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-gray-400 block">Title :</span>
                                <span className="text-sm font-bold text-gray-900 mt-0.5 block">
                                    {selectedRequest.title}
                                </span>
                            </div>
                        </div>

                        {/* Illustration / Issue Graphic Banner */}
                        <div className="w-full bg-[#E5E5E8] rounded-lg overflow-hidden border border-gray-300/40 p-4 sm:p-6 flex items-center justify-center">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
                                {/* Broken Phone mock */}
                                <div className="w-48 h-28 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-lg border-2 border-gray-700 p-2 shadow-md relative overflow-hidden flex flex-col justify-between">
                                    <div className="grid grid-cols-4 gap-1 opacity-70">
                                        <div className="w-6 h-6 rounded-lg bg-orange-500" />
                                        <div className="w-6 h-6 rounded-lg bg-amber-400" />
                                        <div className="w-6 h-6 rounded-lg bg-blue-500" />
                                        <div className="w-6 h-6 rounded-lg bg-indigo-500" />
                                        <div className="w-6 h-6 rounded-lg bg-purple-500" />
                                        <div className="w-6 h-6 rounded-lg bg-[#57154D]" />
                                        <div className="w-6 h-6 rounded-lg bg-rose-500" />
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500" />
                                    </div>
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center">
                                        <span className="text-xs font-bold text-red-400 bg-black/60 px-2 py-1 rounded">
                                            System Error 404
                                        </span>
                                    </div>
                                </div>

                                {/* Transfer Arrow */}
                                <div className="text-orange-500 font-bold text-2xl rotate-90 sm:rotate-0">
                                    ➔
                                </div>

                                {/* Fixed Phone mock */}
                                <div className="w-48 h-28 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-lg border-2 border-gray-700 p-2 shadow-md flex flex-col justify-between">
                                    <div className="grid grid-cols-4 gap-1">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500" />
                                        <div className="w-6 h-6 rounded-lg bg-emerald-400" />
                                        <div className="w-6 h-6 rounded-lg bg-blue-500" />
                                        <div className="w-6 h-6 rounded-lg bg-indigo-500" />
                                        <div className="w-6 h-6 rounded-lg bg-purple-500" />
                                        <div className="w-6 h-6 rounded-lg bg-[#57154D]" />
                                        <div className="w-6 h-6 rounded-lg bg-rose-500" />
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attached PDF document */}
                        <div className="flex items-center justify-between p-4 bg-[#E5E5E8] border border-gray-300/40 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-red-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                    PDF
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                                        ID_Verification_Document.pdf
                                    </h4>
                                    <p className="text-[11px] text-gray-400 font-medium">1.2 MB</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => toast.success("Opening PDF attachment")}
                                className="p-2 text-gray-600 hover:text-gray-900 bg-white/80 rounded-lg border border-gray-200 shadow-2xs transition-colors cursor-pointer"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Message Box */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 block">Message :</label>
                            <div className="w-full p-4 bg-[#E5E5E8] border border-gray-300/50 rounded-lg text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                                {selectedRequest.message}
                            </div>
                        </div>

                        {/* Your Reply Box */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 block">Your Reply :</label>
                            <textarea
                                rows={4}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your response here..."
                                className="w-full p-4 bg-[#E5E5E8] border border-gray-300/50 rounded-lg text-xs sm:text-sm text-gray-800 font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#57154D]/30"
                            />
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleMarkResolved}
                                className="px-8 py-3 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                            >
                                Resolved
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* --- MAIN TABLE VIEW (Image 1) --- */
                <div className="space-y-6">
                    {/* Header Title */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Help & Support
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            Manage and resolve user support inquiries.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search anything..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[#E8E8EB] border border-gray-300/40 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs"
                        />
                    </div>

                    {/* Main Table Container */}
                    <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 sm:p-6 shadow-2xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                                        <th className="py-4 px-4">USER</th>
                                        <th className="py-4 px-4">TITLE</th>
                                        <th className="py-4 px-4">CONTACT</th>
                                        <th className="py-4 px-4">STATUS</th>
                                        <th className="py-4 px-4 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
                                    {filteredRequests.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                                                No support requests found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRequests.map((req) => (
                                            <tr
                                                key={req.id}
                                                className="hover:bg-white/60 transition-colors"
                                            >
                                                {/* USER */}
                                                <td className="py-5 px-4 font-bold text-gray-900">{req.user}</td>

                                                {/* TITLE */}
                                                <td className="py-5 px-4 font-bold text-gray-900">{req.title}</td>

                                                {/* CONTACT */}
                                                <td className="py-5 px-4">
                                                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        <span>{req.contact}</span>
                                                    </div>
                                                </td>

                                                {/* STATUS */}
                                                <td className="py-5 px-4">
                                                    <span className="px-3.5 py-1 bg-[#D1FAE5] text-[#059669] rounded-full text-xs font-bold inline-block">
                                                        {req.status}
                                                    </span>
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="py-5 px-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-44 bg-white border border-gray-200/80 rounded-lg shadow-2xl z-50 p-1.5 text-left space-y-0.5">
                                                            <DropdownMenuItem
                                                                onClick={() => handleOpenDetail(req)}
                                                                className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Eye className="w-4 h-4 text-gray-500" />
                                                                <span>View Request</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleRemoveRequest(req.id)}
                                                                className="px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-[#DC2626]" />
                                                                <span>Remove Request</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
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
            )}
        </div>
    );
}