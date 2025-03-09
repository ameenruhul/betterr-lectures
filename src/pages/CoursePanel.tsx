
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TextEditor from "@/components/lecture/TextEditor";
import AIAssistant from "@/components/lecture/AIAssistant";
import SharedCourseSidebar from "@/components/lecture/SharedCourseSidebar";
import ClassPlanCreator from "@/components/lecture/ClassPlanCreator";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/contexts/OnboardingContext";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";

const LecturesPanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Teaching Material ${lectureId}` : "Untitled document");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const { currentStep, isFirstTime, nextStep } = useOnboarding();
  const [activeTab, setActiveTab] = useState<"editor" | "classplan">("editor");

  const aiAssistantRef = useRef<HTMLDivElement>(null);

  const [middlePanelSize, setMiddlePanelSize] = useState(70);
  const [rightPanelSize, setRightPanelSize] = useState(30);

  useEffect(() => {
    if (isFirstTime) {
      if (currentStep === 'lecture-editor') {
        document.querySelector('.ProseMirror')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const timer = setTimeout(() => {
          nextStep();
        }, 3000);
        return () => clearTimeout(timer);
      }
      
      if (currentStep === 'ai-assistant' && aiAssistantRef.current) {
        aiAssistantRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, isFirstTime, nextStep]);

  const handleSave = () => {
    toast({
      title: "Document saved",
      description: "Your teaching materials have been saved successfully",
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
    
    if (isFirstTime && currentStep === 'ai-assistant') {
      nextStep();
    }
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

      <div className="flex h-full w-full">
        <div 
          className={cn(
            "bg-white border-r transition-all duration-300 z-20 md:static fixed h-full",
            sidebarOpen ? "w-64" : "w-0 -ml-64 md:w-0 md:ml-0"
          )}
        >
          <SharedCourseSidebar onCloseSidebar={() => setSidebarOpen(false)} />
        </div>

        <div className={cn("flex-1", sidebarOpen ? "md:pl-0" : "")}>
          <div className="bg-white border-b p-3 flex items-center justify-between">
            {!sidebarOpen && (
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center space-x-4">
              <Button
                variant={activeTab === "editor" ? "default" : "outline"}
                onClick={() => setActiveTab("editor")}
                size="sm"
              >
                Document Editor
              </Button>
              <Button
                variant={activeTab === "classplan" ? "default" : "outline"}
                onClick={() => setActiveTab("classplan")}
                size="sm"
              >
                Class Plan Creator
              </Button>
            </div>
            
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
          
          <div className="hidden md:flex h-[calc(100%-56px)] w-full">
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={handlePanelResize}
              className="h-full w-full"
            >
              <ResizablePanel 
                defaultSize={middlePanelSize} 
                minSize={40}
                className="bg-gray-50"
              >
                <div className="h-full flex flex-col overflow-hidden">
                  {activeTab === "editor" ? (
                    <PathwayTooltip 
                      content="Create your teaching materials, lesson plans, and class activities here."
                      position="bottom"
                      step={5}
                      className="w-72"
                      nextStep="ai-assistant"
                      forceShow={isFirstTime && currentStep === 'lecture-editor'}
                    >
                      <TextEditor 
                        content={content}
                        setContent={setContent}
                        documentTitle={documentTitle}
                        setDocumentTitle={setDocumentTitle}
                      />
                    </PathwayTooltip>
                  ) : (
                    <ClassPlanCreator />
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-gray-200 hover:bg-primary transition-colors" />

              <ResizablePanel 
                defaultSize={rightPanelSize} 
                minSize={20} 
                maxSize={40}
                className="bg-gray-white border-l"
              >
                <div ref={aiAssistantRef}>
                  <PathwayTooltip 
                    content="Get AI suggestions for your lesson plans, quiz questions, and teaching activities."
                    position="left"
                    step={6}
                    className="w-72"
                    nextStep="complete"
                    forceShow={isFirstTime && currentStep === 'ai-assistant'}
                  >
                    <AIAssistant 
                      onApplySuggestion={handleApplyAISuggestion}
                    />
                  </PathwayTooltip>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="md:hidden flex h-[calc(100%-56px)]">
            <div className="flex-1 flex flex-col w-full">
              {activeTab === "editor" ? (
                <TextEditor 
                  content={content}
                  setContent={setContent}
                  documentTitle={documentTitle}
                  setDocumentTitle={setDocumentTitle}
                />
              ) : (
                <ClassPlanCreator />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesPanel;
