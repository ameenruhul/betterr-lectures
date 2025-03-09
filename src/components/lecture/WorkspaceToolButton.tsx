
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

interface WorkspaceToolButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  path?: string;
}

const WorkspaceToolButton = ({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
  path,
}: WorkspaceToolButtonProps) => {
  const location = useLocation();
  const isActive = path ? location.pathname === path : false;

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-2 items-center justify-center p-4 h-auto w-full bg-white text-gray-700 border-gray-100 rounded-xl transition-all duration-300",
        "hover:bg-red-violet-gradient/5 hover:text-ai-magenta hover:border-ai-magenta/20",
        "active:translate-y-0 active:scale-95",
        "shadow-sm hover:shadow-md",
        isActive && "ring-2 ring-ai-magenta/20 bg-red-violet-gradient/5 text-ai-magenta border-ai-magenta/20",
        className
      )}
    >
      <Icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", iconClassName || "text-ai-violet")} />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

export default WorkspaceToolButton;
