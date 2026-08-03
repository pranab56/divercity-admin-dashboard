"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialUsersList, UserItem, UserStatus } from "@/components/user-management/types";
import UserManagementHeader from "@/components/user-management/UserManagementHeader";
import UserFiltersBar from "@/components/user-management/UserFiltersBar";
import UserTable from "@/components/user-management/UserTable";
import UserDetailsModal from "@/components/user-management/UserDetailsModal";

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserItem | null>(null);

  // Filtering
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      selectedRoleFilter === "All" || u.role === selectedRoleFilter;

    return matchesSearch && matchesRole;
  });

  const updateUserStatus = (userId: string, newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))
    );
    toast.success(`User status updated to ${newStatus}`);
  };

  const removeUser = (userId: string) => {
    const userToRemove = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    toast.success(`User ${userToRemove?.name || ""} removed successfully`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header */}
      <UserManagementHeader />

      {/* Search & Filter Bar */}
      <UserFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRoleFilter={selectedRoleFilter}
        setSelectedRoleFilter={setSelectedRoleFilter}
      />

      {/* Data Table */}
      <UserTable
        users={filteredUsers}
        activeMenuId={activeMenuId}
        setActiveMenuId={setActiveMenuId}
        setSelectedUserDetail={setSelectedUserDetail}
        updateUserStatus={updateUserStatus}
        removeUser={removeUser}
      />

      {/* User Details Modal (Student, Company, Educator, Parent detail views) */}
      <UserDetailsModal
        user={selectedUserDetail}
        onClose={() => setSelectedUserDetail(null)}
      />
    </div>
  );
}
