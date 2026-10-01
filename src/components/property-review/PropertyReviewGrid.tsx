"use client";

import React from "react";
import { Eye, MapPin, User } from "lucide-react";
import { PropertySubmission, ReviewStatus } from "./types";

interface PropertyReviewGridProps {
  properties: PropertySubmission[];
  activeTab: "All" | ReviewStatus;
  setSelectedProperty: (property: PropertySubmission) => void;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

export default function PropertyReviewGrid({
  properties,
  activeTab,
  setSelectedProperty,
  handleApprove,
  handleReject,
}: PropertyReviewGridProps) {
  if (properties.length === 0) {
    return (
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-10 text-center text-gray-500 font-medium">
        No properties in &quot;{activeTab}&quot; state.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((prop) => (
        <div
          key={prop.id}
          className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg overflow-hidden shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="relative h-44 w-full bg-gray-300">
              <img
                src={prop.imageUrl}
                alt={prop.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${prop.status === "Pending Review"
                  ? "bg-amber-500 text-white"
                  : prop.status === "Approved"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  }`}
              >
                {prop.status}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#8E25E3] tracking-wider uppercase">
                  {prop.id}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-snug">{prop.title}</h3>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1 font-normal">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{prop.address}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 text-xs">
                <div>
                  <span className="text-gray-500 font-normal">Units:</span>{" "}
                  <span className="font-semibold text-gray-900">{prop.units} Units</span>
                </div>
                <div>
                  <span className="text-gray-500 font-normal">Est. Rent:</span>{" "}
                  <span className="font-semibold text-[#8E25E3]">${prop.monthlyRent}/mo</span>
                </div>
                <div className="col-span-2 text-gray-600 flex items-center gap-1 font-normal">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>Manager: <strong className="font-semibold text-gray-900">{prop.managerName}</strong></span>
                </div>
              </div>
            </div>
          </div>


          <div className="p-4 bg-[#EBEBEB] border-t border-gray-300/60 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setSelectedProperty(prop)}
              className="px-3 py-2 bg-white hover:bg-gray-100 border border-gray-300/80 rounded-md text-xs font-medium text-gray-700 flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Preview</span>
            </button>

            {prop.status === "Pending Review" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleReject(prop.id)}
                  className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs rounded-md cursor-pointer"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(prop.id)}
                  className="px-3.5 py-2 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
