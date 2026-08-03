"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  FileText,
  RotateCcw,
  Save,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import TipTapEditor from "@/TipTapEditor/TipTapEditor";

type LegalTab = "Terms & Conditions" | "Privacy Policy";

const defaultTerms = `<h3>1. Introduction</h3>
<p>Welcome to Modulix Market. By accessing our platform, you agree to these terms. Please read them carefully.</p>

<h3>2. Service Usage</h3>
<p>Our platform connects suppliers with businesses for bulk purchasing. You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
<ul>
  <li>You must provide accurate account information.</li>
  <li>You are responsible for maintaining the confidentiality of your account.</li>
  <li>Unauthorized use of the platform is strictly prohibited.</li>
</ul>

<h3>3. Orders & Payments</h3>
<p>All orders are subject to acceptance and availability. Prices are subject to change without notice. We reserve the right to refuse service to anyone.</p>

<h3>4. Intellectual Property</h3>
<p>All content included on this site, such as text, graphics, logos, images, is the property of the company and protected by copyright laws.</p>`;

const defaultPrivacy = `<h3>1. Information We Collect</h3>
<p>We collect information you provide directly to us when creating an account, making a transaction, or communicating with support.</p>

<h3>2. How We Use Information</h3>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send related updates.</p>

<h3>3. Data Protection & Security</h3>
<p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration.</p>

<h3>4. Your Rights & Choices</h3>
<p>You have the right to access, update, or request deletion of your personal data at any time through your account settings or by contacting our team.</p>`;

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<LegalTab>("Terms & Conditions");
  const [termsContent, setTermsContent] = useState(defaultTerms);
  const [privacyContent, setPrivacyContent] = useState(defaultPrivacy);

  const handleReset = () => {
    if (activeTab === "Terms & Conditions") {
      setTermsContent(defaultTerms);
    } else {
      setPrivacyContent(defaultPrivacy);
    }
    toast.success(`${activeTab} reset to default`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${activeTab} saved successfully!`);
  };

  const currentContent =
    activeTab === "Terms & Conditions" ? termsContent : privacyContent;

  const setCurrentContent = (val: string) => {
    if (activeTab === "Terms & Conditions") {
      setTermsContent(val);
    } else {
      setPrivacyContent(val);
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Legal Content Management
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Edit the legal documents displayed to your users.
        </p>
      </div>

      {/* Main Legal Card Container */}
      <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-300/60 rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Top Tab Bar */}
        <div className="flex items-center border-b border-gray-300">
          <button
            type="button"
            onClick={() => setActiveTab("Terms & Conditions")}
            className={`px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "Terms & Conditions"
                ? "border-[#57154D] text-[#57154D] bg-purple-50/50 rounded-t-lg"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <FileText className="w-4 h-4 text-[#57154D]" />
            <span>Terms & Conditions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("Privacy Policy")}
            className={`px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "Privacy Policy"
                ? "border-[#57154D] text-[#57154D] bg-purple-50/50 rounded-t-lg"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-gray-500" />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Tip Box */}
        <div className="bg-[#FEF3C7]/80 border border-amber-300 rounded-lg p-4 text-xs font-semibold text-amber-900 flex items-center gap-2.5 shadow-2xs">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Tip: You can use rich text formatting (bold, italics, underline, lists). Editing in <strong className="font-bold text-amber-950">TipTap Rich Text</strong> mode.
          </span>
        </div>

        {/* TipTap Rich Text Editor Box */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
            <TipTapEditor
              description={currentContent}
              handleJobDescription={setCurrentContent}
              minHeight="280px"
              maxHeight="450px"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-gray-500" />
              <span>Reset to Default</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}