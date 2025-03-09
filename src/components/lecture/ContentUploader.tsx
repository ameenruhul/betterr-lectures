
import React, { useState } from "react";
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

  return (
    <div className="p-4 border-b">
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
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move drag-handle" />
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
