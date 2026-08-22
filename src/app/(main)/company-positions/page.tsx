"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react";
import toast from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type PositionItem = {
    id: string;
    num: string;
    title: string;
    category: string;
};

type PositionCategory = {
    name: string;
    positions: PositionItem[];
    isOpen: boolean;
};

const initialJobTypes = [
    "Internship",
    "Apprenticeship",
    "Work Placement",
];

const categoryOptions = [
    "Traditional Trade",
    "Civil Engineering",
    "Digital & Design",
    "Sustainability",
];

const initialTraditionalPositions: PositionItem[] = [
    { id: "pos-1", num: "01", title: "Bricklayer", category: "Traditional Trade" },
    { id: "pos-2", num: "02", title: "Carpenter / Joiner", category: "Traditional Trade" },
    { id: "pos-3", num: "03", title: "Electrician", category: "Traditional Trade" },
    { id: "pos-4", num: "04", title: "Plumber", category: "Traditional Trade" },
    { id: "pos-5", num: "05", title: "Groundworker", category: "Traditional Trade" },
    { id: "pos-6", num: "06", title: "Steel Fixer", category: "Traditional Trade" },
    { id: "pos-7", num: "07", title: "Scaffolder", category: "Traditional Trade" },
    { id: "pos-8", num: "08", title: "Painter & Decorator", category: "Traditional Trade" },
    { id: "pos-9", num: "09", title: "Roofer", category: "Traditional Trade" },
    { id: "pos-10", num: "10", title: "Tiler", category: "Traditional Trade" },
    { id: "pos-11", num: "11", title: "Dryliner", category: "Traditional Trade" },
    { id: "pos-12", num: "12", title: "Plasterer", category: "Traditional Trade" },
    { id: "pos-13", num: "13", title: "Plant Operator", category: "Traditional Trade" },
    { id: "pos-14", num: "14", title: "Crane Operator", category: "Traditional Trade" },
    { id: "pos-15", num: "15", title: "Demolition Operative", category: "Traditional Trade" },
    { id: "pos-16", num: "16", title: "Traffic Marshal", category: "Traditional Trade" },
    { id: "pos-17", num: "17", title: "Labourer", category: "Traditional Trade" },
    { id: "pos-18", num: "18", title: "Paving Operative", category: "Traditional Trade" },
    { id: "pos-19", num: "19", title: "Pipefitter", category: "Traditional Trade" },
    { id: "pos-20", num: "20", title: "Welding Fabricator", category: "Traditional Trade" },
];

