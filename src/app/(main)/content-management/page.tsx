"use client";

import React, { useState, useRef } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    FileText,
    HelpCircle,
    MoreHorizontal,
    Pencil,
    Play,
    Plus,
    Search,
    Trash2,
    UploadCloud,
    Video,
    X,
    XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import TipTapEditor from "@/TipTapEditor/TipTapEditor";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ContentTab = "All Content" | "Career Exploration" | "Quizzes" | "Videos";

type ContentItem = {
    id: string;
    title: string;
    type: "Career" | "Quiz" | "Video";
    category: string;
    status: "published" | "draft";
    date: string;
    icon: "file" | "quiz";
};

type VideoApprovalItem = {
    id: string;
    title: string;
    subtitle: string;
    uploaderName: string;
    uploaderInitial: string;
    uploadDate: string;
    duration: string;
    status: "Approved" | "Pending" | "Rejected";
    thumbBg: string;
};

const initialContentList: ContentItem[] = [
    {
        id: "cnt-1",
        title: "Career Paths in Civil Engineering",
        type: "Career",
        category: "Career Exploration",
        status: "published",
        date: "2026-05-20",
        icon: "file",
    },
    {
        id: "cnt-2",
        title: "Basic Construction Tools Quiz",
        type: "Quiz",
        category: "Skills Assessment",
        status: "published",
        date: "2026-05-18",
        icon: "quiz",
    },
    {
        id: "cnt-3",
        title: "Diversity in Construction Industry",
        type: "Career",
        category: "Career Exploration",
        status: "published",
        date: "2026-05-15",
        icon: "file",
    },
    {
        id: "cnt-4",
        title: "Basic Construction Tools Quiz",
        type: "Quiz",
        category: "Skills Assessment",
        status: "published",
        date: "2026-05-25",
        icon: "quiz",
    },
];

const initialVideoList: VideoApprovalItem[] = [
    {
        id: "vid-1",
        title: "Women in Construction – Inspiring Stories",
        subtitle: "National Build Forum",
        uploaderName: "National Build Forum",
        uploaderInitial: "N",
        uploadDate: "21 Feb 2025",
        duration: "24:18",
        status: "Approved",
        thumbBg: "bg-purple-600",
    },
    {
        id: "vid-2",
        title: "Digital Tools for Site Managers",
        subtitle: "Okafor Site Solutions",
        uploaderName: "Rita Okafor",
        uploaderInitial: "R",
        uploadDate: "22 Feb 2025",
        duration: "9:55",
        status: "Pending",
        thumbBg: "bg-[#00838F]",
    },
    {
        id: "vid-3",
        title: "Concrete Mix Design – Advanced Techniques",
        subtitle: "Consolidated Building Group",
        uploaderName: "Consolidated Building Group",
        uploaderInitial: "C",
        uploadDate: "23 Feb 2025",
        duration: "15:30",
        status: "Approved",
        thumbBg: "bg-slate-700",
    },
    {
        id: "vid-4",
        title: "Reading Construction Blueprints for Beginners",
        subtitle: "Chen Drafting Services",
        uploaderName: "Jamie Chen",
        uploaderInitial: "J",
        uploadDate: "24 Feb 2025",
        duration: "22:10",
        status: "Pending",
        thumbBg: "bg-rose-600",
    },
    {
        id: "vid-5",
        title: "Apprenticeship Program – Electrical Trades 2025",
        subtitle: "PowerGrid Australia",
        uploaderName: "PowerGrid Australia",
        uploaderInitial: "P",
        uploadDate: "25 Feb 2025",
        duration: "6:48",
        status: "Rejected",
        thumbBg: "bg-purple-700",
    },
    {
        id: "vid-6",
        title: "Career Pathways in Structural Engineering",
        subtitle: "Torres & Partners",
        uploaderName: "Dr. Alan Torres",
        uploaderInitial: "D",
        uploadDate: "26 Feb 2025",
        duration: "18:02",
        status: "Pending",
        thumbBg: "bg-emerald-700",
    },
];

