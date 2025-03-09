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

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedText, setSelectedText] = useState("");

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
    setLeftPanelSize(sizes[0]);
    setMiddlePanelSize(sizes[1]);
    setRightPanelSize(sizes[2]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
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

      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="hidden md:flex h-full w-full">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full w-full"
        >
          <ResizablePanel 
            defaultSize={leftPanelSize} 
            minSize={15} 
            maxSize={30}
            className="bg-white border-r"
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
              />

              <WorkspaceTools />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-200 hover:bg-primary transition-colors" />

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
            minSize={15} 
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
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        fixed z-30 w-64 h-screen border-r flex flex-col bg-white 
                        transition-transform duration-300 ease-in-out`}>
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
  );
};

export default CoursePanel;
