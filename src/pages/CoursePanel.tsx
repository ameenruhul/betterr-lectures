
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceTools from "@/components/lecture/WorkspaceTools";
import TextEditor from "@/components/lecture/TextEditor";
import AIAssistant from "@/components/lecture/AIAssistant";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const LecturesPanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedText, setSelectedText] = useState("");

  // Fixed default panel sizes to avoid warnings
  const [middlePanelSize, setMiddlePanelSize] = useState(70);
  const [rightPanelSize, setRightPanelSize] = useState(30);

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

  const handleApplyAISuggestion = (text: string) => {
    setContent(prevContent => {
      if (selectedText && prevContent.includes(selectedText)) {
        return prevContent.replace(selectedText, text);
      }
      return prevContent + "\n\n" + text;
    });
    
    toast({
      title: "AI suggestion applied",
      description: "Content has been updated with AI suggestions",
      duration: 2000,
    });
  };

  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length === 2) {
      setMiddlePanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Toggle Button */}
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div 
          className={cn(
            "bg-white border-r transition-all duration-300 z-20 md:static fixed h-full",
            sidebarOpen ? "w-64" : "w-0 -ml-64 md:w-0 md:ml-0"
          )}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <ContentUploader 
              courseId={courseId} 
              lectureId={lectureId} 
              documentTitle={documentTitle}
              onBackClick={handleBackToLectures}
            />

            <LectureNavigation 
              lectureId={lectureId} 
              onCloseSidebar={() => setSidebarOpen(false)}
            />

            <WorkspaceTools />
          </div>
        </div>

        {/* Content Area */}
        <div className={cn("flex-1", sidebarOpen ? "md:pl-0" : "")}>
          <div className="hidden md:flex h-full w-full">
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={handlePanelResize}
              className="h-full w-full"
            >
              {!sidebarOpen && (
                <div className="absolute top-2 left-2 z-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white"
                    onClick={toggleSidebar}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              )}
              
              <ResizablePanel 
                defaultSize={middlePanelSize} 
                minSize={40}
                className="bg-gray-50"
              >
                <div className="h-full flex flex-col overflow-hidden">
                  <TextEditor 
                    content={content}
                    setContent={setContent}
                    documentTitle={documentTitle}
                    setDocumentTitle={setDocumentTitle}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-gray-200 hover:bg-primary transition-colors" />

              <ResizablePanel 
                defaultSize={rightPanelSize} 
                minSize={20} 
                maxSize={40}
                className="bg-white border-l"
              >
                <AIAssistant 
                  onApplySuggestion={handleApplyAISuggestion}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="md:hidden flex h-full">
            <div className="flex-1 flex flex-col w-full">
              <TextEditor 
                content={content}
                setContent={setContent}
                documentTitle={documentTitle}
                setDocumentTitle={setDocumentTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesPanel;
