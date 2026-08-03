"use client";

import React from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  Phone,
  Shield,
  Star,
  Wrench,
  XCircle,
} from "lucide-react";
import { ProviderApplicantItem } from "./types";

interface ProviderApplicantsListProps {
  applicants: ProviderApplicantItem[];
  expandedCardId: string | null;
  toggleExpand: (id: string) => void;
  handleApprove: (id: string, name: string) => void;
  handleReject: (id: string, name: string) => void;
  handleActionRequired: (id: string, name: string) => void;
}

export default function ProviderApplicantsList({
  applicants,
  expandedCardId,
  toggleExpand,
  handleApprove,
  handleReject,
  handleActionRequired,
}: ProviderApplicantsListProps) {
  if (applicants.length === 0) {
    return (
      <div className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg p-10 text-center text-gray-500 font-medium">
        No provider applications match the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applicants.map((item) => {
        const isExpanded = expandedCardId === item.id;
        return (
          <div
            key={item.id}
            className="bg-[#EBEBEB] border border-gray-300/50 rounded-lg overflow-hidden shadow-xs transition-all duration-200"
          >
            {/* Main Row */}
            <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Avatar & Applicant Metadata */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Avatar Circle */}
                <div
                  className={`w-11 h-11 rounded-full ${item.avatarBg} ${item.avatarColor} font-bold text-sm flex items-center justify-center shrink-0`}
                >
                  {item.avatarChar}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {item.name}
                    </h3>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : item.status === "Under Review"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>

                    {/* Rating if approved */}
                    {item.rating && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>
                    )}
                  </div>

                  {/* Subtitle with icons */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 font-normal mt-1">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-gray-500" />
                      <span>
                        {item.trade} · {item.experienceYears} years
                      </span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>{item.email}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{item.phone}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>Applied {item.appliedDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {item.status === "Pending" || item.status === "Under Review" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id, item.name)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-md shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(item.id, item.name)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium text-xs rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>

                    {item.id === "PROV-101" && (
                      <button
                        type="button"
                        onClick={() => handleActionRequired(item.id, item.name)}
                        className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-[#8E25E3] font-medium text-xs rounded-md transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Action Required</span>
                      </button>
                    )}
                  </>
                ) : null}

                {/* Toggle Expand Details */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="px-3.5 py-2 bg-white/80 hover:bg-white border border-gray-300/80 text-gray-800 font-medium text-xs rounded-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Details</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Smooth Animated Grid Expansion */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${isExpanded
                  ? "grid-rows-[1fr] opacity-100 border-t border-gray-300/70"
                  : "grid-rows-[0fr] opacity-0 border-t-0"
                }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/70 rounded-lg p-5 border border-gray-200/80 shadow-2xs">
                    {/* Left: About & License */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">About</h4>
                        <p className="text-xs text-gray-600 font-normal leading-relaxed">
                          {item.aboutText}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          LICENSE NUMBER
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 border border-gray-300/80 rounded-md text-xs font-mono font-bold text-gray-900 inline-block">
                          {item.licenseNumber}
                        </span>
                      </div>
                    </div>

                    {/* Right: Documents Submitted */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-3">
                        Documents Submitted
                      </h4>
                      <div className="space-y-2.5">
                        {item.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="px-3.5 py-2.5 bg-white border border-gray-200/90 rounded-md flex items-center justify-between shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5 text-xs font-medium text-gray-800">
                              <FileText className="w-4 h-4 text-[#8E25E3]" />
                              <span>{doc.title}</span>
                            </div>
                            {doc.verified && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
