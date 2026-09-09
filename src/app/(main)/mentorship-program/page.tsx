"use client";

import React, { useState } from "react";
import {
    Archive,
    ArrowLeft,
    ArrowRight,
    Briefcase,
    Calendar,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock,
    Globe,
    Handshake,
    Hash,
    Info,
    Mail,
    MoreHorizontal,
    Pencil,
    Phone,
    Plus,
    RotateCcw,
    Search,
    ShieldCheck,
    Sparkles,
    Star,
    User,
    Users,
    X,
    XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TopTab = "Program" | "Applications" | "Match Mentors";
type ApplicationFilter = "All" | "Mentor" | "Mentee";

type ApplicantItem = {
    id: string;
    name: string;
    applicantRole: string;
    type: "Mentor" | "Mentee";
    organisation: string;
    email: string;
    status: "PENDING" | "MATCHED" | "REJECTED";
    appliedDate: string;
    avatarInitial: string;
};

type MatchPair = {
    id: string;
    mentor: {
        name: string;
        role: string;
        initials: string;
        avatarBg: string;
        skills: string[];
        interests: string;
        availability: string;
    };
    mentee: {
        name: string;
        role: string;
        initials: string;
        avatarBg: string;
        skills: string[];
        interests: string;
        availability: string;
    };
};

const initialApplicants: ApplicantItem[] = [
    {
        id: "app-1",
        name: "Amina Hassan",
        applicantRole: "Mentor applicant",
        type: "Mentor",
        organisation: "Kite & Co.",
        email: "amina@kiteco.io",
        status: "PENDING",
        appliedDate: "12 Jun 2024",
        avatarInitial: "AH",
    },
    {
        id: "app-2",
        name: "Amina Hassan",
        applicantRole: "Mentor applicant",
        type: "Mentor",
        organisation: "Kite & Co.",
        email: "amina@kiteco.io",
        status: "PENDING",
        appliedDate: "12 Jun 2024",
        avatarInitial: "AH",
    },
    {
        id: "app-3",
        name: "Amina Hassan",
        applicantRole: "Mentor applicant",
        type: "Mentee",
        organisation: "Kite & Co.",
        email: "amina@kiteco.io",
        status: "MATCHED",
        appliedDate: "12 Jun 2024",
        avatarInitial: "AH",
    },
    {
        id: "app-4",
        name: "Tomi Adeyemi",
        applicantRole: "Mentee applicant",
        type: "Mentor",
        organisation: "Kite & Co.",
        email: "amina@kiteco.io",
        status: "PENDING",
        appliedDate: "12 Jun 2024",
        avatarInitial: "TA",
    },
    {
        id: "app-5",
        name: "Amina Hassan",
        applicantRole: "Mentor applicant",
        type: "Mentee",
        organisation: "Kite & Co.",
        email: "amina@kiteco.io",
        status: "REJECTED",
        appliedDate: "12 Jun 2024",
        avatarInitial: "AH",
    },
];

const initialMatchPairs: MatchPair[] = [
    {
        id: "pair-1",
        mentor: {
            name: "Amina Hassan",
            role: "Director of Product · Kite & Co.",
            initials: "AH",
            avatarBg: "bg-emerald-200/80 text-emerald-800",
            skills: ["Product strategy", "Leadership", "Startups"],
            interests:
                "Building resilient product teams and scaling meaningful, people-centred digital products.",
            availability: "2 hours / month · Weekday evenings",
        },
        mentee: {
            name: "David Osei",
            role: "Product designer · Northstar Labs",
            initials: "DO",
            avatarBg: "bg-indigo-200/80 text-indigo-800",
            skills: ["Design systems", "Product thinking", "Career growth"],
            interests:
                "Building resilient product teams and scaling meaningful, people-centred digital products.",
            availability: "2 hours / month · Weekday evenings",
        },
    },
    {
        id: "pair-2",
        mentor: {
            name: "Amina Hassan",
            role: "Director of Product · Kite & Co.",
            initials: "AH",
            avatarBg: "bg-emerald-200/80 text-emerald-800",
            skills: ["Product strategy", "Leadership", "Startups"],
            interests:
                "Building resilient product teams and scaling meaningful, people-centred digital products.",
            availability: "2 hours / month · Weekday evenings",
        },
        mentee: {
            name: "David Osei",
            role: "Product designer · Northstar Labs",
            initials: "DO",
            avatarBg: "bg-indigo-200/80 text-indigo-800",
            skills: ["Design systems", "Product thinking", "Career growth"],
            interests:
                "Building resilient product teams and scaling meaningful, people-centred digital products.",
            availability: "2 hours / month · Weekday evenings",
        },
    },
];

export default function MentorshipProgramPage() {
    const [activeTab, setActiveTab] = useState<TopTab>("Program");
    const [appFilter, setAppFilter] = useState<ApplicationFilter>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isProgramPublished, setIsProgramPublished] = useState(true);

    // Applications Data
    const [applicants, setApplicants] = useState<ApplicantItem[]>(initialApplicants);
    const [selectedApplicant, setSelectedApplicant] = useState<ApplicantItem | null>(null);

    // Match Pairs Data
    const [matchPairs, setMatchPairs] = useState<MatchPair[]>(initialMatchPairs);
    const [showCreateMatchModal, setShowCreateMatchModal] = useState(false);
    const [selectedMentorForMatch, setSelectedMentorForMatch] = useState("Amina Hassan (Director of Product)");
    const [selectedMenteeForMatch, setSelectedMenteeForMatch] = useState("David Osei (Product designer)");

    // Detail Modal Types
    const [detailModalType, setDetailModalType] = useState<"mentor" | "mentee" | "org" | null>(null);

    const toggleProgramPublish = () => {
        setIsProgramPublished(!isProgramPublished);
        toast.success(
            isProgramPublished
                ? "Mentorship program unpublished"
                : "Mentorship program published!"
        );
    };

    const updateApplicantStatus = (id: string, status: "PENDING" | "MATCHED" | "REJECTED") => {
        setApplicants((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        toast.success(`Application status updated to ${status}`);
    };

    const handleCreateMatchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPair: MatchPair = {
            id: `pair-${Date.now()}`,
            mentor: {
                name: selectedMentorForMatch.split(" (")[0] || "Amina Hassan",
                role: "Director of Product · Kite & Co.",
                initials: "AH",
                avatarBg: "bg-emerald-200/80 text-emerald-800",
                skills: ["Product strategy", "Leadership", "Startups"],
                interests: "Building resilient product teams and scaling meaningful, people-centred digital products.",
                availability: "2 hours / month · Weekday evenings",
            },
            mentee: {
                name: selectedMenteeForMatch.split(" (")[0] || "David Osei",
                role: "Product designer · Northstar Labs",
                initials: "DO",
                avatarBg: "bg-indigo-200/80 text-indigo-800",
                skills: ["Design systems", "Product thinking", "Career growth"],
                interests: "Building resilient product teams and scaling meaningful, people-centred digital products.",
                availability: "2 hours / month · Weekday evenings",
            },
        };
        setMatchPairs((prev) => [newPair, ...prev]);
        toast.success("New mentor-mentee match created!");
        setShowCreateMatchModal(false);
    };

    const filteredApplicants = applicants.filter((app) => {
        const matchesFilter = appFilter === "All" || app.type === appFilter;
        const matchesSearch =
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Top Pill Tab Switcher (Centered) */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#E2E2E5] rounded-lg border border-gray-200/60 shadow-2xs">
                    <button
                        type="button"
                        onClick={() => setActiveTab("Program")}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === "Program"
                            ? "bg-purple-100 text-[#57154D] font-bold shadow-2xs"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                        <span>Program</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("Applications")}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === "Applications"
                            ? "bg-purple-100 text-[#57154D] font-bold shadow-2xs"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                        <span>Applications</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("Match Mentors")}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === "Match Mentors"
                            ? "bg-purple-100 text-[#57154D] font-bold shadow-2xs"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <Handshake className="w-4 h-4 text-[#57154D]" />
                        <span>Match Mentors</span>
                    </button>
                </div>
            </div>

            {/* Main Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        {activeTab === "Match Mentors" ? "Match Mentors" : "Mentorship program"}
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                        {activeTab === "Match Mentors"
                            ? "Review fit signals and create intentional mentor-mentee pairs."
                            : "Set the details and opening window for this mentorship cycle."}
                    </p>
                </div>

                {activeTab !== "Match Mentors" && (
                    <button
                        type="button"
                        onClick={toggleProgramPublish}
                        className="px-5 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                    >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>{isProgramPublished ? "Unpublish program" : "Publish program"}</span>
                    </button>
                )}
            </div>

            {/* --- TAB 1: PROGRAM TAB (Image 1) --- */}
            {activeTab === "Program" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Left 2 Cols: Current Cycle Card */}
                    <div className="lg:col-span-2 bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                                    CURRENT CYCLE
                                </span>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                                    DIIC Mentorship Programme 2024
                                </h2>
                            </div>
                            <div className="px-3 py-1 bg-[#D1FAE5] text-[#059669] rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0">
                                <span className="w-2 h-2 rounded-full bg-[#059669]" />
                                <span>PUBLISHED</span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200/80" />

                        {/* Dates Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                                    OPENING DATE
                                </span>
                                <div className="flex items-center gap-2.5 mt-2 text-sm font-bold text-gray-900">
                                    <Calendar className="w-4 h-4 text-[#57154D]" />
                                    <span>Monday, 17 June 2024</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                                    CLOSING DATE
                                </span>
                                <div className="flex items-center gap-2.5 mt-2 text-sm font-bold text-gray-900">
                                    <Calendar className="w-4 h-4 text-[#57154D]" />
                                    <span>Friday, 26 July 2024</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-200/80" />

                        {/* Program Description */}
                        <div className="space-y-2">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                                PROGRAM DESCRIPTION
                            </span>
                            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                                A six-week professional exchange for ambitious emerging leaders. Mentors and mentees are paired around shared growth goals, industry experience and time availability.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => toast.success("Edit program details modal opened")}
                                className="px-4 py-2 bg-white/80 hover:bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-800 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
                            >
                                <Pencil className="w-3.5 h-3.5 text-gray-600" />
                                <span>Edit details</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => toast.success("Program archived")}
                                className="px-4 py-2 text-gray-500 hover:text-gray-900 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                            >
                                <Archive className="w-3.5 h-3.5 text-gray-500" />
                                <span>Archive program</span>
                            </button>
                        </div>
                    </div>

                    {/* Right 1 Col: Predefined Forms Card */}
                    <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-6 sm:p-8 shadow-2xs space-y-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-[#57154D]">
                            <ShieldCheck className="w-5 h-5 text-[#57154D]" />
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Predefined forms
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                                Publishing this program automatically activates the predefined Mentor, Mentee application forms.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div
                                onClick={() => setDetailModalType("mentor")}
                                className="bg-white/80 hover:bg-white border border-gray-200/80 rounded-lg p-4 flex items-center justify-between font-bold text-gray-800 text-xs sm:text-sm shadow-2xs cursor-pointer transition-all hover:border-[#57154D]"
                            >
                                <span>Mentor application</span>
                                <Check className="w-4 h-4 text-[#059669]" />
                            </div>

                            <div
                                onClick={() => setDetailModalType("mentee")}
                                className="bg-white/80 hover:bg-white border border-gray-200/80 rounded-lg p-4 flex items-center justify-between font-bold text-gray-800 text-xs sm:text-sm shadow-2xs cursor-pointer transition-all hover:border-[#57154D]"
                            >
                                <span>Mentee application</span>
                                <Check className="w-4 h-4 text-[#059669]" />
                            </div>

                            <div
                                onClick={() => setDetailModalType("org")}
                                className="bg-white/80 hover:bg-white border border-gray-200/80 rounded-lg p-4 flex items-center justify-between font-bold text-gray-800 text-xs sm:text-sm shadow-2xs cursor-pointer transition-all hover:border-[#57154D]"
                            >
                                <span>Organisation partnership enquiry</span>
                                <Check className="w-4 h-4 text-[#059669]" />
                            </div>
                        </div>

                        <p className="text-[11px] text-gray-400 font-medium italic">
                            Forms are system-managed and cannot be edited here.
                        </p>
                    </div>
                </div>
            )}

            {/* --- TAB 2: APPLICATIONS TAB (Image 2) --- */}
            {activeTab === "Applications" && (
                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 sm:p-6 shadow-2xs space-y-6">
                    {/* Applications Top Control Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Filter Pills */}
                        <div className="inline-flex items-center gap-1.5 p-1 bg-[#E2E2E5] rounded-full border border-gray-200/60 shadow-2xs">
                            {(["All", "Mentor", "Mentee"] as ApplicationFilter[]).map((f) => {
                                const isActive = appFilter === f;
                                return (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setAppFilter(f)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${isActive
                                            ? "bg-[#57154D] text-white shadow-xs"
                                            : "text-gray-700 hover:text-gray-900"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search name or company"
                                    className="w-full pl-10 pr-4 py-2 bg-[#E8E8EB] border border-gray-300/40 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table of Applications */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                            <thead>
                                <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                                    <th className="py-4 px-4">APPLICANT</th>
                                    <th className="py-4 px-4">APPLICATION TYPE</th>
                                    <th className="py-4 px-4">ORGANISATION</th>
                                    <th className="py-4 px-4">EMAIL</th>
                                    <th className="py-4 px-4">STATUS</th>
                                    <th className="py-4 px-4">APPLIED DATE</th>
                                    <th className="py-4 px-4 text-right">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
                                {filteredApplicants.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                                            No applications found matching filters.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredApplicants.map((app) => (
                                        <tr key={app.id} className="hover:bg-white/60 transition-colors">
                                            {/* APPLICANT */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#57154D] font-bold text-xs flex items-center justify-center shrink-0">
                                                        {app.avatarInitial}
                                                    </div>
                                                    <div>
                                                        <h4
                                                            onClick={() => {
                                                                setSelectedApplicant(app);
                                                                setDetailModalType(
                                                                    app.type === "Mentor" ? "mentor" : "mentee"
                                                                );
                                                            }}
                                                            className="font-bold text-gray-900 text-xs sm:text-sm hover:underline cursor-pointer"
                                                        >
                                                            {app.name}
                                                        </h4>
                                                        <p className="text-[11px] text-gray-400 font-medium">
                                                            {app.applicantRole}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* APPLICATION TYPE */}
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 bg-[#E2E2E5] text-[#57154D] rounded-full text-xs font-bold inline-block">
                                                    {app.type}
                                                </span>
                                            </td>

                                            {/* ORGANISATION */}
                                            <td className="py-4 px-4 text-gray-700 font-semibold text-xs">
                                                {app.organisation}
                                            </td>

                                            {/* EMAIL */}
                                            <td className="py-4 px-4 text-gray-600 font-medium text-xs">
                                                {app.email}
                                            </td>

                                            {/* STATUS */}
                                            <td className="py-4 px-4">
                                                {app.status === "MATCHED" ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D1FAE5] text-[#059669] rounded-full text-[11px] font-bold">
                                                        <span className="w-2 h-2 rounded-full bg-[#059669]" />
                                                        <span>MATCHED</span>
                                                    </div>
                                                ) : app.status === "PENDING" ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#D97706] rounded-full text-[11px] font-bold">
                                                        <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                                                        <span>PENDING</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-full text-[11px] font-bold">
                                                        <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                                                        <span>REJECTED</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* APPLIED DATE */}
                                            <td className="py-4 px-4 text-gray-600 font-medium text-xs">
                                                {app.appliedDate}
                                            </td>

                                            {/* ACTION */}
                                            <td className="py-4 px-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44 bg-white border border-gray-200/80 rounded-lg shadow-2xl z-50 p-1.5 text-left space-y-0.5">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedApplicant(app);
                                                                setDetailModalType(
                                                                    app.type === "Mentor" ? "mentor" : "mentee"
                                                                );
                                                            }}
                                                            className="px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <User className="w-4 h-4 text-[#57154D]" />
                                                            <span>View Application</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => updateApplicantStatus(app.id, "MATCHED")}
                                                            className="px-3 py-2 text-xs font-semibold text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                                                            <span>Mark Matched</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => updateApplicantStatus(app.id, "REJECTED")}
                                                            className="px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <XCircle className="w-4 h-4 text-[#DC2626]" />
                                                            <span>Reject Application</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Row */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>

                        {[1, 2, 3, 4, 5, 6, "...", 10].map((pageItem, idx) => {
                            if (pageItem === "...") {
                                return (
                                    <span key={idx} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-gray-500">
                                        ...
                                    </span>
                                );
                            }
                            const isSelected = currentPage === pageItem;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => typeof pageItem === "number" && setCurrentPage(pageItem)}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${isSelected
                                        ? "bg-[#57154D] text-white shadow-xs"
                                        : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80"
                                        }`}
                                >
                                    {pageItem}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* --- TAB 3: MATCH MENTORS TAB (Exact Match to Images 1 & 2) --- */}
            {activeTab === "Match Mentors" && (
                <div className="space-y-6">
                    {/* Cosmic Galaxy Rationale Banner */}
                    <div className="relative overflow-hidden rounded-lg p-6 sm:p-7 bg-[#2E0B28] text-white border border-[#57154D]/50 shadow-xl">
                        {/* Cosmic background glows */}
                        <div className="absolute -right-10 -top-10 w-96 h-96 bg-gradient-to-bl from-pink-500/30 via-purple-600/30 to-transparent rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-gradient-to-tr from-purple-800/40 to-pink-600/20 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1 max-w-2xl">
                                <span className="text-[10px] font-bold text-pink-300 tracking-widest uppercase">
                                    MATCH RATIONALE
                                </span>
                                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                                    Strong alignment on product leadership and career transition goals, with overlapping availability.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowCreateMatchModal(true)}
                                className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                                <Plus className="w-4 h-4 text-gray-900" />
                                <span>Create match</span>
                            </button>
                        </div>
                    </div>

                    {/* List of Match Pairs */}
                    <div className="space-y-6">
                        {matchPairs.map((pair) => (
                            <div
                                key={pair.id}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 relative"
                            >
                                {/* Left Card: SELECTED MENTOR */}
                                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-6 sm:p-7 shadow-2xs space-y-4">
                                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                        SELECTED MENTOR
                                    </span>

                                    {/* Profile Info */}
                                    <div className="flex items-center gap-3.5">
                                        <div
                                            className={`w-11 h-11 rounded-full ${pair.mentor.avatarBg} font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                                        >
                                            {pair.mentor.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base">
                                                {pair.mentor.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {pair.mentor.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* SKILLS */}
                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            SKILLS
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {pair.mentor.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3.5 py-1.5 bg-[#E8E8EB] text-[#57154D] rounded-full text-xs font-bold"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CAREER INTERESTS */}
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            CAREER INTERESTS
                                        </span>
                                        <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                                            {pair.mentor.interests}
                                        </p>
                                    </div>

                                    {/* AVAILABILITY */}
                                    <div className="space-y-1 pt-1 border-t border-gray-200/70">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            AVAILABILITY
                                        </span>
                                        <p className="text-xs text-gray-900 font-bold">
                                            {pair.mentor.availability}
                                        </p>
                                    </div>
                                </div>

                                {/* Central Shield Bridge Icon */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-purple-100 border border-purple-200 items-center justify-center text-[#57154D] z-10 shadow-sm">
                                    <ShieldCheck className="w-5 h-5 text-[#57154D]" />
                                </div>

                                {/* Right Card: SELECTED MENTEE */}
                                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-6 sm:p-7 shadow-2xs space-y-4">
                                    <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                        SELECTED MENTEE
                                    </span>

                                    {/* Profile Info */}
                                    <div className="flex items-center gap-3.5">
                                        <div
                                            className={`w-11 h-11 rounded-full ${pair.mentee.avatarBg} font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                                        >
                                            {pair.mentee.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base">
                                                {pair.mentee.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {pair.mentee.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* SKILLS */}
                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            SKILLS
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {pair.mentee.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3.5 py-1.5 bg-[#E8E8EB] text-[#57154D] rounded-full text-xs font-bold"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CAREER INTERESTS */}
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            CAREER INTERESTS
                                        </span>
                                        <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                                            {pair.mentee.interests}
                                        </p>
                                    </div>

                                    {/* AVAILABILITY */}
                                    <div className="space-y-1 pt-1 border-t border-gray-200/70">
                                        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                            AVAILABILITY
                                        </span>
                                        <p className="text-xs text-gray-900 font-bold">
                                            {pair.mentee.availability}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Row */}
                    <div className="flex items-center justify-center gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>

                        {[1, 2, 3, 4, 5, 6, "...", 10].map((pageItem, idx) => {
                            if (pageItem === "...") {
                                return (
                                    <span key={idx} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-gray-500">
                                        ...
                                    </span>
                                );
                            }
                            const isSelected = currentPage === pageItem;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => typeof pageItem === "number" && setCurrentPage(pageItem)}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${isSelected
                                        ? "bg-[#57154D] text-white shadow-xs"
                                        : "bg-[#EBEBEB] text-gray-700 hover:bg-gray-300/80"
                                        }`}
                                >
                                    {pageItem}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                            className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* --- MODAL: NEW MANUAL MATCH MODAL (Match Mentors - Image 2) --- */}
            {showCreateMatchModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 border border-gray-300/60 relative">
                        <div className="flex items-start justify-between border-b border-gray-200/60 pb-3">
                            <div>
                                <span className="text-[10px] font-bold text-purple-700 tracking-wider uppercase block">
                                    NEW MANUAL MATCH
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                                    Who would you like to match?
                                </h3>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    Select one approved mentor and one approved mentee to create a new pairing.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateMatchModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateMatchSubmit} className="space-y-4">
                            {/* MENTOR */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                                    MENTOR
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedMentorForMatch}
                                        onChange={(e) => setSelectedMentorForMatch(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 cursor-pointer"
                                    >
                                        <option value="Amina Hassan (Director of Product)">
                                            Amina Hassan (Director of Product · Kite & Co.)
                                        </option>
                                        <option value="Ayesha Rahman (Senior Product Manager)">
                                            Ayesha Rahman (Senior Product Manager · Grameenphone)
                                        </option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            {/* Central Shield Bridge Icon */}
                            <div className="flex justify-center my-1">
                                <div className="w-9 h-9 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-[#57154D]">
                                    <ShieldCheck className="w-4 h-4 text-[#57154D]" />
                                </div>
                            </div>

                            {/* MENTEE */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                                    MENTEE
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedMenteeForMatch}
                                        onChange={(e) => setSelectedMenteeForMatch(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-200 rounded-lg text-xs sm:text-sm font-semibold text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 cursor-pointer"
                                    >
                                        <option value="David Osei (Product designer)">
                                            David Osei (Product designer · Northstar Labs)
                                        </option>
                                        <option value="Tariq Hossain (Early-career engineer)">
                                            Tariq Hossain (Early-career engineer)
                                        </option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200/60">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateMatchModal(false)}
                                    className="px-5 py-2.5 bg-transparent hover:bg-gray-200/50 rounded-lg text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Create match</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- DETAIL MODAL 1: ORGANISATION PARTNERSHIP ENQUIRY (Image 3) --- */}
            {detailModalType === "org" && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-gray-300/60 relative max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-gray-200/80 pb-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Organisation partnership enquiry
                                </h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    For companies and institutions who want to bring this programme to their people.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-semibold text-gray-400">
                                    Submitted 8 July 2025
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setDetailModalType(null)}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Card 1: ORGANISATION DETAILS */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                ORGANISATION DETAILS
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        ORGANISATION NAME
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                                        <span>Digital Innovation & Incubation Centre (DIIC)</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            INDUSTRY OR SECTOR
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Briefcase className="w-4 h-4 text-[#57154D]" />
                                            <span>Technology & Innovation</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            ORGANISATION SIZE
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Hash className="w-4 h-4 text-[#57154D]" />
                                            <span>51–250</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        WEBSITE
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Globe className="w-4 h-4 text-[#57154D]" />
                                        <a
                                            href="https://diic.bd"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline text-gray-900"
                                        >
                                            https://diic.bd
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: MAIN CONTACT */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                MAIN CONTACT
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        NAME
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <User className="w-4 h-4 text-[#57154D]" />
                                        <span>Nadia Islam</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        ROLE / TITLE
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                                        <span>Head of Programmes</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        EMAIL
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Mail className="w-4 h-4 text-[#57154D]" />
                                        <span>nadia.islam@diic.bd</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        PHONE
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Phone className="w-4 h-4 text-[#57154D]" />
                                        <span>+880 2 9876543</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: PARTNERSHIP INTEREST */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                PARTNERSHIP INTEREST
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        HOW WOULD YOU LIKE TO GET INVOLVED?
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Sparkles className="w-4 h-4 text-[#57154D]" />
                                        <span>Sponsor the programme</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        ROUGHLY HOW MANY PEOPLE MIGHT TAKE PART?
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Users className="w-4 h-4 text-[#57154D]" />
                                        <span>30</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        ANYTHING ELSE WE SHOULD KNOW?
                                    </span>
                                    <div className="flex items-start gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                                        <Info className="w-4 h-4 text-[#57154D] shrink-0 mt-0.5" />
                                        <span>
                                            We are keen to integrate this mentorship programme into our annual fellowship cohort. We can also provide venue space for in-person sessions.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2 text-xs font-bold text-[#059669]">
                                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                                    <span>Agreed to the programme&apos;s terms and conditions.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DETAIL MODAL 2: MENTEE APPLICATION (Image 4) --- */}
            {detailModalType === "mentee" && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-gray-300/60 relative max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-gray-200/80 pb-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Mentee application
                                </h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    For people looking for guidance from someone who&apos;s been there.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-semibold text-gray-400">
                                    Submitted 10 July 2025
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setDetailModalType(null)}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Card 1: ABOUT YOU */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                ABOUT YOU
                            </span>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            FULL NAME
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <User className="w-4 h-4 text-[#57154D]" />
                                            <span>{selectedApplicant ? selectedApplicant.name : "Tariq Hossain"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            PREFERRED NAME
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <User className="w-4 h-4 text-[#57154D]" />
                                            <span>Tariq</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            EMAIL
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Mail className="w-4 h-4 text-[#57154D]" />
                                            <span>
                                                {selectedApplicant
                                                    ? selectedApplicant.email
                                                    : "tariq.hossain@example.com"}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            PHONE
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Phone className="w-4 h-4 text-[#57154D]" />
                                            <span>+880 181 987 6543</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        CURRENT ROLE OR SITUATION
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                                        <span>Early-career software engineer, 2 years experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: WHAT YOU'RE LOOKING FOR */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                WHAT YOU&apos;RE LOOKING FOR
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        WHAT WOULD YOU LIKE SUPPORT WITH?
                                    </span>
                                    <div className="flex items-start gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                                        <Info className="w-4 h-4 text-[#57154D] shrink-0 mt-0.5" />
                                        <span>
                                            Building confidence in technical interviews, navigating the transition from junior to mid-level engineer, and improving communication skills with stakeholders.
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        PREFERRED MENTOR BACKGROUND OR INDUSTRY
                                    </span>
                                    <div className="flex items-start gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Star className="w-4 h-4 text-[#57154D] shrink-0 mt-0.5" />
                                        <span>Senior software engineer or tech lead with experience in product-driven companies</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        HOW OFTEN WOULD YOU LIKE TO MEET?
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Calendar className="w-4 h-4 text-[#57154D]" />
                                        <span>Weekly</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: A LITTLE MORE */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                A LITTLE MORE
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        WHAT WOULD SUCCESS LOOK LIKE FOR YOU IN THIS MENTORSHIP?
                                    </span>
                                    <div className="flex items-start gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                                        <Sparkles className="w-4 h-4 text-[#57154D] shrink-0 mt-0.5" />
                                        <span>
                                            Landing a mid-level role at a well-regarded tech company and feeling confident presenting ideas to non-technical audiences.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2 text-xs font-bold text-[#059669]">
                                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                                    <span>
                                        Agreed to the programme&apos;s code of conduct and understands mentors are volunteers.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DETAIL MODAL 3: MENTOR APPLICATION (Image 5) --- */}
            {detailModalType === "mentor" && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-gray-300/60 relative max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-gray-200/80 pb-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Mentor application
                                </h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    For people who want to guide someone through their next step.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-semibold text-gray-400">
                                    Submitted 12 July 2025
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setDetailModalType(null)}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Card 1: ABOUT YOU */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                ABOUT YOU
                            </span>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            FULL NAME
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <User className="w-4 h-4 text-[#57154D]" />
                                            <span>{selectedApplicant ? selectedApplicant.name : "Ayesha Rahman"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            PREFERRED NAME
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <User className="w-4 h-4 text-[#57154D]" />
                                            <span>Ayesha</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            EMAIL
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Mail className="w-4 h-4 text-[#57154D]" />
                                            <span>
                                                {selectedApplicant
                                                    ? selectedApplicant.email
                                                    : "ayesha.rahman@example.com"}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            PHONE
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Phone className="w-4 h-4 text-[#57154D]" />
                                            <span>+880 171 234 5678</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        CURRENT ROLE AND ORGANISATION
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                                        <span>Senior Product Manager at Grameenphone</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        LINKEDIN OR PORTFOLIO LINK
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Globe className="w-4 h-4 text-[#57154D]" />
                                        <a
                                            href="https://linkedin.com/in/ayesha-rahman"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline text-gray-900"
                                        >
                                            https://linkedin.com/in/ayesha-rahman
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: MENTORING EXPERIENCE */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                MENTORING EXPERIENCE
                            </span>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            YEARS OF PROFESSIONAL EXPERIENCE
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <Clock className="w-4 h-4 text-[#57154D]" />
                                            <span>8–15 years</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                            HAVE YOU MENTORED BEFORE?
                                        </span>
                                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                            <RotateCcw className="w-4 h-4 text-[#57154D]" />
                                            <span>Yes, formally</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        AREAS YOU CAN MENTOR IN
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Briefcase className="w-4 h-4 text-[#57154D]" />
                                        <span>Career transitions, product management, public speaking, leadership development</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: AVAILABILITY */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                AVAILABILITY
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        HOW OFTEN CAN YOU MEET A MENTEE?
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Calendar className="w-4 h-4 text-[#57154D]" />
                                        <span>Fortnightly</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        HOW MANY MENTEES COULD YOU TAKE ON?
                                    </span>
                                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900">
                                        <Users className="w-4 h-4 text-[#57154D]" />
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: A LITTLE MORE */}
                        <div className="bg-[#E5E5E8] border border-gray-300/40 rounded-lg p-5 sm:p-6 space-y-4">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
                                A LITTLE MORE
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                        WHY DO YOU WANT TO MENTOR?
                                    </span>
                                    <div className="flex items-start gap-2 mt-1 text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                                        <Info className="w-4 h-4 text-[#57154D] shrink-0 mt-0.5" />
                                        <span>
                                            I want to give back to the community that supported me early in my career. Guiding others through the challenges I&apos;ve faced is deeply rewarding.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2 text-xs font-bold text-[#059669]">
                                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                                    <span>
                                        Agreed to the programme&apos;s code of conduct and mentor guidelines.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}