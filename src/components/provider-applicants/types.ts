export type ApplicantStatus = "Pending" | "Under Review" | "Approved" | "Rejected";
export type FilterTab = "All" | "Pending" | "Approved" | "Action Required" | "Rejected";

export type ProviderApplicantItem = {
  id: string;
  avatarChar: string;
  avatarBg: string;
  avatarColor: string;
  name: string;
  trade: string;
  experienceYears: number;
  email: string;
  phone: string;
  appliedDate: string;
  status: ApplicantStatus;
  rating?: number;
  aboutText: string;
  licenseNumber: string;
  documents: { title: string; verified: boolean }[];
};

export const initialApplicantsList: ProviderApplicantItem[] = [
  {
    id: "PROV-101",
    avatarChar: "JO",
    avatarBg: "bg-blue-100",
    avatarColor: "text-blue-600",
    name: "James Okafor",
    trade: "Plumbing",
    experienceYears: 8,
    email: "j.okafor@email.com",
    phone: "+1 (555) 123-4567",
    appliedDate: "Jun 26, 2026",
    status: "Pending",
    aboutText:
      "Licensed master plumber with 8 years of residential and commercial experience. Specializes in pipe installation, leak repairs, and bathroom renovations.",
    licenseNumber: "PL - 2024 - 78432",
    documents: [
      { title: "License Certificate", verified: true },
      { title: "Insurance Certificate", verified: true },
      { title: "Background Check", verified: true },
    ],
  },
  {
    id: "PROV-102",
    avatarChar: "NP",
    avatarBg: "bg-amber-100",
    avatarColor: "text-amber-700",
    name: "Nina Patel",
    trade: "Electrical",
    experienceYears: 12,
    email: "n.patel@email.com",
    phone: "+1 (555) 234-5678",
    appliedDate: "Jun 25, 2026",
    status: "Pending",
    aboutText:
      "Certified master electrician with 12 years of experience handling commercial wiring, panel upgrades, and smart home automation systems.",
    licenseNumber: "EL - 2023 - 99120",
    documents: [
      { title: "Electrical License", verified: true },
      { title: "Liability Insurance", verified: true },
      { title: "Safety Certificate", verified: true },
    ],
  },
  {
    id: "PROV-103",
    avatarChar: "CR",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-700",
    name: "Carlos Rivera",
    trade: "HVAC",
    experienceYears: 6,
    email: "c.rivera@email.com",
    phone: "+1 (555) 345-6789",
    appliedDate: "Jun 24, 2026",
    status: "Under Review",
    aboutText:
      "HVAC technician specializing in air conditioning installation, furnace maintenance, and commercial ventilation systems.",
    licenseNumber: "HV - 2025 - 44102",
    documents: [
      { title: "HVAC License", verified: true },
      { title: "EPA Certification", verified: true },
    ],
  },
  {
    id: "PROV-104",
    avatarChar: "SK",
    avatarBg: "bg-purple-100",
    avatarColor: "text-[#8E25E3]",
    name: "Sarah Kim",
    trade: "General Contractor",
    experienceYears: 15,
    email: "s.kim@email.com",
    phone: "+1 (555) 456-7890",
    appliedDate: "Jun 20, 2026",
    status: "Approved",
    rating: 4.8,
    aboutText:
      "General contractor with 15 years overseeing multi-family residential renovations and commercial build-outs.",
    licenseNumber: "GC - 2021 - 10092",
    documents: [
      { title: "General Contractor License", verified: true },
      { title: "Workers Comp Insurance", verified: true },
      { title: "Bonding Document", verified: true },
    ],
  },
  {
    id: "PROV-105",
    avatarChar: "MJ",
    avatarBg: "bg-red-100",
    avatarColor: "text-red-700",
    name: "Marcus Johnson",
    trade: "Painting",
    experienceYears: 10,
    email: "m.johnson@email.com",
    phone: "+1 (555) 567-8901",
    appliedDate: "Jun 18, 2026",
    status: "Rejected",
    aboutText:
      "Professional interior and exterior painter with 10 years of commercial surface coating experience.",
    licenseNumber: "PT - 2022 - 33190",
    documents: [
      { title: "Business License", verified: false },
    ],
  },
];
