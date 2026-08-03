"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const revenueExpensesData = [
    { month: "Jan", revenue: 145000, expenses: 95000 },
    { month: "Feb", revenue: 170000, expenses: 110000 },
    { month: "Mar", revenue: 195000, expenses: 130000 },
    { month: "Apr", revenue: 225000, expenses: 145000 },
    { month: "May", revenue: 265000, expenses: 165000 },
    { month: "Jun", revenue: 285000, expenses: 180000 },
];

export default function RevenueChart() {
    return (
        <div className="lg:col-span-8 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-bold text-gray-900">Revenue & Expenses</h2>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Last 6 months</p>
                </div>

                {/* Custom Legend */}
                <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#6B21A8]" />
                        <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-gray-400" />
                        <span>Expenses</span>
                    </div>
                </div>
            </div>

            <div className="h-[250px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={revenueExpensesData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6B21A8" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#6B21A8" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#D4D4D8" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            ticks={[0, 75000, 150000, 225000, 300000]}
                            domain={[0, 300000]}
                            tickFormatter={(val) => `$${val / 1000}K`}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E5E7EB",
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                            formatter={(val: number) => [`$${val.toLocaleString()}`, ""]}
                        />

                        {/* Expenses Line */}
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#9CA3AF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#expensesGrad)"
                        />

                        {/* Revenue Line */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6B21A8"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#revenueGrad)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}