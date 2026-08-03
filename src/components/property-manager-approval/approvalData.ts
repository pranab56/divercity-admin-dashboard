export type PropertyManagerApprovalItem = {
  id: string;
  avatarChar: string;
  companyName: string;
  applicantName: string;
  roleTitle: string;
  location: string;
  city: string;
  state: string;
  portfolioUnits: string;
  submittedDate: string;
  email: string;
  phone: string;
  maintenanceType: string;
  propertyTypes: {
    singleFamily: boolean;
    multiFamily: boolean;
    commercial: boolean;
    studentHousing: boolean;
    hoasCondos: boolean;
  };
  status: "Pending Review" | "Approved" | "Additional Info Required" | "Rejected";
};

export const approvalQueueItems: PropertyManagerApprovalItem[] = [
  {
    id: "1",
    avatarChar: "T",
    companyName: "TechNest Properties",
    applicantName: "Alex Rivera",
    roleTitle: "Property Manager",
    location: "Austin, TX",
    city: "Austin",
    state: "TX",
    portfolioUnits: "11–50 units",
    submittedDate: "Jul 14, 2026",
    email: "a.rivera@technest.com",
    phone: "+1 (737) 555-0183",
    maintenanceType: "Hybrid",
    propertyTypes: {
      singleFamily: true,
      multiFamily: true,
      commercial: false,
      studentHousing: false,
      hoasCondos: false,
    },
    status: "Pending Review",
  },
  {
    id: "2",
    avatarChar: "B",
    companyName: "Blue Ridge Management",
    applicantName: "Carla Nguyen",
    roleTitle: "Managing Partner",
    location: "Nashville, TN",
    city: "Nashville",
    state: "TN",
    portfolioUnits: "1–10 units",
    submittedDate: "Jul 13, 2026",
    email: "c.nguyen@blueridge.com",
    phone: "+1 (615) 555-0294",
    maintenanceType: "Outsourced Maintenance",
    propertyTypes: {
      singleFamily: true,
      multiFamily: false,
      commercial: false,
      studentHousing: false,
      hoasCondos: true,
    },
    status: "Pending Review",
  },
  {
    id: "3",
    avatarChar: "P",
    companyName: "Pinnacle Realty Group",
    applicantName: "James Okafor",
    roleTitle: "Director of Operations",
    location: "Dallas, TX",
    city: "Dallas",
    state: "TX",
    portfolioUnits: "51–200 units",
    submittedDate: "Jul 12, 2026",
    email: "j.okafor@pinnacle.com",
    phone: "+1 (214) 555-0312",
    maintenanceType: "In-House Maintenance",
    propertyTypes: {
      singleFamily: false,
      multiFamily: true,
      commercial: true,
      studentHousing: false,
      hoasCondos: false,
    },
    status: "Pending Review",
  },
  {
    id: "4",
    avatarChar: "S",
    companyName: "Summit Living LLC",
    applicantName: "Priya Kapoor",
    roleTitle: "Property Manager",
    location: "Denver, CO",
    city: "Denver",
    state: "CO",
    portfolioUnits: "1–10 units",
    submittedDate: "Jul 11, 2026",
    email: "p.kapoor@summitliving.com",
    phone: "+1 (303) 555-0489",
    maintenanceType: "Hybrid",
    propertyTypes: {
      singleFamily: true,
      multiFamily: true,
      commercial: false,
      studentHousing: true,
      hoasCondos: false,
    },
    status: "Pending Review",
  },
  {
    id: "5",
    avatarChar: "M",
    companyName: "Metro Urban Housing",
    applicantName: "Derek Walsh",
    roleTitle: "Chief Property Officer",
    location: "Chicago, IL",
    city: "Chicago",
    state: "IL",
    portfolioUnits: "11–50 units",
    submittedDate: "Jul 10, 2026",
    email: "d.walsh@metrourban.com",
    phone: "+1 (312) 555-0567",
    maintenanceType: "Outsourced Maintenance",
    propertyTypes: {
      singleFamily: false,
      multiFamily: true,
      commercial: true,
      studentHousing: false,
      hoasCondos: true,
    },
    status: "Pending Review",
  },
];
