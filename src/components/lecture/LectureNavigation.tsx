
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, FileText, FileQuestion, LayoutList, X, ChevronRight, BookOpen, MessageSquare, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LectureNavigationProps {
  lectureId?: string;
  onCloseSidebar?: () => void;
}

// Sample lecture content data (in a real app, this would come from an API)
const LECTURE_CONTENT = [
  {
    id: "lecture-content-1",
    title: "Introduction",
    icon: Video,
    color: "text-primary",
    href: "#introduction"
  },
  {
    id: "lecture-content-2",
    title: "Key Concepts",
    icon: BookOpen,
    color: "text-emerald-500",
    href: "#key-concepts"
  },
  {
    id: "lecture-content-3",
    title: "Example Problems",
    icon: FileText,
    color: "text-amber-500",
    href: "#examples"
  },
  {
    id: "lecture-content-4",
    title: "Discussion Questions",
    icon: MessageSquare,
    color: "text-blue-500",
    href: "#discussion"
  },
  {
    id: "lecture-content-5",
    title: "Practice Quiz",
    icon: FileQuestion,
    color: "text-violet-500",
    href: "#quiz"
  },
  {
    id: "lecture-content-6",
    title: "Additional Resources",
    icon: Layers,
    color: "text-rose-500",
    href: "#resources"
  }
];

const LectureNavigation = ({ lectureId, onCloseSidebar }: LectureNavigationProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>("lecture-content-1");
  
  const handleNavClick = (section: string, id: string, href: string) => {
    setActiveSection(id);
    
    // In a real application, this would navigate to the specific section
    // For now, we'll just show a toast and navigate to the anchor if it exists
    if (href.startsWith('#') && document.querySelector(href)) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: `Navigating to ${section}`,
      description: "Jumping to this section of the lecture",
    });
    
    // Close sidebar on mobile after navigation
    if (onCloseSidebar && window.innerWidth < 768) {
      onCloseSidebar();
    }
  };
  
  return (
    <div className="p-4 border-b relative">
      {/* Mobile close button */}
      {onCloseSidebar && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 md:hidden" 
          onClick={onCloseSidebar}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
        <LayoutList className="h-4 w-4 mr-2 text-primary" />
        Lecture Navigation
      </h3>
      <div className="space-y-2">
        {LECTURE_CONTENT.map((item) => (
          <Button 
            key={item.id}
            variant="outline" 
            className={cn(
              "w-full justify-start bg-white hover:bg-primary/5 hover:text-primary transition-all duration-300",
              activeSection === item.id && "bg-primary/5 text-primary border-primary/20 font-medium"
            )}
            size="sm"
            onClick={() => handleNavClick(item.title, item.id, item.href)}
          >
            <item.icon className={cn("h-4 w-4 mr-2", item.color)} />
            {item.title}
            {activeSection === item.id && (
              <ChevronRight className="h-3 w-3 ml-auto" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LectureNavigation;
