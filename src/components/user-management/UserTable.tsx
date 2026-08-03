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
import { UserItem, UserStatus } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserTableProps {
  users: UserItem[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  setSelectedUserDetail: (user: UserItem) => void;
  updateUserStatus: (userId: string, newStatus: UserStatus) => void;
  removeUser: (userId: string) => void;
}

export default function UserTable({
  users,
  setSelectedUserDetail,
  updateUserStatus,
  removeUser,
}: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* Table Container */}
      <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-4 sm:p-6 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                <th className="py-4 px-4">USER</th>
                <th className="py-4 px-4">ROLE</th>
                <th className="py-4 px-4">CONTACT</th>
                <th className="py-4 px-4">STATUS</th>
                <th className="py-4 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/60 transition-colors"
                  >
                    {/* USER */}
                    <td className="py-5 px-4">
                      <span className="font-medium text-gray-900 text-sm sm:text-base">
                        {user.name}
                      </span>
                    </td>

                    {/* ROLE */}
                    <td className="py-5 px-4">
                      <span className="bg-[#E8DBE6] text-[#57154D] font-semibold text-xs px-4 py-1.5 rounded-lg shadow-2xs inline-block">
                        {user.role}
                      </span>
                    </td>

                    {/* CONTACT */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2 text-gray-500 font-medium text-xs sm:text-sm">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{user.email}</span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-5 px-4">
                      {user.status === "Active" ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D1FAE5] text-[#059669] rounded-full text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFEDD5] text-[#D97706] rounded-full text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Suspended</span>
                        </div>
                      )}
                    </td>

                    {/* ACTIONS (shadcn DropdownMenu Component) */}
                    <td className="py-5 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                          <MoreHorizontal className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-[#F4F4F6] border border-gray-200/80 rounded-lg shadow-2xl z-50 p-1.5 text-left space-y-0.5">
                          {/* View Profile */}
                          <DropdownMenuItem
                            onClick={() => setSelectedUserDetail(user)}
                            className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-white rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-gray-600 shrink-0" />
                            <span>View Profile</span>
                          </DropdownMenuItem>

                          {/* Active User */}
                          <DropdownMenuItem
                            onClick={() => updateUserStatus(user.id, "Active")}
                            className="px-3 py-2 text-xs font-semibold text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                            <span>Active User</span>
                          </DropdownMenuItem>

                          {/* Suspend User */}
                          <DropdownMenuItem
                            onClick={() => updateUserStatus(user.id, "Suspended")}
                            className="px-3 py-2 text-xs font-semibold text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                            <span>Suspend User</span>
                          </DropdownMenuItem>

                          {/* Remove User */}
                          <DropdownMenuItem
                            onClick={() => removeUser(user.id)}
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
