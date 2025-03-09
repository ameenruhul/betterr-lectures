
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
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Default panel sizes
  const [leftPanelSize, setLeftPanelSize] = useState(20); // 20% of the screen width
  const [middlePanelSize, setMiddlePanelSize] = useState(60); // 60% of the screen width
  const [rightPanelSize, setRightPanelSize] = useState(20); // 20% of the screen width

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

  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    setLeftPanelSize(sizes[0]);
    setMiddlePanelSize(sizes[1]);
    setRightPanelSize(sizes[2]);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
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

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Resizable Layout */}
      <div className="hidden md:flex h-full w-full">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full w-full"
        >
          {/* Left Sidebar */}
          <ResizablePanel 
            defaultSize={leftPanelSize} 
            minSize={15} 
            maxSize={30}
            className="bg-white border-r"
          >
            <div className="h-full flex flex-col overflow-hidden">
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
              />

              {/* Workspace Features */}
              <WorkspaceTools />
            </div>
          </ResizablePanel>

          {/* Resizable Handle for Left Panel */}
          <ResizableHandle withHandle className="bg-gray-200 hover:bg-primary transition-colors" />

          {/* Main Content Area */}
          <ResizablePanel 
            defaultSize={middlePanelSize} 
            minSize={40}
            className="bg-gray-50"
          >
            <div className="h-full flex flex-col overflow-hidden">
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
          </ResizablePanel>

          {/* Resizable Handle for Right Panel */}
          <ResizableHandle withHandle className="bg-gray-200 hover:bg-primary transition-colors" />

          {/* Right Sidebar - AI Assistant */}
          <ResizablePanel 
            defaultSize={rightPanelSize} 
            minSize={15} 
            maxSize={40}
            className="bg-white border-l"
          >
            <AIAssistant />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Layout (Non-resizable) */}
      <div className="md:hidden flex h-full">
        {/* Left Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        fixed z-30 w-64 h-screen border-r flex flex-col bg-white 
                        transition-transform duration-300 ease-in-out`}>
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

        {/* Main Content Area - Word Processor */}
        <div className="flex-1 flex flex-col w-full">
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

        {/* Right Sidebar - AI Assistant (hidden on mobile) */}
      </div>
    </div>
  );
};

export default CoursePanel;
