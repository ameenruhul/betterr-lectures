
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceTools from "@/components/lecture/WorkspaceTools";
import EditorToolbar from "@/components/lecture/EditorToolbar";
import TextEditor from "@/components/lecture/TextEditor";
import AIAssistant from "@/components/lecture/AIAssistant";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 z-20 p-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                      fixed md:relative z-10 w-64 h-screen border-r flex flex-col bg-white 
                      transition-transform duration-300 ease-in-out md:translate-x-0`}>
        {/* Navigation Header */}
        <ContentUploader 
          courseId={courseId} 
          lectureId={lectureId} 
          documentTitle={documentTitle}
          onBackClick={handleBackToLectures}
        />

        {/* Lecture Navigation */}
        <LectureNavigation 
          lectureId={lectureId} 
          onCloseSidebar={() => setSidebarOpen(false)}
        />

        {/* Workspace Features */}
        <WorkspaceTools />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-0"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area - Word Processor */}
      <div className="flex-1 flex flex-col md:ml-0 w-full">
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
