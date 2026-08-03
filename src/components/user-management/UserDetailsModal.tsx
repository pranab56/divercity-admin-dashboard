"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  Layers,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserItem } from "./types";

interface UserDetailsModalProps {
  user: UserItem | null;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const [selectedChild, setSelectedChild] = useState("Romo Rodriguez");

  if (!user) return null;

  const handleDownloadDoc = () => {
    toast.success("Downloading Company Registration Certificate...");
  };

  const handleExportPDF = () => {
    toast.success("Performance report exported to PDF!");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-4xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 border border-gray-300/60 relative">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- 1. STUDENT VIEW --- */}
        {user.role === "Student" && (
          <div className="space-y-6">
            {/* ENGAGEMENT METRICS */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                ENGAGEMENT METRICS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Total Streak</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">500 XP</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Current streak active</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Videos Watched</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">24</h3>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Applications</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">8</h3>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Quizzes</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">12</h3>
                </div>
              </div>
            </div>

            {/* STUDENT INFORMATION */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                STUDENT INFORMATION
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                    alt="Student"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.name || "Romo"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Age</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.age || "14-16"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Email</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.email || "student@email.com"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Location</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.location || "London, UK"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">School / College</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.school || "St. Mary's Secondary School"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Student Id</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.studentId || "#USR-00124"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PARENT INFORMATION */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                PARENT INFORMATION
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
                    alt="Parent"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Parent Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">Emily Rodriguez</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Relationship</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">Parent</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Parent Email</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">emily.r@email.com</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Phone Number</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">+44 20 7946 0958</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Account Status</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">Active</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Member Since</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">May 10, 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TOPICS & PRIMARY GOAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                  TOPICS OF INTEREST
                </p>
                <div className="bg-[#F4F4F6] rounded-lg p-5 border border-gray-200/50 flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Sustainability
                  </span>
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Leadership
                  </span>
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Creativity
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                  PRIMARY GOAL
                </p>
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="px-5 py-3.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-3">
                    <Layers className="w-4 h-4 text-white" />
                    <span>Making things</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. COMPANY VIEW --- */}
        {user.role === "Company" && (
          <div className="space-y-6">
            {/* COMPANY ACTIVITY */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                COMPANY ACTIVITY
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Active Opportunities</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">12</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Currently recruiting</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Applications</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">47</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Total received</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Students Hired</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">8</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Successfully placed</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Member Since</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">2024</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Verified partner</p>
                </div>
              </div>
            </div>

            {/* COMPANY INFORMATION */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                COMPANY INFORMATION
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={user.avatar || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop"}
                    alt="Company"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Company Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.name || "BuildCo Construction"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Industry Sector</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.industrySector || "Construction & Engineering"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Institution Type</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.institutionType || "Private Limited Company"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Phone Number</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.phoneNumber || "+44 20 1234 5678"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Email</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.email || "contact@buildco.com"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* UPLOADED DOCUMENTS */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                UPLOADED DOCUMENTS
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                <div className="bg-white border border-gray-200/70 rounded-lg p-4 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                        Company Registration Certificate
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                        PDF • 2.4 MB • Uploaded on May 15, 2026
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadDoc}
                    className="flex items-center gap-2 text-xs font-bold text-[#57154D] hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#57154D]" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PERFORMANCE REPORT DOWNLOAD BANNER */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                PERFORMANCE REPORT DOWNLOAD
              </p>
              <div className="relative rounded-lg overflow-hidden p-6 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 text-white flex items-center justify-between shadow-xl">
                {/* Background Accent SVG */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-30 pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Performance report
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleExportPDF}
                  className="relative z-10 px-4 py-2.5 bg-white text-gray-900 rounded-lg text-xs font-bold shadow-md hover:bg-gray-100 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-gray-900" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. TEACHER VIEW --- */}
        {user.role === "Teacher" && (
          <div className="space-y-6">
            {/* EDUCATOR ACTIVITY */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                COMPANY ACTIVITY
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Resources Uploaded</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">24</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Total educational resources</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>New Events Created</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">8</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Events organized this year</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Member Since</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">2024</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Verified partner</p>
                </div>
              </div>
            </div>

            {/* EDUCATOR INFORMATION */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                EDUCATOR INFORMATION
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={user.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"}
                    alt="Educator"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Full Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.name || "James Wilson"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">School / College Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.school || "St. Mary's Secondary School"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Institution Type</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.institutionType || "Secondary School"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Email</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.email || "j.wilson@school.edu"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. PARENT VIEW --- */}
        {user.role === "Parent" && (
          <div className="space-y-6">
            {/* PARENT INFORMATION */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                PARENT INFORMATION
              </p>
              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={user.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"}
                    alt="Parent"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Parent Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.name || "Emily Rodriguez"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Relationship</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">Parent</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Parent Email</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.email || "emily.r@email.com"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Phone Number</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.phoneNumber || "+44 20 7946 0958"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Account Status</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Member Since</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{user.memberSince || "May 10, 2026"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CHILD INFORMATION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  CHILD INFORMATION
                </p>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs cursor-pointer">
                    <select
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      className="bg-transparent pr-4 focus:outline-none cursor-pointer appearance-none text-xs font-semibold text-gray-700"
                    >
                      <option value="Romo Rodriguez">Romo Rodriguez</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-2.5" />
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F4F6] rounded-lg p-6 border border-gray-200/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-8 w-full text-xs">
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Student Name</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">{selectedChild}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">Age</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">14-16</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium text-[11px] block">School</span>
                    <span className="text-gray-900 font-bold text-sm block mt-0.5">
                      St. Mary&apos;s Secondary School
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ENGAGEMENT METRICS */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                ENGAGEMENT METRICS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Total Streak</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">500 XP</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">Current streak active</p>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Videos Watched</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">24</h3>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Applications</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">8</h3>
                </div>

                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Quizzes</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">12</h3>
                </div>
              </div>
            </div>

            {/* TOPICS & PRIMARY GOAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                  TOPICS OF INTEREST
                </p>
                <div className="bg-[#F4F4F6] rounded-lg p-5 border border-gray-200/50 flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Sustainability
                  </span>
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Leadership
                  </span>
                  <span className="px-4 py-2.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs">
                    Creativity
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                  PRIMARY GOAL
                </p>
                <div className="bg-[#F4F4F6] rounded-lg p-4 border border-gray-200/50">
                  <div className="px-5 py-3.5 bg-[#57154D] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-3">
                    <Layers className="w-4 h-4 text-white" />
                    <span>Making things</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
