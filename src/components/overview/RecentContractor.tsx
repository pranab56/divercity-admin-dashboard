"use client";

import Link from "next/link";


const initialContractors = [
    {
        id: 1,
        initials: "JO",
        name: "James Okafor",
        type: "Plumbing",
        applied: "Jun 26, 2026",
        status: "Pending",
        statusBg: "bg-amber-100/80 text-amber-700",
    },
    {
        id: 2,
        initials: "NP",
        name: "Nina Patel",
        type: "Electrical",
        applied: "Jun 25, 2026",
        status: "Pending",
        statusBg: "bg-amber-100/80 text-amber-700",
    },
    {
        id: 3,
        initials: "CR",
        name: "Carlos Rivera",
        type: "HVAC",
        applied: "Jun 24, 2026",
        status: "Under Review",
        statusBg: "bg-blue-100/80 text-blue-700",
    },
    {
        id: 4,
        initials: "SK",
        name: "Sarah Kim",
        type: "General",
        applied: "Jun 23, 2026",
        status: "Approved",
        statusBg: "bg-emerald-100/80 text-emerald-700",
    },
];

export default function RecentContractor() {
    return (
        <div className="lg:col-span-6 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Recent Contractor Registrations</h2>
                <Link
                    href="/provider-applicants"
                    className="text-xs font-semibold text-[#8E25E3] hover:underline"
                >
                    View all
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-300/80 text-gray-500 text-xs font-medium pb-2">
                            <th className="pb-3 font-medium">Contractor</th>
                            <th className="pb-3 font-medium">Type</th>
                            <th className="pb-3 font-medium">Applied</th>
                            <th className="pb-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300/50 text-xs font-semibold">
                        {initialContractors.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-200/40 transition-colors">
                                <td className="py-3.5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-[#E1D4F4] text-[#8E25E3] font-bold text-[11px] flex items-center justify-center">
                                            {c.initials}
                                        </div>
                                        <span className="text-gray-900 font-bold">{c.name}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 text-gray-600 font-normal">{c.type}</td>
                                <td className="py-3.5 text-gray-500 font-normal">{c.applied}</td>
                                <td className="py-3.5">
                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${c.statusBg}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}