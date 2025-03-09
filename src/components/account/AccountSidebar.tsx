
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Receipt 
} from "lucide-react";

const menuItems = [
  {
    title: "Profile",
    icon: User,
    href: "/account/profile",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/account/billing",
  },
  {
    title: "Payment History",
    icon: Receipt,
    href: "/account/payment-history",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/account/notifications",
  },
  {
    title: "Security",
    icon: ShieldCheck,
    href: "/account/security",
  },
  {
    title: "Preferences",
    icon: Settings,
    href: "/account/preferences",
  },
];

export function AccountSidebar() {
  return (
    <div className="h-full border-r">
      <div className="p-4 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-accent/50"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
        
        <hr className="my-4" />
        
        <button className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent/50 text-destructive">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
