
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceTools from "@/components/lecture/WorkspaceTools";
import EditorToolbar from "@/components/lecture/EditorToolbar";
import TextEditor from "@/components/lecture/TextEditor";
import AIAssistant from "@/components/lecture/AIAssistant";

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const { toast } = useToast();

  const handleBackToLectures = () => {
    if (courseId) {
      navigate(`/courses/${courseId}/lectures`);
    } else {
      navigate("/dashboard");
    }
  };

  const handleSave = () => {
    toast({
      title: "Document saved",
      description: "Your document has been saved successfully",
      duration: 3000,
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your document is being prepared for download",
    });
  };

  const handleCreatePPTX = () => {
    toast({
      title: "Creating presentation",
      description: "Your presentation is being generated",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 border-r flex flex-col bg-white">
        {/* Navigation Header */}
        <ContentUploader 
          courseId={courseId} 
          lectureId={lectureId} 
          documentTitle={documentTitle}
          onBackClick={handleBackToLectures}
        />

        {/* Lecture Navigation */}
        <LectureNavigation lectureId={lectureId} />

        {/* Workspace Features */}
        <WorkspaceTools />
      </div>

      {/* Main Content Area - Word Processor */}
      <div className="flex-1 flex flex-col">
        {/* Editor Toolbar */}
        <EditorToolbar 
          onSave={handleSave} 
          onDownloadPDF={handleDownloadPDF} 
          onCreatePPTX={handleCreatePPTX} 
        />

        {/* Text Editor Area */}
        <TextEditor 
          content={content}
          setContent={setContent}
          documentTitle={documentTitle}
          setDocumentTitle={setDocumentTitle}
        />
      </div>

      {/* Right Sidebar - AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default CoursePanel;
