
import React from "react";
import { Brain, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "small" | "large";
  showText?: boolean;
  className?: string;
}

const Logo = ({ variant = "default", showText = true, className }: LogoProps) => {
  // Determine size based on variant
  const iconSize = 
    variant === "small" ? 20 :
    variant === "large" ? 32 : 
    24;
  
  const fontSize = 
    variant === "small" ? "text-base" :
    variant === "large" ? "text-2xl" : 
    "text-lg";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-red-violet-gradient rounded-full blur-lg opacity-30" style={{ 
          width: iconSize * 1.5, 
          height: iconSize * 1.5, 
          top: -iconSize * 0.25, 
          left: -iconSize * 0.25 
        }}></div>
        <Presentation 
          className="text-ai-red relative" 
          size={iconSize} 
        />
        <Brain 
          className="absolute text-ai-purple left-0 top-0" 
          size={iconSize} 
          style={{
            transform: "scale(0.65) translate(30%, 30%)"
          }}
        />
      </div>
      
      {showText && (
        <h2 className={cn(
          "font-bold bg-clip-text",
          fontSize, 
          className?.includes("text-white") 
            ? "text-white" 
            : "text-transparent bg-red-violet-gradient"
        )}>
          Better Lectures
        </h2>
      )}
    </div>
  );
};

export default Logo;
