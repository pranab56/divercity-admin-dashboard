"use client";

import React from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PartnerStatus, PlanType, PropertyPartner } from "./types";

interface EditPartnerModalProps {
  partner: PropertyPartner | null;
  setPartner: (partner: PropertyPartner | null) => void;
  onSave: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function EditPartnerModal({
  partner,
  setPartner,
  onSave,
  onClose,
}: EditPartnerModalProps) {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={onSave}
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-base font-bold text-gray-900">Edit Partner Account</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Property Name</label>
            <input
              type="text"
              value={partner.propertyName}
              onChange={(e) => setPartner({ ...partner, propertyName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Plan</label>
            <Select
              value={partner.plan}
              onValueChange={(val) => setPartner({ ...partner, plan: val as PlanType })}
            >
              <SelectTrigger className="w-full bg-[#EBEBEB] border-gray-300/60 rounded-md h-11 py-5 text-xs font-medium text-gray-700 cursor-pointer">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Status</label>
            <Select
              value={partner.status}
              onValueChange={(val) => setPartner({ ...partner, status: val as PartnerStatus })}
            >
              <SelectTrigger className="w-full bg-[#EBEBEB] border-gray-300/60 rounded-md h-11 py-5 text-xs font-medium text-gray-700 cursor-pointer">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold text-xs rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#8E25E3] text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
