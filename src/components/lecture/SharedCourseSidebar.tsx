
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceTools from "@/components/lecture/WorkspaceTools";

interface SharedCourseSidebarProps {
  onCloseSidebar?: () => void;
}

const SharedCourseSidebar = ({ onCloseSidebar }: SharedCourseSidebarProps) => {
  const navigate = useNavigate();

  const handleBackToLectures = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <ContentUploader 
        courseId="tools"
        lectureId="shared" 
        documentTitle="AI Teaching Tools"
        onBackClick={handleBackToLectures}
      />

      <LectureNavigation 
        lectureId="shared"
        onCloseSidebar={onCloseSidebar}
      />

      <WorkspaceTools />
    </div>
  );
};

export default SharedCourseSidebar;
