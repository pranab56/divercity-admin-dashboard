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
import { ServiceRequestItem } from "./types";

interface JobRateModalProps {
  job: ServiceRequestItem | null;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  assignedContractor: string;
  setAssignedContractor: (contractor: string) => void;
  isSpecializedRateActive: boolean;
  setIsSpecializedRateActive: (active: boolean) => void;
  paymentType: "Percentage" | "Flat Amount";
  setPaymentType: (type: "Percentage" | "Flat Amount") => void;
  rateValue: string;
  setRateValue: (val: string) => void;
  selectedReason: string;
  setSelectedReason: (reason: string) => void;
}

export default function JobRateModal({
  job,
  onClose,
  onSave,
  assignedContractor,
  setAssignedContractor,
  isSpecializedRateActive,
  setIsSpecializedRateActive,
  paymentType,
  setPaymentType,
  rateValue,
  setRateValue,
  selectedReason,
  setSelectedReason,
}: JobRateModalProps) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={onSave}
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <span className="text-xs font-bold text-[#8E25E3]">{job.id}</span>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{job.issue}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <span className="text-gray-400 font-medium">Property:</span>
            <p className="font-semibold text-gray-900 mt-0.5">{job.property}</p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Category:</span>
            <p className="font-semibold text-gray-900 mt-0.5">{job.type}</p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Priority:</span>
            <p className="font-semibold text-gray-900 mt-0.5">{job.priority}</p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Base Pay Rate:</span>
            <p className="font-bold text-[#8E25E3] mt-0.5">${job.basePay}</p>
          </div>
        </div>

        {/* Assign Contractor */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Assign Contractor
          </label>
          <Select value={assignedContractor} onValueChange={setAssignedContractor}>
            <SelectTrigger className="w-full bg-[#EBEBEB] border-gray-300/60 rounded-md h-11 text-xs font-medium text-gray-700 cursor-pointer">
              <SelectValue placeholder="Select Contractor" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
              <SelectItem value="Unassigned">Unassigned</SelectItem>
              <SelectItem value="Mike Chen">Mike Chen (Plumbing)</SelectItem>
              <SelectItem value="Nina Patel">Nina Patel (Electrical)</SelectItem>
              <SelectItem value="Lisa Park">Lisa Park (HVAC)</SelectItem>
              <SelectItem value="Tom Wilson">Tom Wilson (Painting)</SelectItem>
              <SelectItem value="Alex Kumar">Alex Kumar (Cleaning)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specialized Job Rate Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-purple-50/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-gray-900">Specialized Job Rate</h4>
              <p className="text-[11px] text-gray-500 font-normal">
                Apply custom bonus or rate adjustment for emergency/hazardous work.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isSpecializedRateActive}
              onChange={(e) => setIsSpecializedRateActive(e.target.checked)}
              className="w-4 h-4 accent-[#8E25E3] cursor-pointer"
            />
          </div>

          {isSpecializedRateActive && (
            <div className="space-y-3 pt-2 border-t border-gray-200">
              {/* Type Switcher */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType("Percentage")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${paymentType === "Percentage"
                    ? "bg-[#8E25E3] text-white border-[#8E25E3]"
                    : "bg-white text-gray-700 border-gray-300"
                    }`}
                >
                  Percentage (%)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType("Flat Amount")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${paymentType === "Flat Amount"
                    ? "bg-[#8E25E3] text-white border-[#8E25E3]"
                    : "bg-white text-gray-700 border-gray-300"
                    }`}
                >
                  Flat Bonus ($)
                </button>
              </div>

              {/* Rate Value Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {paymentType === "Percentage" ? "Bonus Percentage (%)" : "Bonus Amount ($)"}
                </label>
                <input
                  type="number"
                  placeholder={paymentType === "Percentage" ? "e.g. 15" : "e.g. 75"}
                  value={rateValue}
                  onChange={(e) => setRateValue(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#8E25E3]/40 focus:outline-none"
                />
              </div>

              {/* Reason Dropdown (shadcn UI Select) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reason for Specialized Rate
                </label>
                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger className="w-full bg-[#EBEBEB] border-gray-300/60 rounded-md h-11 text-xs font-medium text-gray-700 cursor-pointer">
                    <SelectValue placeholder="Select Reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-md">
                    <SelectItem value="Emergency Callout">Emergency Callout</SelectItem>
                    <SelectItem value="After-Hours Work">After-Hours Work</SelectItem>
                    <SelectItem value="Hazardous Condition">Hazardous Condition</SelectItem>
                    <SelectItem value="High Priority Rush">High Priority Rush</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold text-xs rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#8E25E3] text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer"
          >
            Save & Update Job
          </button>
        </div>
      </form>
    </div>
  );
}
