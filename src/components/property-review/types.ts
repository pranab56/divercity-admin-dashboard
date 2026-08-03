export type ReviewStatus = "Pending Review" | "Approved" | "Rejected";

export type PropertySubmission = {
  id: string;
  title: string;
  address: string;
  ownerName: string;
  managerName: string;
  units: number;
  monthlyRent: number;
  submittedDate: string;
  status: ReviewStatus;
  imageUrl: string;
};

export const initialPropertiesList: PropertySubmission[] = [
  {
    id: "PROP-901",
    title: "Sunset Heights Luxury Apartments",
    address: "88 Ocean Drive, Malibu, CA",
    ownerName: "Robert Vance",
    managerName: "Alex Morgan",
    units: 12,
    monthlyRent: 3500,
    submittedDate: "2024-04-18",
    status: "Pending Review",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "PROP-902",
    title: "Oakwood Terrace Townhomes",
    address: "412 Oak Street, Austin, TX",
    ownerName: "David Miller",
    managerName: "Sarah Jenkins",
    units: 6,
    monthlyRent: 2200,
    submittedDate: "2024-04-19",
    status: "Pending Review",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "PROP-903",
    title: "Highland Heights Apartments",
    address: "1050 Highland Ave, Denver, CO",
    ownerName: "Sarah Jenkins",
    managerName: "Oak Heights Group",
    units: 48,
    monthlyRent: 2100,
    submittedDate: "Jun 23, 2026",
    status: "Pending Review",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "PROP-904",
    title: "Grand Bay Commercial Center",
    address: "200 Bay Street, Suite 500, Miami, FL",
    ownerName: "Victor Vance Corp",
    managerName: "Sunrise Holdings",
    units: 12,
    monthlyRent: 4500,
    submittedDate: "Jun 20, 2026",
    status: "Approved",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "PROP-905",
    title: "Pinecrest Residential Complex",
    address: "880 Pinecrest Rd, Austin, TX",
    ownerName: "Elena Rostova",
    managerName: "Harbor Point Realty",
    units: 36,
    monthlyRent: 1600,
    submittedDate: "Jun 18, 2026",
    status: "Approved",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "PROP-906",
    title: "Old Town Lofts",
    address: "310 Main Street, Chicago, IL",
    ownerName: "Marcus Sterling",
    managerName: "Greenview Developments",
    units: 16,
    monthlyRent: 1950,
    submittedDate: "Jun 15, 2026",
    status: "Rejected",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
  },
];
