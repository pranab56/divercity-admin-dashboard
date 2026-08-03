"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    Mail,
    MoreHorizontal,
    Trash2,
    XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import UserDetailsModal from "@/components/user-management/UserDetailsModal";
import { UserItem, UserRole, UserStatus } from "@/components/user-management/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user requests list matching screenshot
const initialRequestsList: UserItem[] = [
    {
        id: "REQ-001",
        name: "Jhon",
        role: "Teacher",
        email: "john@metromart.com",
        status: "Active",
        resourcesUploaded: 24,
        newEventsCreated: 8,
        memberSince: "2024",
        institutionType: "Secondary School",
        school: "St. Mary's Secondary School",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: "REQ-002",
        name: "Jhon",
        role: "Teacher",
        email: "sarah@freshfarms.com",
        status: "Active",
        resourcesUploaded: 18,
        newEventsCreated: 5,
        memberSince: "2024",
        institutionType: "Secondary School",
        school: "St. Mary's Secondary School",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: "REQ-003",
        name: "Jhon",
        role: "Company",
        email: "mike@citygrocers.com",
        status: "Active",
        activeOpportunities: 12,
        applicationsCount: 47,
        studentsHired: 8,
        memberSince: "2024",
        institutionType: "Private Limited Company",
        industrySector: "Construction & Engineering",
        phoneNumber: "+44 20 1234 5678",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: "REQ-004",
        name: "Jhon",
        role: "Company",
        email: "alan@grainmasters.com",
        status: "Suspended",
        activeOpportunities: 15,
        applicationsCount: 30,
        studentsHired: 6,
        memberSince: "2024",
        institutionType: "Private Limited Company",
        industrySector: "Engineering & Architecture",
        phoneNumber: "+44 20 5555 0192",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: "REQ-005",
        name: "Romo",
        role: "Student",
        email: "student@email.com",
        status: "Active",
        xp: 500,
        videosWatched: 24,
        applicationsCount: 8,
        quizzesCount: 12,
        age: "14-16",
        location: "London, UK",
        school: "St. Mary's Secondary School",
        studentId: "#USR-00124",
        parentName: "Emily Rodriguez",
        parentEmail: "emily.r@email.com",
        relationship: "Parent",
        phoneNumber: "+44 20 7946 0958",
        memberSince: "May 10, 2026",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: "REQ-006",
        name: "Emily Rodriguez",
        role: "Parent",
        email: "emily.r@email.com",
        status: "Active",
        parentName: "Emily Rodriguez",
        parentEmail: "emily.r@email.com",
        relationship: "Parent",
        phoneNumber: "+44 20 7946 0958",
        memberSince: "May 10, 2026",
        xp: 500,
        videosWatched: 24,
        applicationsCount: 8,
        quizzesCount: 12,
        age: "14-16",
        school: "St. Mary's Secondary School",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    },
];

export default function UserRequestsPage() {
    const [requestsList, setRequestsList] = useState<UserItem[]>(initialRequestsList);
    const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
    const [selectedUserDetail, setSelectedUserDetail] = useState<UserItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const rolesList: ("All" | UserRole)[] = ["All", "Teacher", "Company", "Student", "Parent"];

    const filteredRequests = requestsList.filter((r) => {
        return selectedRoleFilter === "All" || r.role === selectedRoleFilter;
    });

    const updateUserStatus = (id: string, newStatus: UserStatus) => {
        setRequestsList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        toast.success(`Request status set to ${newStatus}`);
    };

    const removeUserRequest = (id: string) => {
        setRequestsList((prev) => prev.filter((item) => item.id !== id));
        toast.success("Request removed successfully");
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
            {/* Top Metric Card & Role Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                {/* Total Requests Stat Card */}
                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 shadow-2xs w-full sm:w-72">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        TOTAL REQUESTS
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1.5 tracking-tight">
                        142
                    </h2>
                </div>

                {/* Top Right Role Filter Selector (shadcn Select) */}
                <div className="shrink-0 w-full sm:w-auto">
                    <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
                        <SelectTrigger className="w-full sm:w-[160px] bg-[#F4F4F6] py-5 cursor-pointer sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs focus:ring-2 focus:ring-[#57154D]/30 h-10 px-4">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                            {rolesList.map((r) => (
                                <SelectItem key={r} value={r} className="font-semibold text-xs sm:text-sm cursor-pointer">
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-4 sm:p-6 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                            <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                                <th className="py-4 px-4">USER</th>
                                <th className="py-4 px-4">ROLE</th>
                                <th className="py-4 px-4">CONTACT</th>
                                <th className="py-4 px-4 text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500 font-medium">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="hover:bg-white/60 transition-colors"
                                    >
                                        {/* USER */}
                                        <td className="py-5 px-4">
                                            <span className="font-medium text-gray-900 text-sm sm:text-base">
                                                {req.name}
                                            </span>
                                        </td>

                                        {/* ROLE */}
                                        <td className="py-5 px-4">
                                            <span className="bg-[#E8DBE6] text-[#57154D] font-semibold text-xs px-4 py-1.5 rounded-lg shadow-2xs inline-block">
                                                {req.role}
                                            </span>
                                        </td>

                                        {/* CONTACT */}
                                        <td className="py-5 px-4">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium text-xs sm:text-sm">
                                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                <span>{req.email}</span>
                                            </div>
                                        </td>

                                        {/* ACTIONS (shadcn DropdownMenu) */}
                                        <td className="py-5 px-4 text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 bg-[#F4F4F6] border border-gray-200/80 rounded-lg shadow-2xl z-50 p-1.5 text-left space-y-0.5">
                                                    {/* View Profile */}
                                                    <DropdownMenuItem
                                                        onClick={() => setSelectedUserDetail(req)}
                                                        className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-white rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                                                    >
                                                        <Eye className="w-4 h-4 text-gray-600 shrink-0" />
                                                        <span>View Profile</span>
                                                    </DropdownMenuItem>

                                                    {/* Active User */}
                                                    <DropdownMenuItem
                                                        onClick={() => updateUserStatus(req.id, "Active")}
                                                        className="px-3 py-2 text-xs font-semibold text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                                                        <span>Active User</span>
                                                    </DropdownMenuItem>

                                                    {/* Suspend User */}
                                                    <DropdownMenuItem
                                                        onClick={() => updateUserStatus(req.id, "Suspended")}
                                                        className="px-3 py-2 text-xs font-semibold text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                                                    >
                                                        <XCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                                                        <span>Suspend User</span>
                                                    </DropdownMenuItem>

                                                    {/* Remove User */}
                                                    <DropdownMenuItem
                                                        onClick={() => removeUserRequest(req.id)}
                                                        className="px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                                                        <span>Remove User</span>
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

            {/* Pagination Row matching User Requests design */}
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

            {/* Profile Details Modal */}
            <UserDetailsModal
                user={selectedUserDetail}
                onClose={() => setSelectedUserDetail(null)}
            />
        </div>
    );
}