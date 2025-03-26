
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const menuItems: MenuItem[] = [
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
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="h-full border-r bg-background">
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
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
        
        <hr className="my-4" />
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 text-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
