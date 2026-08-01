import {
  Users,
  UserCheck,
  CalendarClock,
  Wallet,
} from "lucide-react";

export const stats = [
  {
    title: "Total Employees",
    value: 248,
    subtitle: "+12 this month",
    color: "#6366F1",
    icon: <Users size={28} />,
  },
  {
    title: "Present Today",
    value: 228,
    subtitle: "92% Attendance",
    color: "#22C55E",
    icon: <UserCheck size={28} />,
  },
  {
    title: "On Leave",
    value: 12,
    subtitle: "3 Pending Requests",
    color: "#F59E0B",
    icon: <CalendarClock size={28} />,
  },
  {
    title: "Monthly Payroll",
    value: "₹12.5L",
    subtitle: "Processed",
    color: "#EF4444",
    icon: <Wallet size={28} />,
  },
];