export default function CompanyPositionsPage() {
    const [jobTypes, setJobTypes] = useState<string[]>(initialJobTypes);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

    // Modals state
    const [showAddJobTypeModal, setShowAddJobTypeModal] = useState(false);
    const [newJobTypeName, setNewJobTypeName] = useState("");

    const [editingJobType, setEditingJobType] = useState<string | null>(null);
    const [editJobTypeName, setEditJobTypeName] = useState("");

    const [showAddPositionModal, setShowAddPositionModal] = useState(false);
    const [newPositionTitle, setNewPositionTitle] = useState("");
    const [newPositionCategory, setNewPositionCategory] = useState("Traditional Trade");

    const [editingPosition, setEditingPosition] = useState<PositionItem | null>(null);

    const [categories, setCategories] = useState<PositionCategory[]>([
        { name: "TRADITIONAL TRADE", positions: initialTraditionalPositions, isOpen: true },
        { name: "CIVIL ENGINEERING", positions: [], isOpen: false },
        { name: "DIGITAL & DESIGN", positions: [], isOpen: false },
        { name: "SUSTAINABILITY", positions: [], isOpen: false },
    ]);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPositionsCount = categories.reduce(
        (acc, cat) => acc + cat.positions.length,
        0
    );

    // Toggle Category Accordion
    const toggleCategory = (catName: string) => {
        setCategories((prev) =>
            prev.map((c) => (c.name === catName ? { ...c, isOpen: !c.isOpen } : c))
        );
    };

    // Add Job Type Handler
    const handleAddJobType = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newJobTypeName.trim()) {
            toast.error("Please enter a job type name");
            return;
        }
        setJobTypes((prev) => [...prev, newJobTypeName.trim()]);
        toast.success(`Job type "${newJobTypeName}" added!`);
        setNewJobTypeName("");
        setShowAddJobTypeModal(false);
    };

    // Update Job Type Handler
    const handleUpdateJobType = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingJobType || !editJobTypeName.trim()) {
            toast.error("Please enter a job type name");
            return;
        }
        setJobTypes((prev) =>
            prev.map((item) => (item === editingJobType ? editJobTypeName.trim() : item))
        );
        toast.success("Job type updated successfully!");
        setEditingJobType(null);
    };

    // Remove Job Type Handler
    const handleRemoveJobType = (jt: string) => {
        setJobTypes((prev) => prev.filter((item) => item !== jt));
        toast.success(`Job type "${jt}" removed`);
    };

    // Add Position Handler
    const handleAddPosition = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPositionTitle.trim()) {
            toast.error("Please enter a position title");
            return;
        }

        const targetCategoryName =
            newPositionCategory.toUpperCase().trim() || "TRADITIONAL TRADE";

        const newPos: PositionItem = {
            id: `pos-${Date.now()}`,
            num: String(totalPositionsCount + 1).padStart(2, "0"),
            title: newPositionTitle.trim(),
            category: newPositionCategory.trim() || "Traditional Trade",
        };

        setCategories((prev) => {
            const exists = prev.some((c) => c.name === targetCategoryName);
            if (exists) {
                return prev.map((c) =>
                    c.name === targetCategoryName
                        ? { ...c, positions: [...c.positions, newPos], isOpen: true }
                        : c
                );
            }
            return [
                ...prev,
                { name: targetCategoryName, positions: [newPos], isOpen: true },
            ];
        });

        toast.success(`Position "${newPositionTitle}" added successfully!`);
        setNewPositionTitle("");
        setNewPositionCategory("Traditional Trade");
        setShowAddPositionModal(false);
    };

    // Delete Position Handler
    const handleDeletePosition = (catName: string, posId: string) => {
        setCategories((prev) =>
            prev.map((c) =>
                c.name === catName
                    ? { ...c, positions: c.positions.filter((p) => p.id !== posId) }
                    : c
            )
        );
        toast.success("Position deleted");
    };

    // Update Position Handler
    const handleUpdatePosition = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPosition || !editingPosition.title.trim()) return;

        setCategories((prev) =>
            prev.map((c) => ({
                ...c,
                positions: c.positions.map((p) =>
                    p.id === editingPosition.id ? editingPosition : p
                ),
            }))
        );
        toast.success("Position updated successfully!");
        setEditingPosition(null);
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            {/* Top Section: Stat Card & Action Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                {/* TOTAL POSITIONS Stat Card */}
                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 shadow-2xs w-full sm:w-72">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        TOTAL POSITIONS
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1.5 tracking-tight">
                        {totalPositionsCount}
                    </h2>
                </div>

                {/* Right Actions: Search, Filter, + Add Position Button */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Search positions... */}
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search positions..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30 transition-all shadow-2xs"
                        />
                    </div>

                    {/* Category Dropdown (shadcn Select) */}
                    <div className="shrink-0">
                        <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                            <SelectTrigger className="w-[180px] bg-[#F4F4F6] py-5 cursor-pointer sm:bg-[#F5F5F7] border border-gray-200/60 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 shadow-2xs focus:ring-2 focus:ring-[#57154D]/30 h-10 px-4">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <SelectItem value="All" className="font-semibold text-xs sm:text-sm cursor-pointer">
                                    All Categories
                                </SelectItem>
                                {categoryOptions.map((cat) => (
                                    <SelectItem key={cat} value={cat} className="font-semibold text-xs sm:text-sm cursor-pointer">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* + Add Position Button */}
                    <button
                        type="button"
                        onClick={() => setShowAddPositionModal(true)}
                        className="px-5 py-2.5 bg-[#57154D] hover:bg-[#47103F] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4 text-white" />
                        <span>Add Position</span>
                    </button>
                </div>
            </div>

            {/* --- SECTION 1: JOB TYPES --- */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Job Types</h2>
                    <span className="w-6 h-6 rounded-full bg-gray-200/70 text-gray-700 font-bold text-xs flex items-center justify-center">
                        {jobTypes.length}
                    </span>
                </div>

                <div className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg p-5 sm:p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 tracking-wider uppercase border-b border-gray-200/60 pb-3">
                        <span>JOB TYPE</span>
                        <span>ACTIONS</span>
                    </div>

                    <div className="space-y-3">
                        {jobTypes.map((jt) => (
                            <div
                                key={jt}
                                className="flex items-center justify-between py-1 text-sm font-bold text-gray-900 group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-[#57154D]" />
                                    <span className="font-medium">{jt}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingJobType(jt);
                                            setEditJobTypeName(jt);
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                                        title="Edit Job Type"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveJobType(jt)}
                                        className="p-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* + Add Job Type Link Button */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setShowAddJobTypeModal(true)}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#57154D] hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <Plus className="w-4 h-4 text-[#57154D]" />
                            <span>Add Job Type</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: POSITIONS --- */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Positions</h2>
                    <span className="w-7 h-7 rounded-full bg-gray-200/70 text-gray-700 font-bold text-xs flex items-center justify-center">
                        {totalPositionsCount}
                    </span>
                </div>

                {/* Categories Accordions List */}
                <div className="space-y-4">
                    {categories.map((cat) => {
                        const filteredPositions = cat.positions.filter((pos) => {
                            const matchesSearch = pos.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase());
                            const matchesCat =
                                selectedCategoryFilter === "All" ||
                                pos.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
                            return matchesSearch && matchesCat;
                        });

                        return (
                            <div
                                key={cat.name}
                                className="bg-[#F4F4F6] sm:bg-[#F5F5F7] border border-gray-200/50 rounded-lg shadow-2xs overflow-hidden"
                            >
                                {/* Category Header */}
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(cat.name)}
                                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-white/40 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 bg-[#F5EBE1] text-[#9A6535] rounded-md font-bold text-xs shadow-2xs">
                                            {cat.positions.length}
                                        </span>
                                        <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                            {cat.name}
                                        </h3>
                                    </div>
                                    {cat.isOpen ? (
                                        <ChevronUp className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>

                                {/* Category Expanded Body */}
                                {cat.isOpen && (
                                    <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-gray-200/40">
                                        {filteredPositions.length === 0 ? (
                                            <p className="py-6 text-xs text-gray-400 font-medium italic">
                                                No positions in this category.
                                            </p>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse min-w-[550px]">
                                                    <thead>
                                                        <tr className="border-b border-gray-200/60 text-gray-400 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                                                            <th className="py-3 px-2">POSITION TITLE</th>
                                                            <th className="py-3 px-4 text-center">CATEGORY</th>
                                                            <th className="py-3 px-4 text-right">ACTIONS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200/40 text-xs sm:text-sm font-bold text-gray-900">
                                                        {filteredPositions.map((pos) => (
                                                            <tr key={pos.id} className="hover:bg-white/50 transition-colors">
                                                                {/* POSITION TITLE */}
                                                                <td className="py-3.5 px-2">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-xs text-gray-400 font-medium w-5">
                                                                            {pos.num}
                                                                        </span>
                                                                        <span className="font-medium text-gray-900">{pos.title}</span>
                                                                    </div>
                                                                </td>

                                                                {/* CATEGORY */}
                                                                <td className="py-3.5 px-4 text-center">
                                                                    <span className="px-4 py-1.5 bg-[#F5EBE1] text-[#9A6535] rounded-lg text-xs font-semibold shadow-2xs inline-block">
                                                                        {pos.category}
                                                                    </span>
                                                                </td>

                                                                {/* ACTIONS */}
                                                                <td className="py-3.5 px-4 text-right">
                                                                    <div className="flex items-center justify-end gap-3">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setEditingPosition(pos)}
                                                                            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                                                                            title="Edit Position"
                                                                        >
                                                                            <Pencil className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDeletePosition(cat.name, pos.id)}
                                                                            className="p-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                                            title="Delete Position"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination Row */}
            <div className="flex items-center justify-center gap-2 pt-4">
                <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3, 4, 5, 6, "...", 3].map((pageItem, idx) => {
                    if (pageItem === "...") {
                        return (
                            <span key={idx} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-gray-400">
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
                    onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                    className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* --- MODAL 1: ADD JOB TYPE MODAL --- */}
            {showAddJobTypeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 border border-gray-300/60 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Add Job Type
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowAddJobTypeModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleAddJobType} className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    JOB TYPE NAME
                                </label>
                                <input
                                    type="text"
                                    value={newJobTypeName}
                                    onChange={(e) => setNewJobTypeName(e.target.value)}
                                    placeholder="e.g. Graduate Scheme"
                                    className="w-full px-4 py-3 bg-[#F4F4F6] border border-gray-200/80 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#A482A0] hover:bg-[#57154D] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
                            >
                                Add Job Type
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 2: ADD NEW POSITION MODAL (Category is now a shadcn Select dropdown) --- */}
            {showAddPositionModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 border border-gray-300/60 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Add New Position
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowAddPositionModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleAddPosition} className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    POSITION TITLE
                                </label>
                                <input
                                    type="text"
                                    value={newPositionTitle}
                                    onChange={(e) => setNewPositionTitle(e.target.value)}
                                    placeholder="e.g. Senior Quantity Surveyor"
                                    className="w-full px-4 py-3 bg-[#F4F4F6] border border-gray-200/80 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30"
                                    autoFocus
                                />
                            </div>

                            {/* CATEGORY (shadcn Select dropdown) */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    CATEGORY
                                </label>
                                <Select value={newPositionCategory} onValueChange={setNewPositionCategory}>
                                    <SelectTrigger className="w-full bg-[#F4F4F6] border border-gray-200/80 rounded-lg py-6 text-xs sm:text-sm font-medium text-gray-800 focus:ring-2 focus:ring-[#57154D]/30 h-11 px-4 cursor-pointer">
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-[60]">
                                        {categoryOptions.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="font-semibold text-xs sm:text-sm cursor-pointer py-2.5">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#A482A0] hover:bg-[#57154D] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs mt-2"
                            >
                                Add Position
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 3: EDIT POSITION MODAL --- */}
            {editingPosition && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 border border-gray-300/60 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Edit Position
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingPosition(null)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdatePosition} className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    POSITION TITLE
                                </label>
                                <input
                                    type="text"
                                    value={editingPosition.title}
                                    onChange={(e) =>
                                        setEditingPosition({ ...editingPosition, title: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-[#F4F4F6] border border-gray-200/80 rounded-lg text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30"
                                />
                            </div>

                            {/* CATEGORY (shadcn Select dropdown) */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    CATEGORY
                                </label>
                                <Select
                                    value={editingPosition.category}
                                    onValueChange={(val) => setEditingPosition({ ...editingPosition, category: val })}
                                >
                                    <SelectTrigger className="w-full bg-[#F4F4F6] py-6 border border-gray-200/80 rounded-lg text-xs sm:text-sm font-medium text-gray-800 focus:ring-2 focus:ring-[#57154D]/30 h-11 px-4 cursor-pointer">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-xl z-[60]">
                                        {categoryOptions.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="font-semibold py-3 text-xs sm:text-sm cursor-pointer">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#57154D] hover:bg-[#47103F] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs mt-2"
                            >
                                Update Position
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL 4: EDIT JOB TYPE MODAL --- */}
            {editingJobType !== null && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-[#EBEBEB] rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 border border-gray-300/60 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Edit Job Type
                            </h3>
                            <button
                                type="button"
                                onClick={() => setEditingJobType(null)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateJobType} className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                                    JOB TYPE NAME
                                </label>
                                <input
                                    type="text"
                                    value={editJobTypeName}
                                    onChange={(e) => setEditJobTypeName(e.target.value)}
                                    placeholder="e.g. Internship"
                                    className="w-full px-4 py-3 bg-[#F4F4F6] border border-gray-200/80 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57154D]/30"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#57154D] hover:bg-[#47103F] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
                            >
                                Update Job Type
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}