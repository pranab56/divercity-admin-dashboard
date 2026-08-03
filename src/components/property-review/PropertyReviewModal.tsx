"use client";

import React from "react";
import { X } from "lucide-react";
import { PropertySubmission } from "./types";

interface PropertyReviewModalProps {
  property: PropertySubmission | null;
  onClose: () => void;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}

export default function PropertyReviewModal({
  property,
  onClose,
  handleApprove,
  handleReject,
}: PropertyReviewModalProps) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p><strong>Address:</strong> {property.address}</p>
          <p><strong>Owner:</strong> {property.ownerName}</p>
          <p><strong>Assigned Manager:</strong> {property.managerName}</p>
          <p><strong>Total Units:</strong> {property.units}</p>
          <p><strong>Average Rent:</strong> ${property.monthlyRent} / month</p>
          <p><strong>Submission Date:</strong> {property.submittedDate}</p>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
          {property.status === "Pending Review" && (
            <>
              <button
                type="button"
                onClick={() => handleReject(property.id)}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs rounded-md cursor-pointer"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleApprove(property.id)}
                className="px-4 py-2 bg-[#8E25E3] hover:bg-[#781dc6] text-white font-semibold text-xs rounded-md cursor-pointer"
              >
                Approve Property
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
