export type TransactionType = "Income" | "Payout" | "Refund";
export type TransactionStatus = "Completed" | "Pending" | "Failed";

export type TransactionItem = {
  id: string;
  date: string;
  description: string;
  partner: string;
  type: TransactionType;
  amount: number;
  paymentMethod: string;
  status: TransactionStatus;
};

export const initialTransactionsList: TransactionItem[] = [
  {
    id: "TXN-8847",
    date: "Jun 26, 2026",
    description: "Monthly rent - Maple Residences",
    partner: "Maple Properties LLC",
    type: "Income",
    amount: 8400,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "TXN-8846",
    date: "Jun 25, 2026",
    description: "Service payment - Plumbing SR-1293",
    partner: "Mike Chen (Contractor)",
    type: "Payout",
    amount: 890,
    paymentMethod: "Direct Deposit",
    status: "Completed",
  },
  {
    id: "TXN-8845",
    date: "Jun 25, 2026",
    description: "Monthly subscription - Enterprise plan",
    partner: "Harbor Point Realty",
    type: "Income",
    amount: 2500,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "TXN-8844",
    date: "Jun 24, 2026",
    description: "Maintenance work - Electrical SR-1292",
    partner: "Nina Patel (Contractor)",
    type: "Payout",
    amount: 280,
    paymentMethod: "Direct Deposit",
    status: "Pending",
  },
  {
    id: "TXN-8843",
    date: "Jun 24, 2026",
    description: "Monthly rent - Sunrise Towers",
    partner: "Sunrise Holdings",
    type: "Income",
    amount: 12600,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "TXN-8842",
    date: "Jun 23, 2026",
    description: "Professional plan subscription",
    partner: "Oak Heights Group",
    type: "Income",
    amount: 1200,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    id: "TXN-8841",
    date: "Jun 22, 2026",
    description: "Painting work - SR-1294",
    partner: "Tom Wilson (Contractor)",
    type: "Payout",
    amount: 1200,
    paymentMethod: "Direct Deposit",
    status: "Pending",
  },
  {
    id: "TXN-8840",
    date: "Jun 22, 2026",
    description: "Refund - Cancelled service",
    partner: "Greenview Developments",
    type: "Refund",
    amount: 350,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "TXN-8839",
    date: "Jun 21, 2026",
    description: "Late payment fee",
    partner: "Elmwood Properties",
    type: "Income",
    amount: 150,
    paymentMethod: "Credit Card",
    status: "Failed",
  },
  {
    id: "TXN-8838",
    date: "Jun 20, 2026",
    description: "Monthly rent - Westpark Commercial",
    partner: "Westpark Commercial",
    type: "Income",
    amount: 18000,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
];
