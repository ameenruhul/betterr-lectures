
import React from "react";
import { Brain, Presentation, ChalkboardPen } from "lucide-react";
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
      <div className="relative group">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-violet-purple-gradient rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" style={{ 
          width: iconSize * 1.5, 
          height: iconSize * 1.5, 
          top: -iconSize * 0.25, 
          left: -iconSize * 0.25 
        }}></div>
        
        {/* Whiteboard/classroom element */}
        <ChalkboardPen 
          className="text-ai-purple relative group-hover:scale-110 transition-transform" 
          size={iconSize} 
        />
        
        {/* AI Brain element - positioned to create an overlapping effect */}
        <Brain 
          className="absolute text-ai-magenta left-0 top-0 group-hover:scale-110 transition-transform" 
          size={iconSize} 
          style={{
            transform: "scale(0.65) translate(20%, 20%)"
          }}
        />
        
        {/* Subtle circuit/connection marks to emphasize AI */}
        <div className="absolute w-1 h-1 bg-ai-violet rounded-full" style={{ 
          top: iconSize * 0.2, 
          left: iconSize * 0.8 
        }}></div>
        <div className="absolute w-1 h-1 bg-ai-magenta rounded-full" style={{ 
          top: iconSize * 0.6, 
          left: iconSize * 0.3 
        }}></div>
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