export default function ContentManagementPage() {
    const [activeTab, setActiveTab] = useState<ContentTab>("All Content");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Content list & Video list state
    const [contentList, setContentList] = useState<ContentItem[]>(initialContentList);
    const [videoList, setVideoList] = useState<VideoApprovalItem[]>(initialVideoList);
    const [videoStatusFilter, setVideoStatusFilter] = useState("All Status");

    // Modals state
    const [showAddChoiceModal, setShowAddChoiceModal] = useState(false);
    const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);
    const [showUploadArticleModal, setShowUploadArticleModal] = useState(false);

    // Quiz Form state
    const [quizTitle, setQuizTitle] = useState("");
    const [quizSubtitle, setQuizSubtitle] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [questionTime, setQuestionTime] = useState("5 Min");
    const [options, setOptions] = useState([
        { text: "Option 1", isCorrect: true },
        { text: "Option 2", isCorrect: false },
        { text: "Option 3", isCorrect: false },
        { text: "Option 4", isCorrect: false },
    ]);

    // Article & Local Video Upload state
    const [contentType, setContentType] = useState("Career Exploration");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

    // Handle local file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processSelectedFile(file);
        }
    };

    const processSelectedFile = (file: File) => {
        // Validate file size (< 100MB)
        if (file.size > 100 * 1024 * 1024) {
            toast.error("File size must be less than 100MB");
            return;
        }

        setSelectedFile(file);
        if (file.type.startsWith("video/")) {
            const url = URL.createObjectURL(file);
            setVideoPreviewUrl(url);
        } else {
            setVideoPreviewUrl(null);
        }
        toast.success(`Selected file: ${file.name}`);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveSelectedFile = () => {
        if (videoPreviewUrl) {
            URL.revokeObjectURL(videoPreviewUrl);
        }
        setSelectedFile(null);
        setVideoPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCreateQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quizTitle.trim()) {
            toast.error("Please enter a quiz title");
            return;
        }
        const newQuiz: ContentItem = {
            id: `cnt-${Date.now()}`,
            title: quizTitle.trim(),
            type: "Quiz",
            category: "Skills Assessment",
            status: "published",
            date: new Date().toISOString().split("T")[0],
            icon: "quiz",
        };
        setContentList((prev) => [newQuiz, ...prev]);
        toast.success("Quiz created and published for review!");
        setQuizTitle("");
        setQuizSubtitle("");
        setShowCreateQuizModal(false);
    };

    const handleUploadArticleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!articleTitle.trim()) {
            toast.error("Please enter an article title");
            return;
        }

        const isVideo = selectedFile?.type.startsWith("video/");
        const newArticle: ContentItem = {
            id: `cnt-${Date.now()}`,
            title: articleTitle.trim(),
            type: isVideo ? "Video" : "Career",
            category: contentType,
            status: "published",
            date: new Date().toISOString().split("T")[0],
            icon: "file",
        };
        setContentList((prev) => [newArticle, ...prev]);
        toast.success(
            `${selectedFile ? (isVideo ? "Video" : "File") : "Article"} uploaded and published for review!`
        );
        setArticleTitle("");
        setArticleContent("");
        handleRemoveSelectedFile();
        setShowUploadArticleModal(false);
    };

    const handleDeleteContent = (id: string) => {
        setContentList((prev) => prev.filter((item) => item.id !== id));
        toast.success("Content item removed");
    };

    const updateVideoStatus = (id: string, status: "Approved" | "Pending" | "Rejected") => {
        setVideoList((prev) =>
            prev.map((v) => (v.id === id ? { ...v, status } : v))
        );
        toast.success(`Video status updated to ${status}`);
    };

    const filteredContent = contentList.filter((item) => {
        const matchesSearch = item.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        if (activeTab === "Career Exploration") {
            return matchesSearch && item.type === "Career";
        }
        if (activeTab === "Quizzes") {
            return matchesSearch && item.type === "Quiz";
        }
        return matchesSearch;
    });

    const filteredVideos = videoList.filter((v) => {
        if (videoStatusFilter === "All Status") return true;
        return v.status === videoStatusFilter;
    });

    return (
        <div className="space-y-8 pb-12">
            {/* Top Header & Section Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        {activeTab === "Videos" ? "Video Approval" : "Content Management"}
                    </h1>
                    {activeTab === "Videos" && (
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            Review and moderate submitted videos before publishing.
                        </p>
                    )}
                </div>

                {/* Top Right Header Actions */}
                {activeTab === "Videos" ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">

                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowAddChoiceModal(true)}
                        className="px-6 py-3 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4 text-white" />
                        <span>Add Content</span>
                    </button>
                )}
            </div>

            {/* Video Filters Row if Videos Tab active */}
            {activeTab === "Videos" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Filters:
                        </span>
                        <Select value={videoStatusFilter} onValueChange={setVideoStatusFilter}>
                            <SelectTrigger className="w-[150px] bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 shadow-2xs h-9 px-3">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <SelectItem value="All Status" className="font-semibold text-xs cursor-pointer">
                                    All Status
                                </SelectItem>
                                <SelectItem value="Approved" className="font-semibold text-xs cursor-pointer">
                                    Approved
                                </SelectItem>
                                <SelectItem value="Pending" className="font-semibold text-xs cursor-pointer">
                                    Pending
                                </SelectItem>
                                <SelectItem value="Rejected" className="font-semibold text-xs cursor-pointer">
                                    Rejected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            {/* Tabs Navigation Row */}
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#E2E2E5] rounded-lg border border-gray-300/80 shadow-2xs">
                {(["All Content", "Career Exploration", "Quizzes", "Videos"] as ContentTab[]).map(
                    (tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                                    ? "bg-white text-gray-900 shadow-2xs"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
                                    }`}
                            >
                                {tab}
                            </button>
                        );
                    }
                )}
            </div>

            {/* --- CONTENT TAB VIEW (All Content / Career / Quizzes) --- */}
            {activeTab !== "Videos" && (
                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-300/60 rounded-lg p-5 sm:p-6 shadow-2xs space-y-5">
                    {/* Search bar inside container with clear border */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search content..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs font-medium"
                        />
                    </div>

                    {/* Table of Content Items */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="border-b border-gray-200/80 text-gray-900 text-xs sm:text-sm font-bold">
                                    <th className="py-4 px-4">Title</th>
                                    <th className="py-4 px-4">Type</th>
                                    <th className="py-4 px-4">Category</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Date</th>
                                    <th className="py-4 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-semibold text-gray-800">
                                {filteredContent.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                                            No content items found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredContent.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/60 transition-colors">
                                            {/* Title */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    {item.icon === "file" ? (
                                                        <FileText className="w-4 h-4 text-gray-700 shrink-0" />
                                                    ) : (
                                                        <HelpCircle className="w-4 h-4 text-gray-700 shrink-0" />
                                                    )}
                                                    <span className="font-medium text-gray-900">{item.title}</span>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="py-4 px-4 text-gray-600 font-medium">{item.type}</td>

                                            {/* Category */}
                                            <td className="py-4 px-4 text-gray-600 font-medium">{item.category}</td>

                                            {/* Status */}
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 bg-black text-white rounded-sm text-xs font-semibold inline-block">
                                                    {item.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="py-4 px-4 text-gray-600 font-medium">{item.date}</td>

                                            {/* Actions */}
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (item.type === "Quiz") {
                                                                setQuizTitle(item.title);
                                                                setShowCreateQuizModal(true);
                                                            } else {
                                                                setArticleTitle(item.title);
                                                                setShowUploadArticleModal(true);
                                                            }
                                                        }}
                                                        className="p-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteContent(item.id)}
                                                        className="p-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
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
            )}

            {/* --- VIDEOS TAB VIEW (Video Approval) --- */}
            {activeTab === "Videos" && (
                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-300/60 rounded-lg p-5 sm:p-6 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[750px]">
                            <thead>
                                <tr className="border-b border-gray-200/80 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                                    <th className="py-4 px-4">VIDEO</th>
                                    <th className="py-4 px-4">UPLOADED BY</th>
                                    <th className="py-4 px-4">UPLOAD DATE</th>
                                    <th className="py-4 px-4">DURATION</th>
                                    <th className="py-4 px-4">STATUS</th>
                                    <th className="py-4 px-4 text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 text-xs sm:text-sm font-medium">
                                {filteredVideos.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                                            No video items matching filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVideos.map((vid) => (
                                        <tr key={vid.id} className="hover:bg-white/60 transition-colors">
                                            {/* VIDEO */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-14 h-10 rounded-lg ${vid.thumbBg} flex items-center justify-center text-white shrink-0 shadow-xs`}
                                                    >
                                                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 text-xs sm:text-sm leading-snug">
                                                            {vid.title}
                                                        </h4>
                                                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                                                            {vid.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* UPLOADED BY */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-full bg-gray-200/80 text-gray-700 font-bold text-xs flex items-center justify-center">
                                                        {vid.uploaderInitial}
                                                    </div>
                                                    <span className="font-medium text-gray-900 text-xs sm:text-sm">
                                                        {vid.uploaderName}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* UPLOAD DATE */}
                                            <td className="py-4 px-4 text-gray-600 font-medium text-xs">
                                                {vid.uploadDate}
                                            </td>

                                            {/* DURATION */}
                                            <td className="py-4 px-4 text-gray-600 font-medium text-xs">
                                                {vid.duration}
                                            </td>

                                            {/* STATUS */}
                                            <td className="py-4 px-4">
                                                {vid.status === "Approved" ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D1FAE5] text-[#059669] rounded-full text-xs font-bold">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        <span>Approved</span>
                                                    </div>
                                                ) : vid.status === "Pending" ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF3C7] text-[#D97706] rounded-full text-xs font-bold">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>Pending</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-full text-xs font-bold">
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        <span>Rejected</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="py-4 px-4 text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center outline-none">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-44 bg-[#F4F4F6] border border-gray-200/80 rounded-lg shadow-2xl z-50 p-1.5 text-left space-y-0.5">
                                                        <DropdownMenuItem
                                                            onClick={() => updateVideoStatus(vid.id, "Approved")}
                                                            className="px-3 py-2 text-xs font-semibold text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                                                            <span>Approve</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => updateVideoStatus(vid.id, "Rejected")}
                                                            className="px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <XCircle className="w-4 h-4 text-[#DC2626]" />
                                                            <span>Reject</span>
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
                </div>
            )}

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

            {/* --- ADD CHOICE MODAL --- */}
            {showAddChoiceModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 border border-gray-300 relative text-center">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowAddChoiceModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            What would you like to create?
                        </h3>

                        <div className="space-y-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddChoiceModal(false);
                                    setShowCreateQuizModal(true);
                                }}
                                className="w-full py-3.5 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                            >
                                <HelpCircle className="w-4 h-4" />
                                <span>Create Quiz</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddChoiceModal(false);
                                    setShowUploadArticleModal(true);
                                }}
                                className="w-full py-3.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                            >
                                <UploadCloud className="w-4 h-4 text-gray-600" />
                                <span>Upload Article / Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL 1: CREATE QUIZ MODAL --- */}
            {showCreateQuizModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 border border-gray-300 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-300/80 pb-3">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                    Create Quiz
                                </h3>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    Create interactive quizzes for your users.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateQuizModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateQuizSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                        TITLE
                                    </label>
                                    <input
                                        type="text"
                                        value={quizTitle}
                                        onChange={(e) => setQuizTitle(e.target.value)}
                                        placeholder="e.g. Basic Construction Tools Quiz"
                                        className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all font-medium"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                        SUBTITLE
                                    </label>
                                    <input
                                        type="text"
                                        value={quizSubtitle}
                                        onChange={(e) => setQuizSubtitle(e.target.value)}
                                        placeholder="e.g. Test your knowledge"
                                        className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-700">Question 1</span>
                                    <div className="w-32">
                                        <Select value={questionTime} onValueChange={setQuestionTime}>
                                            <SelectTrigger className="w-full bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 h-9 px-3">
                                                <SelectValue placeholder="Time" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-xl z-[9999]">
                                                <SelectItem value="1 Min" className="text-xs font-semibold">1 Min</SelectItem>
                                                <SelectItem value="3 Min" className="text-xs font-semibold">3 Min</SelectItem>
                                                <SelectItem value="5 Min" className="text-xs font-semibold">5 Min</SelectItem>
                                                <SelectItem value="10 Min" className="text-xs font-semibold">10 Min</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                        QUESTION
                                    </label>
                                    <input
                                        type="text"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                        placeholder="What tool is used for driving nails?"
                                        className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    {options.map((opt, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="correctOption"
                                                checked={opt.isCorrect}
                                                onChange={() => {
                                                    setOptions((prev) =>
                                                        prev.map((o, i) => ({ ...o, isCorrect: i === idx }))
                                                    );
                                                }}
                                                className="w-4 h-4 text-[#57154D] accent-[#57154D] cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={opt.text}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setOptions((prev) =>
                                                        prev.map((o, i) => (i === idx ? { ...o, text: val } : o))
                                                    );
                                                }}
                                                placeholder={`Option ${idx + 1}`}
                                                className="w-full px-3 py-2 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-300/80">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateQuizModal(false)}
                                    className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg text-xs sm:text-sm transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                                >
                                    Publish Quiz for Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 2: UPLOAD ARTICLE / VIDEO MODAL (Local File Upload Feature) --- */}
            {showUploadArticleModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 border border-gray-300 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-300/80 pb-3">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                    Upload Article & Media
                                </h3>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    Upload Resources content, documents or videos from your local device
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowUploadArticleModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleUploadArticleSubmit} className="space-y-4">
                            {/* Content Type */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                    Content Type
                                </label>
                                <Select value={contentType} onValueChange={setContentType}>
                                    <SelectTrigger className="w-full bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-800 h-11 px-4 focus:ring-2 focus:ring-[#57154D]/30 cursor-pointer">
                                        <SelectValue placeholder="Select Content Type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-2xl z-[9999]">
                                        <SelectItem value="Career Exploration" className="font-semibold text-xs sm:text-sm cursor-pointer">
                                            Career Exploration
                                        </SelectItem>
                                        <SelectItem value="Skills Assessment" className="font-semibold text-xs sm:text-sm cursor-pointer">
                                            Skills Assessment
                                        </SelectItem>
                                        <SelectItem value="General Information" className="font-semibold text-xs sm:text-sm cursor-pointer">
                                            General Information
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={articleTitle}
                                    onChange={(e) => setArticleTitle(e.target.value)}
                                    placeholder="Career Paths in Civil Engineering"
                                    className="w-full px-4 py-3 bg-[#E8E8EB] border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all font-medium"
                                />
                            </div>

                            {/* Content Editor using official TipTapEditor */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                    Content
                                </label>
                                <TipTapEditor
                                    description={articleContent}
                                    handleJobDescription={setArticleContent}
                                    minHeight="160px"
                                    maxHeight="240px"
                                />
                            </div>

                            {/* Hidden Local File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="video/mp4,video/mov,video/webm,video/mkv,application/pdf"
                                className="hidden"
                            />

                            {/* Upload Local Video / File Dropzone */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                    Upload Video / File (From Local Device)
                                </label>

                                {selectedFile ? (
                                    /* Selected File Box / Video Preview */
                                    <div className="border border-gray-300 rounded-lg p-4 bg-white space-y-3 relative shadow-2xs">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-100 text-[#57154D] flex items-center justify-center shrink-0 font-bold">
                                                    {selectedFile.type.startsWith("video/") ? (
                                                        <Video className="w-5 h-5" />
                                                    ) : (
                                                        <FileText className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                                                        {selectedFile.name}
                                                    </p>
                                                    <p className="text-[11px] text-gray-500 font-semibold">
                                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || "Local File"}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleRemoveSelectedFile}
                                                className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                                                title="Remove File"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Video Local Preview Player */}
                                        {videoPreviewUrl && (
                                            <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-black">
                                                <video
                                                    src={videoPreviewUrl}
                                                    controls
                                                    className="w-full max-h-48 object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Dropzone Trigger */
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center space-y-2 bg-[#E8E8EB]/50 hover:bg-[#E8E8EB] transition-colors cursor-pointer"
                                    >
                                        <UploadCloud className="w-8 h-8 text-[#57154D] mx-auto" />
                                        <p className="text-xs sm:text-sm font-bold text-gray-800">
                                            Click to choose video or PDF file from your device
                                        </p>
                                        <p className="text-[11px] text-gray-500 font-medium">
                                            File size less than 100MB • Supports MP4, MOV, WEBM and PDF
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-300/80">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadArticleModal(false)}
                                    className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg text-xs sm:text-sm transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
                                >
                                    Publish for Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}