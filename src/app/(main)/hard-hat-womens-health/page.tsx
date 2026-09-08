"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  UserCheck,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
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

type MainTab = "Hard Hat" | "Women's Health";

type RequestItem = {
  id: string;
  userName: string;
  currentStatus: "Employed" | "Apprentice" | "Student" | "Self-employed";
  email: string;
  phone: string;
  supportType: string;
  dateSubmitted?: string;
  notes?: string;
};

const hardHatRequests: RequestItem[] = [
  {
    id: "HH-001",
    userName: "Sarah Johnson",
    currentStatus: "Employed",
    email: "sarah.johnson@email.com",
    phone: "+44 7700 900123",
    supportType: "Workplace support",
    dateSubmitted: "02 Sep 2026",
    notes: "Requires workplace safety equipment consultation and site audit.",
  },
  {
    id: "HH-002",
    userName: "Emma Clarke",
    currentStatus: "Apprentice",
    email: "emma.clarke@email.com",
    phone: "+44 7700 900456",
    supportType: "Inclusive tool recommendation",
    dateSubmitted: "01 Sep 2026",
    notes: "Requesting guidance on lightweight ergonomic construction tools.",
  },
  {
    id: "HH-003",
    userName: "Priya Patel",
    currentStatus: "Student",
    email: "priya.patel@email.com",
    phone: "+44 7700 900789",
    supportType: "Supplier introduction",
    dateSubmitted: "28 Aug 2026",
    notes: "Looking for verified safety gear suppliers offering small PPE sizes.",
  },
  {
    id: "HH-004",
    userName: "Lucy Thompson",
    currentStatus: "Self-employed",
    email: "lucyt@constructco.com",
    phone: "+44 7700 900321",
    supportType: "Wellbeing coaching",
    dateSubmitted: "25 Aug 2026",
    notes: "Mental health and career transition coaching for independent trade workers.",
  },
];

const womensHealthRequests: RequestItem[] = [
  {
    id: "WH-001",
    userName: "Jessica Taylor",
    currentStatus: "Employed",
    email: "jessica.t@sitebuild.co.uk",
    phone: "+44 7700 900888",
    supportType: "Maternity safety PPE adjustment",
    dateSubmitted: "03 Sep 2026",
    notes: "Assistance needed for modified high-vis and harness fittings during pregnancy.",
  },
  {
    id: "WH-002",
    userName: "Hannah Davies",
    currentStatus: "Apprentice",
    email: "hannah.d@construct.org",
    phone: "+44 7700 900999",
    supportType: "Sanitary site facility access",
    dateSubmitted: "30 Aug 2026",
    notes: "Inquiry regarding female sanitation facilities compliance on commercial sites.",
  },
  {
    id: "WH-003",
    userName: "Chloe Bennett",
    currentStatus: "Self-employed",
    email: "chloe@bennettsurveys.co.uk",
    phone: "+44 7700 900222",
    supportType: "Menopause workplace advice",
    dateSubmitted: "27 Aug 2026",
    notes: "Guidance on flexible working arrangements during site inspection projects.",
  },
  {
    id: "WH-004",
    userName: "Rachel Green",
    currentStatus: "Employed",
    email: "rachel.green@buildfirm.com",
    phone: "+44 7700 900555",
    supportType: "Ergonomic harness & safety fitting",
    dateSubmitted: "24 Aug 2026",
    notes: "Custom female-fit height safety harness evaluation.",
  },
  {
    id: "WH-005",
    userName: "Sophia Williams",
    currentStatus: "Student",
    email: "sophia.w@uni.ac.uk",
    phone: "+44 7700 900777",
    supportType: "Female health in trade mentorship",
    dateSubmitted: "20 Aug 2026",
    notes: "Seeking female peer mentor in civil engineering field.",
  },
];

