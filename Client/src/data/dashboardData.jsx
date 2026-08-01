import {
  Users,
  CalendarCheck,
  CalendarDays,
  IndianRupee,
} from "lucide-react";


export const stats = [
  {
    id: 1,
    title: "Total Employees",
    value: "248",
    change: "+12.5% vs last month",
    icon: <Users size={26} />,
    color: "#6D5BFF",
    bg: "#F3F0FF",
    
  },
  {
    id: 2,
    title: "Present Today",
    value: "186",
    change: "+8.3% vs yesterday",
    icon: <CalendarCheck size={26} />,
    color: "#22C55E",
    bg: "#ECFDF3",
    
  },
  {
    id: 3,
    title: "On Leave",
    value: "28",
    change: "-4.2% vs yesterday",
    icon: <CalendarDays size={26} />,
    color: "#F59E0B",
    bg: "#FFF7ED",
  
  },
  {
    id: 4,
    title: "Monthly Payroll",
    value: "₹24.8L",
    change: "+6.7% vs last month",
    icon: <IndianRupee size={26} />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    
  },
];