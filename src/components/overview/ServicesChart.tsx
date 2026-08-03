"use client";

import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


const servicesData = [
    { service: "Plumbing", count: 33, color: "#6B21A8" },
    { service: "Electrical", count: 28, color: "#F59E0B" },
    { service: "HVAC", count: 22, color: "#22C55E" },
    { service: "Painting", count: 15, color: "#3B82F6" },
    { service: "Cleaning", count: 11, color: "#EF4444" },
];


export default function ServicesChart() {
    return (
        <div className="lg:col-span-4 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div>
                <h2 className="text-base font-bold text-gray-900">Request by Services</h2>
                <p className="text-xs text-gray-500 font-medium mt-0.5">This month</p>
            </div>

            <div className="h-[210px] w-full my-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={servicesData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        barSize={12}
                    >
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            ticks={[0, 9, 18, 27, 36]}
                            domain={[0, 36]}
                            tick={{ fill: "#6B7280", fontSize: 11 }}
                        />
                        <YAxis
                            type="category"
                            dataKey="service"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                            width={70}
                        />
                        <Tooltip
                            formatter={(val: number) => [`${val} requests`, "Count"]}
                        />
                        <Bar dataKey="count" radius={[6, 6, 6, 6]}>
                            {servicesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-gray-300/60 flex items-center justify-between text-sm font-semibold">
                <span className="text-gray-500">Total requests</span>
                <span className="text-gray-900 font-bold text-lg">112</span>
            </div>
        </div>
    )
}