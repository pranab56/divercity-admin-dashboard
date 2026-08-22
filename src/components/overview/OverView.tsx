"use client";

import React, { useState } from "react";
import {
  Activity,
  Calendar,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Top Stat Cards Data
const statCards = [
  { label: "TOTAL STUDENT", value: "100" },
  { label: "TOTAL PARENT", value: "100" },
  { label: "TOTAL COMPANY", value: "200" },
  { label: "TOTAL TEACHER", value: "700" },
  { label: "TOTAL INDUSTRY PROF", value: "150" },
];

// 2. Bar Chart Data (May is highlighted)
const userBarData = [
  { month: "Jan", count: 3500 },
  { month: "Feb", count: 6500 },
  { month: "Mar", count: 4500 },
  { month: "Apr", count: 7500 },
  { month: "May", count: 13000, isHighlight: true },
  { month: "Jun", count: 6000 },
  { month: "July", count: 5200 },
];

// 3. User Distribution Donut Chart Data
const distributionData = [
  { name: "Student", percentage: 35, color: "#57154D" },
  { name: "Teacher", percentage: 10, color: "#0C4A6E" },
  { name: "Parent", percentage: 25, color: "#93C5FD" },
  { name: "Company", percentage: 15, color: "#CBD5E1" },
  { name: "Industry Professional", percentage: 15, color: "#D97706" },
];

export default function Overview(): React.ReactElement {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedPeriod, setSelectedPeriod] = useState("July-Dec");

  return (
    <div className="space-y-6  pb-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Performance Analytics
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Comprehensive metrics for finance and platform.
          </p>
        </div>

        {/* Date Filter Dropdown (shadcn Select Component) */}
        <div className="shrink-0">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="inline-flex items-center gap-2 px-3.5 py-5 cursor-pointer bg-white rounded-lg border border-gray-200/80 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-[#57154D]/30 h-auto">
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <SelectItem value="2026" className="font-semibold text-xs sm:text-sm cursor-pointer">
                2026
              </SelectItem>
              <SelectItem value="2025" className="font-semibold text-xs sm:text-sm cursor-pointer">
                2025
              </SelectItem>
              <SelectItem value="2024" className="font-semibold text-xs sm:text-sm cursor-pointer">
                2024
              </SelectItem>
              <SelectItem value="2023" className="font-semibold text-xs sm:text-sm cursor-pointer">
                2023
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 5 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200/50 rounded-lg p-5 shadow-2xs flex flex-col justify-between hover:bg-white transition-all duration-200"
          >
            <div>
              {/* Icon Container in soft magenta #F3E8F2 with primary icon color #57154D */}
              <div className="w-10 h-10 rounded-lg bg-[#F3E8F2] flex items-center justify-center text-[#57154D]">
                <Users className="w-5 h-5" />
              </div>

              {/* Uppercase Metric Label */}
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mt-4">
                {card.label}
              </p>

              {/* Large Bold Metric Value */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Total User Bar Chart */}
        <div className="lg:col-span-8 bg-white border border-gray-200/50 rounded-lg p-6 shadow-2xs flex flex-col justify-between">
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Total User</h3>
              <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
                46,650
              </p>
            </div>

            {/* Header Right Actions (shadcn Select Component) */}
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-lg bg-[#F3E8F2] flex items-center justify-center text-[#57154D]">
                <Activity className="w-4 h-4 text-[#57154D]" />
              </div>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="inline-flex items-center gap-1.5 px-3 py-5  border border-gray-300/40 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-200/70 transition-colors focus:ring-2 focus:ring-[#57154D]/30 h-auto">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <SelectItem value="July-Dec" className="font-semibold text-xs cursor-pointer">
                    July-Dec
                  </SelectItem>
                  <SelectItem value="Jan-Jun" className="font-semibold text-xs cursor-pointer">
                    Jan-Jun
                  </SelectItem>
                  <SelectItem value="Full Year 2026" className="font-semibold text-xs cursor-pointer">
                    Full Year 2026
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userBarData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barSize={42}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 3500, 7000, 10500, 14000]}
                  domain={[0, 14000]}
                  tickFormatter={(val) => (val === 0 ? "0k" : `${val / 1000}k`)}
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(val: number) => [val.toLocaleString(), "Users"]}
                />
                <Bar dataKey="count" radius={[12, 12, 12, 12]}>
                  {userBarData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isHighlight ? "#57154D" : "#E2E2E5"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Card: User Distribution Donut Chart */}
        <div className="lg:col-span-4 bg-white border border-gray-200/50 rounded-lg p-6 shadow-2xs flex flex-col justify-between">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              User Distribution
            </h3>
            <div className="w-11 h-11 rounded-lg bg-[#F3E8F2] flex items-center justify-center text-[#57154D]">
              <Users className="w-4 h-4 text-[#57154D]" />
            </div>
          </div>

          {/* Donut Chart Container */}
          <div className="h-[210px] w-full flex items-center justify-center my-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="percentage"
                  stroke="none"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, "Share"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Items List */}
          <div className="space-y-2 pt-3 border-t border-gray-200/60">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="text-gray-900 font-bold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}