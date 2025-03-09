
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ContentUploaderProps {
  courseId?: string;
  lectureId?: string;
  documentTitle: string;
  onBackClick: () => void;
}

const ContentUploader = ({ 
  courseId, 
  lectureId, 
  documentTitle, 
  onBackClick 
}: ContentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const dragStartY = useRef(0);
  const elementStartY = useRef(0);
  const uploaderRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) ready for processing`,
    });
  };

  const handleBackToLectures = () => {
    if (courseId) {
      navigate(`/courses/${courseId}/lectures`);
    } else {
      onBackClick();
    }
  };
  
  const handleGripMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBeingDragged(true);
    dragStartY.current = e.clientY;
    
    if (uploaderRef.current) {
      elementStartY.current = uploaderRef.current.getBoundingClientRect().top;
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isBeingDragged || !uploaderRef.current) return;
    
    const deltaY = e.clientY - dragStartY.current;
    const newPositionY = elementStartY.current + deltaY;
    
    // Limit dragging to a reasonable area within the sidebar
    const maxY = window.innerHeight - 200; // Don't let it go too far off screen
    const minY = 100; // Keep it somewhat visible at the top
    
    if (newPositionY > minY && newPositionY < maxY) {
      uploaderRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };
  
  const handleMouseUp = () => {
    setIsBeingDragged(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // Reset transform to let it snap back to normal flow
    // Here we could save the position if we wanted persistent positioning
    if (uploaderRef.current) {
      uploaderRef.current.style.transition = 'transform 0.3s ease';
      uploaderRef.current.style.transform = ''; // Reset transform
      
      // Remove the transition after it completes
      setTimeout(() => {
        if (uploaderRef.current) {
          uploaderRef.current.style.transition = '';
        }
      }, 300);
    }
  };

  return (
    <div ref={uploaderRef} className="p-4 border-b relative">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackToLectures} 
          className="text-gray-600 hover:text-gray-900 -ml-2 group transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          {lectureId ? "Back to Lectures" : "Back to Courses"}
        </Button>
        
        <div className="flex items-center">
          <GripVertical 
            className="h-4 w-4 text-gray-400 cursor-move drag-handle" 
            onMouseDown={handleGripMouseDown}
          />
        </div>
      </div>
      
      {lectureId && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-primary">LECTURE {lectureId}</h3>
          <h2 className="text-lg font-bold">{documentTitle}</h2>
        </div>
      )}
      
      <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
        <Upload className="h-4 w-4 mr-2 text-primary" />
        Content Upload
      </h3>
      
      {/* Content Upload Area */}
      <div
        className={`group h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-gray-100/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={`h-8 w-8 mb-2 transition-colors duration-300 ${isDragging ? "text-primary" : "text-gray-400 group-hover:text-primary/70"}`} />
        <p className="text-xs text-center text-gray-600 mb-2">
          Drag files or
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white hover:bg-primary hover:text-white transition-all duration-300"
        >
          Browse
        </Button>
      </div>
    </div>
  );
};

export default ContentUploader;
