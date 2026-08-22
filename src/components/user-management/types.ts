export type UserRole = "Student" | "Teacher" | "Parent" | "Company" | "Industry Professional";

export type UserStatus = "Active" | "Suspended";

export type UserItem = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  status: UserStatus;
  avatar?: string;
  // Student fields
  xp?: number;
  videosWatched?: number;
  applicationsCount?: number;
  quizzesCount?: number;
  age?: string;
  location?: string;
  school?: string;
  studentId?: string;
  // Parent fields
  parentName?: string;
  parentEmail?: string;
  relationship?: string;
  phoneNumber?: string;
  memberSince?: string;
  // Educator fields
  resourcesUploaded?: number;
  newEventsCreated?: number;
  institutionType?: string;
  // Company fields
  activeOpportunities?: number;
  studentsHired?: number;
  industrySector?: string;
  // Industry Professional fields
  jobTitle?: string;
  companyName?: string;
  yearsOfExperience?: string;
  fieldOfExpertise?: string;
  sessionsConducted?: number;
  mentorshipsCount?: number;
};

export const initialUsersList: UserItem[] = [
  {
    id: "USR-001",
    name: "Jhon",
    role: "Student",
    email: "john@metromart.com",
    status: "Active",
    xp: 500,
    videosWatched: 24,
    applicationsCount: 8,
    quizzesCount: 12,
    age: "14-16",
    location: "London, UK",
    school: "St. Mary's Secondary School",
    studentId: "#USR-00124",
    parentName: "Emily Rodriguez",
    parentEmail: "emily.r@email.com",
    relationship: "Parent",
    phoneNumber: "+44 20 7946 0958",
    memberSince: "May 10, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-002",
    name: "Jhon",
    role: "Teacher",
    email: "sarah@freshfarms.com",
    status: "Active",
    resourcesUploaded: 24,
    newEventsCreated: 8,
    memberSince: "2024",
    institutionType: "Secondary School",
    school: "St. Mary's Secondary School",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-003",
    name: "Jhon",
    role: "Parent",
    email: "mike@citygrocers.com",
    status: "Active",
    parentName: "Emily Rodriguez",
    parentEmail: "emily.r@email.com",
    relationship: "Parent",
    phoneNumber: "+44 20 7946 0958",
    memberSince: "May 10, 2026",
    xp: 500,
    videosWatched: 24,
    applicationsCount: 8,
    quizzesCount: 12,
    age: "14-16",
    school: "St. Mary's Secondary School",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-004",
    name: "Jhon",
    role: "Company",
    email: "alan@grainmasters.com",
    status: "Suspended",
    activeOpportunities: 12,
    applicationsCount: 47,
    studentsHired: 8,
    memberSince: "2024",
    institutionType: "Private Limited Company",
    industrySector: "Construction & Engineering",
    phoneNumber: "+44 20 1234 5678",
    avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-005",
    name: "Romo",
    role: "Student",
    email: "student@email.com",
    status: "Active",
    xp: 500,
    videosWatched: 24,
    applicationsCount: 8,
    quizzesCount: 12,
    age: "14-16",
    location: "London, UK",
    school: "St. Mary's Secondary School",
    studentId: "#USR-00124",
    parentName: "Emily Rodriguez",
    parentEmail: "emily.r@email.com",
    relationship: "Parent",
    phoneNumber: "+44 20 7946 0958",
    memberSince: "May 10, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-006",
    name: "James Wilson",
    role: "Teacher",
    email: "j.wilson@school.edu",
    status: "Active",
    resourcesUploaded: 24,
    newEventsCreated: 8,
    memberSince: "2024",
    institutionType: "Secondary School",
    school: "St. Mary's Secondary School",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-007",
    name: "Emily Rodriguez",
    role: "Parent",
    email: "emily.r@email.com",
    status: "Active",
    parentName: "Emily Rodriguez",
    parentEmail: "emily.r@email.com",
    relationship: "Parent",
    phoneNumber: "+44 20 7946 0958",
    memberSince: "May 10, 2026",
    xp: 500,
    videosWatched: 24,
    applicationsCount: 8,
    quizzesCount: 12,
    age: "14-16",
    school: "St. Mary's Secondary School",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-008",
    name: "BuildCo Construction",
    role: "Company",
    email: "contact@buildco.com",
    status: "Active",
    activeOpportunities: 12,
    applicationsCount: 47,
    studentsHired: 8,
    memberSince: "2024",
    institutionType: "Private Limited Company",
    industrySector: "Construction & Engineering",
    phoneNumber: "+44 20 1234 5678",
    avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "USR-009",
    name: "Dr. Sarah Jenkins",
    role: "Industry Professional",
    email: "sarah.jenkins@biotech.com",
    status: "Active",
    jobTitle: "Principal Bio-Engineer",
    companyName: "BioTech Innovations Ltd",
    industrySector: "Healthcare & Technology",
    yearsOfExperience: "10+ Years",
    fieldOfExpertise: "Genomics & Robotics",
    sessionsConducted: 14,
    mentorshipsCount: 9,
    phoneNumber: "+44 20 7946 0123",
    memberSince: "Jan 12, 2025",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  },
];