export default function HardHatWomensHealthPage() {
  const [activeTab, setActiveTab] = useState<MainTab>("Hard Hat");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  // Pick dataset based on active tab
  const currentDataset = activeTab === "Hard Hat" ? hardHatRequests : womensHealthRequests;

  // Filter dataset based on status and search query
  const filteredData = currentDataset.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.currentStatus === statusFilter;
    const matchesSearch =
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supportType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle Export CSV
  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    const headers = ["ID", "User Name", "Current Status", "Email", "Phone", "Support Type", "Date Submitted"];
    const csvRows = [
      headers.join(","),
      ...filteredData.map((row) =>
        [
          `"${row.id}"`,
          `"${row.userName}"`,
          `"${row.currentStatus}"`,
          `"${row.email}"`,
          `"${row.phone}"`,
          `"${row.supportType}"`,
          `"${row.dateSubmitted || ""}"`,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeTab.toLowerCase().replace(/[^a-z0-9]/g, "_")}_requests.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredData.length} records to CSV!`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Top Tab Pill Switcher (Hard Hat vs Women's Health) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setActiveTab("Hard Hat");
            setStatusFilter("All");
            setCurrentPage(1);
          }}
          className={`px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
            activeTab === "Hard Hat"
              ? "bg-[#57154D] text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80"
          }`}
        >
          Hard Hat
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("Women's Health");
            setStatusFilter("All");
            setCurrentPage(1);
          }}
          className={`px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
            activeTab === "Women's Health"
              ? "bg-[#57154D] text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80"
          }`}
        >
          Women&apos;s Health
        </button>
      </div>

      {/* Metric Card & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {/* TOTAL REQUESTS Card */}
        <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 shadow-2xs w-full sm:w-72">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            TOTAL REQUESTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1.5 tracking-tight">
            {filteredData.length}
          </h2>
        </div>

        {/* Right Controls: Search, Export CSV, Filter Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search request..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs"
            />
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-5 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export CSV</span>
          </button>

          {/* Status Filter Select Dropdown */}
          <div className="shrink-0">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] sm:w-[140px] bg-white py-5 cursor-pointer border border-gray-200/80 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs focus:ring-2 focus:ring-[#57154D]/30 h-10 px-4">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <SelectItem value="All" className="font-semibold text-xs sm:text-sm cursor-pointer">
                  All
                </SelectItem>
                <SelectItem value="Employed" className="font-semibold text-xs sm:text-sm cursor-pointer">
                  Employed
                </SelectItem>
                <SelectItem value="Apprentice" className="font-semibold text-xs sm:text-sm cursor-pointer">
                  Apprentice
                </SelectItem>
                <SelectItem value="Student" className="font-semibold text-xs sm:text-sm cursor-pointer">
                  Student
                </SelectItem>
                <SelectItem value="Self-employed" className="font-semibold text-xs sm:text-sm cursor-pointer">
                  Self-employed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-4 sm:p-6 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                <th className="py-4 px-4">USER</th>
                <th className="py-4 px-4">CURRENT STATUS</th>
                <th className="py-4 px-4">CONTACT</th>
                <th className="py-4 px-4">SUPPORT TYPE</th>
                <th className="py-4 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                    No requests found matching search or filter.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/60 transition-colors group"
                  >
                    {/* USER */}
                    <td className="py-5 px-4">
                      <span
                        onClick={() => setSelectedRequest(item)}
                        className="font-bold text-gray-900 text-sm sm:text-base hover:underline cursor-pointer"
                      >
                        {item.userName}
                      </span>
                    </td>

                    {/* CURRENT STATUS */}
                    <td className="py-5 px-4">
                      <span className="bg-[#E8DBE6] text-[#57154D] font-bold text-xs px-4 py-1.5 rounded-lg shadow-2xs inline-block">
                        {item.currentStatus}
                      </span>
                    </td>

                    {/* CONTACT */}
                    <td className="py-5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-normal">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-500">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-normal">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-500">{item.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* SUPPORT TYPE */}
                    <td className="py-5 px-4 text-gray-700 font-normal text-xs sm:text-sm">
                      {item.supportType}
                    </td>

                    {/* ACTION */}
                    <td className="py-5 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                          <MoreHorizontal className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-1.5 text-left space-y-0.5">
                          <DropdownMenuItem
                            onClick={() => setSelectedRequest(item)}
                            className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-[#57154D] shrink-0" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.success(`Marked request ${item.id} as resolved`)}
                            className="px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Mark Resolved</span>
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
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                isSelected
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

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 border border-gray-200 relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md">
                  {selectedRequest.id}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2">
                  Request Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  User Name
                </span>
                <p className="text-base font-bold text-gray-900 mt-0.5">
                  {selectedRequest.userName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Current Status
                </span>
                <span className="inline-block mt-1 bg-[#E8DBE6] text-[#57154D] font-bold text-xs px-3.5 py-1 rounded-lg">
                  {selectedRequest.currentStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Email Contact
                  </span>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {selectedRequest.email}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {selectedRequest.phone}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Support Type
                </span>
                <p className="text-sm font-semibold text-[#57154D] mt-0.5">
                  {selectedRequest.supportType}
                </p>
              </div>

              {selectedRequest.notes && (
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Request Notes & Details
                  </span>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(`Request ${selectedRequest.id} marked as resolved!`);
                  setSelectedRequest(null);
                }}
                className="flex-1 py-2.5 bg-[#57154D] hover:bg-[#430f3c] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
