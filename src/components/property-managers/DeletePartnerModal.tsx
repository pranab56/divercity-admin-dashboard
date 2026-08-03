"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { PropertyPartner } from "./types";

interface DeletePartnerModalProps {
  partner: PropertyPartner | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeletePartnerModal({
  partner,
  onConfirm,
  onClose,
}: DeletePartnerModalProps) {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Delete Property Partner?</h3>
        <p className="text-xs text-gray-500">
          Are you sure you want to delete <strong>{partner.propertyName}</strong> ({partner.id})? This action cannot be undone.
        </p>
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-semibold text-xs rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer"
          >
            Delete Partner
          </button>
        </div>
      </div>
    </div>
  );
}
