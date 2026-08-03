import rawPartners from "@/data/propertyPartners.json";

export type PlanType = "Enterprise" | "Professional" | "Starter";
export type PartnerStatus = "Active" | "Pending" | "Suspended";
export type PaymentType = "Invoice" | "Due upon Receipt" | "Milestone Payment";

export type PropertyPartner = {
  id: string;
  propertyName: string;
  location: string;
  contactName: string;
  contactEmail: string;
  noOfUnits: number;
  plan: PlanType;
  status: PartnerStatus;
  paymentType: PaymentType;
};

export type StatItem = {
  id: string;
  title: string;
  value: string;
  textColor: string;
};

export const initialPartnersList: PropertyPartner[] = rawPartners as PropertyPartner[];
