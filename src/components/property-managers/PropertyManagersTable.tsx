"use client";

import React from "react";
import { Edit, Eye, Mail, MapPin, Trash2 } from "lucide-react";
import { PlanType, PropertyPartner } from "./types";

interface PropertyManagersTableProps {
  partners: PropertyPartner[];
  setViewPartner: (partner: PropertyPartner) => void;
  setEditPartner: (partner: PropertyPartner) => void;
  setDeletePartner: (partner: PropertyPartner) => void;
}

export default function PropertyManagersTable({
  partners,
  setViewPartner,
  setEditPartner,
  setDeletePartner,
}: PropertyManagersTableProps) {
  const getPlanBadgeStyle = (plan: PlanType) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-[#8E25E3]";
      case "Professional":
        return "bg-blue-100 text-blue-700";
      case "Starter":
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300/80 text-gray-500 text-xs font-semibold">
              <th className="py-4 px-5 font-medium">ID</th>
              <th className="py-4 px-5 font-medium">Property Name / Location</th>
              <th className="py-4 px-5 font-medium">Point of Contact</th>
              <th className="py-4 px-5 font-medium">No of Units</th>
              <th className="py-4 px-5 font-medium">Plan</th>
              <th className="py-4 px-5 font-medium">Status</th>
              <th className="py-4 px-5 font-medium">Payment Type</th>
              <th className="py-4 px-5 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300/60 text-xs font-medium text-gray-800">
            {partners.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500 font-medium">
                  No property accounts found matching your search.
                </td>
              </tr>
            ) : (
              partners.map((item) => (
                <tr key={item.id} className="hover:bg-gray-200/50 transition-colors">
                  {/* ID */}
                  <td className="py-4 px-5 font-bold text-[#8E25E3]">
                    {item.id}
                  </td>

                  {/* Property Name / Location */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-snug">{item.propertyName}</p>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </td>

                  {/* Point of Contact */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-bold text-gray-900">{item.contactName}</p>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{item.contactEmail}</span>
                      </p>
                    </div>
                  </td>

                  {/* No of Units */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="font-bold text-gray-900 text-base leading-none">{item.noOfUnits}</p>
                      <span className="text-[11px] text-gray-500 font-normal">properties</span>
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold inline-block ${getPlanBadgeStyle(
                        item.plan
                      )}`}
                    >
                      {item.plan}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${item.status === "Active"
                          ? "bg-emerald-500"
                          : item.status === "Pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                          }`}
                      />
                      <span
                        className={
                          item.status === "Active"
                            ? "text-emerald-600"
                            : item.status === "Pending"
                              ? "text-amber-600"
                              : "text-red-600"
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Payment Type */}
                  <td className="py-4 px-5 text-gray-600 font-normal">
                    {item.paymentType}
                  </td>

                  {/* Actions (View, Edit, Delete) */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => setViewPartner(item)}
                        className="p-2 bg-[#EBEBEB] hover:bg-[#EBEBEB] border border-gray-300/80 rounded-md text-gray-600 hover:text-[#8E25E3] transition-colors cursor-pointer"
                        title="View Partner Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => setEditPartner(item)}
                        className="p-2 bg-[#EBEBEB] hover:bg-[#EBEBEB] border border-gray-300/80 rounded-md text-gray-600 hover:text-[#8E25E3] transition-colors cursor-pointer"
                        title="Edit Partner"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setDeletePartner(item)}
                        className="p-2 bg-[#EBEBEB] hover:bg-[#EBEBEB] border border-gray-300/80 rounded-md text-gray-600 hover:text-[#8E25E3] transition-colors cursor-pointer"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
