"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { SettingsTab } from "@/components/settings/types";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabNavigation from "@/components/settings/SettingsTabNavigation";
import GeneralSettingsTab from "@/components/settings/GeneralSettingsTab";
import SecuritySettingsTab from "@/components/settings/SecuritySettingsTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");

  // General Settings Form State
  const [platformName, setPlatformName] = useState("ProjexPro");
  const [supportEmail, setSupportEmail] = useState("support@projexpro.com");
  const [emailAddress, setEmailAddress] = useState("admin@projexpro.com");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 234-5678");
  const [houseAddress, setHouseAddress] = useState("1200 Market Street, Suite 400, Austin, TX");

  const handleSaveChanges = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SettingsHeader onSaveChanges={() => handleSaveChanges()} />

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Tab Navigation */}
        <SettingsTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Right Side Content Box */}
        {activeTab === "General" ? (
          <GeneralSettingsTab
            platformName={platformName}
            setPlatformName={setPlatformName}
            supportEmail={supportEmail}
            setSupportEmail={setSupportEmail}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            houseAddress={houseAddress}
            setHouseAddress={setHouseAddress}
            onSave={handleSaveChanges}
          />
        ) : (
          <SecuritySettingsTab />
        )}
      </div>
    </div>
  );
}