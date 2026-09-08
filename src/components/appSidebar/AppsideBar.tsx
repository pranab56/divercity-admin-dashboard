"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  FileText,
  Headphones,
  HeartPulse,
  LayoutGrid,
  LogOut,
  MessageSquare,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";

import toast from "react-hot-toast";
import { removeToken } from "@/utils/storage";

import Image from "next/image";

function DiicLogo() {
  return (
    <div className="flex items-center justify-start py-1 px-1">
      <Image
        src="/logo/logo.png"
        alt="DIIC Logo"
        width={180}
        height={60}
        className="h-auto w-full max-w-[180px] object-contain"
        priority
      />
    </div>
  );
}

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const sidebars: SidebarItem[] = [
  { name: "Overview", path: "/", icon: LayoutGrid },
  { name: "User Management", path: "/user-management", icon: Users },
  { name: "User Requests", path: "/user-requests", icon: UserPlus },
  { name: "Company Positions", path: "/company-positions", icon: Briefcase },
  { name: "Content Management", path: "/content-management", icon: FileText },
  { name: "Mentorship Program", path: "/mentorship-program", icon: MessageSquare },
  { name: "Hard Hat & Women's Health", path: "/hard-hat-womens-health", icon: HeartPulse },
  { name: "Help & Support", path: "/help-support", icon: Headphones },
  { name: "Legal", path: "/legal", icon: ShieldCheck },
];

export default function OptimusSidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/dashboard-overview";
    }
    return pathname.startsWith(path);
  };

  const confirmLogout = () => {
    removeToken();
    document.cookie = "cat-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logged out successfully");
    setShowLogoutModal(false);
    router.push("/auth/login");
  };

  return (
    <>
      <Sidebar className="border-r border-gray-200/80 bg-[#F7F7F8]">
        {/* Header Logo */}
        <SidebarHeader className="p-4 sm:p-5 border-b border-gray-200/50 bg-[#F7F7F8]">
          <Link href="/" className="block">
            <DiicLogo />
          </Link>
        </SidebarHeader>

        {/* Main Menu items */}
        <SidebarContent className="bg-[#F7F7F8] p-3">
          <SidebarMenu className="space-y-1.5">
            {sidebars.map((item) => {
              const active = isActive(item.path);
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={`h-11 px-4 rounded-[#57154D] rounded-lg transition-all duration-200 flex items-center justify-between w-full cursor-pointer ${active
                      ? "bg-[#57154D] text-white font-semibold shadow-xs hover:bg-[#47103F] hover:text-white"
                      : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900 font-medium"
                      }`}
                  >
                    <Link href={item.path} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-4 h-4 sm:h-5 sm:w-5 ${active ? "text-white" : "text-gray-500"}`} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer Logout Button */}
        <SidebarFooter className="p-3 border-t border-gray-200/50 bg-[#F7F7F8]">
          <div className="bg-[#EEEEF0] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50/80 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Logout</span>
              <div className="border border-red-600/30 rounded-md p-0.5">
                <LogOut className="h-4 w-4 text-red-600" />
              </div>
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 ease-out">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 text-[#57154D]">
              <LogOut className="w-8 h-8 text-[#57154D]" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-500 mb-6 font-normal">
              Are you sure you want to log out of your DIIC account?
            </p>

            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 py-3 px-4 bg-[#57154D] hover:bg-[#430f3c] text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}