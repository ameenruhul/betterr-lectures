
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface WorkspaceToolButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

const WorkspaceToolButton = ({
  icon: Icon,
  label,
  onClick,
  className,
}: WorkspaceToolButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-2 items-center justify-center p-4 h-auto w-full bg-white text-gray-700 border-none rounded-xl transition-all duration-300",
        "hover:bg-primary/5 hover:text-primary hover:translate-y-[-2px]",
        "active:translate-y-0 active:scale-95",
        "shadow-sm hover:shadow-md",
        className
      )}
    >
      <Icon className="h-6 w-6 text-primary" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

export default WorkspaceToolButton;
