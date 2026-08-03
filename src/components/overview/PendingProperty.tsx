"use client";

import { Building2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


const initialPendingProperties = [
    {
        id: 1,
        name: "Cedar Ridge Villas",
        company: "Anderson LLC · Residential",
    },
    {
        id: 2,
        name: "Westpark Commercial",
        company: "Westpark Grp · Commercial",
    },
    {
        id: 3,
        name: "Lakeside Studio",
        company: "J. Morrison · Mixed-Use",
    },
    {
        id: 4,
        name: "Elmwood Heights",
        company: "Elmwood Prop. · Residential",
    },
];

export default function PendingProperty() {

    const [pendingProperties, setPendingProperties] = useState(initialPendingProperties);

    const handleApproveProperty = (id: number, name: string) => {
        setPendingProperties((prev) => prev.filter((p) => p.id !== id));
        toast.success(`${name} approved successfully!`);
    };

    const handleRejectProperty = (id: number, name: string) => {
        setPendingProperties((prev) => prev.filter((p) => p.id !== id));
        toast.error(`${name} rejected.`);
    };

    return (
        <div className="lg:col-span-6 bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Pending Property Approvals</h2>
                <span className="px-2.5 py-1 rounded-full bg-amber-100/60 text-amber-500 text-xs font-bold">
                    {pendingProperties.length} pending
                </span>
            </div>

            <div className="space-y-3">
                {pendingProperties.length === 0 ? (
                    <div className="p-6 text-center text-xs font-medium text-gray-500">
                        All property approvals are up to date!
                    </div>
                ) : (
                    pendingProperties.map((p) => (
                        <div
                            key={p.id}
                            className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-3.5 flex items-center justify-between transition-colors shadow-2xs"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-blue-100/80 text-blue-600 shrink-0">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{p.name}</h3>
                                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">{p.company}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => handleApproveProperty(p.id, p.name)}
                                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 font-medium text-xs rounded-sm transition-colors cursor-pointer"
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRejectProperty(p.id, p.name)}
                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-medium text-xs rounded-sm transition-colors cursor-pointer"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}