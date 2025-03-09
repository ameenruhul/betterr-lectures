
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceTools from "@/components/lecture/WorkspaceTools";
import TextEditor from "@/components/lecture/TextEditor";
import AIAssistant from "@/components/lecture/AIAssistant";
import SharedCourseSidebar from "@/components/lecture/SharedCourseSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

// Sample lecture sections with content for the text editor
const SAMPLE_LECTURE_CONTENT = `
# Introduction
This is the introduction section of the lecture. It provides an overview of the main topics.

# Key Concepts
These are the key concepts that will be covered in this lecture:
- Concept 1: Definition and explanation
- Concept 2: Important details
- Concept 3: Practical applications

# Example Problems
Here are some example problems to illustrate the concepts:
1. Example problem 1
2. Example problem 2
3. Example problem 3

# Discussion Questions
Questions for class discussion:
- How does concept 1 relate to real-world situations?
- What are the limitations of concept 2?
- How might we improve on concept 3?

# Practice Quiz
1. What is the main purpose of concept 1?
2. How does concept 2 differ from concept 3?
3. When would you apply concept 3 in a practical scenario?

# Additional Resources
- Recommended textbook chapters
- Online articles
- Additional practice problems
`;

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(SAMPLE_LECTURE_CONTENT);
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Course Content");
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedText, setSelectedText] = useState("");

  const [leftPanelSize, setLeftPanelSize] = useState(20);
  const [middlePanelSize, setMiddlePanelSize] = useState(60);
  const [rightPanelSize, setRightPanelSize] = useState(20);

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

  // Use SharedCourseSidebar for the lectures panel route
  if (window.location.pathname === "/lectures-panel") {
    return (
      <div className="h-screen flex overflow-hidden">
        <div className={cn("w-64 flex-shrink-0", !sidebarOpen && "hidden")}>
          <SharedCourseSidebar onCloseSidebar={() => setSidebarOpen(false)} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {!sidebarOpen && (
            <div className="p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <div className="flex h-full">
            <div className="w-64 border-r bg-gray-50">
              <LectureNavigation 
                lectureId={lectureId || "default"} 
                onCloseSidebar={() => {}}
              />
            </div>
            
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Lecture Content</h1>
              <div className="prose max-w-none">
                <h2 id="introduction" className="scroll-mt-16">Introduction</h2>
                <p>This is the introduction section of the lecture. It provides an overview of the main topics.</p>
                
                <h2 id="key-concepts" className="scroll-mt-16 mt-8">Key Concepts</h2>
                <p>These are the key concepts that will be covered in this lecture:</p>
                <ul>
                  <li><strong>Concept 1:</strong> Definition and explanation</li>
                  <li><strong>Concept 2:</strong> Important details</li>
                  <li><strong>Concept 3:</strong> Practical applications</li>
                </ul>
                
                <h2 id="examples" className="scroll-mt-16 mt-8">Example Problems</h2>
                <p>Here are some example problems to illustrate the concepts:</p>
                <ol>
                  <li>Example problem 1</li>
                  <li>Example problem 2</li>
                  <li>Example problem 3</li>
                </ol>
                
                <h2 id="discussion" className="scroll-mt-16 mt-8">Discussion Questions</h2>
                <p>Questions for class discussion:</p>
                <ul>
                  <li>How does concept 1 relate to real-world situations?</li>
                  <li>What are the limitations of concept 2?</li>
                  <li>How might we improve on concept 3?</li>
                </ul>
                
                <h2 id="quiz" className="scroll-mt-16 mt-8">Practice Quiz</h2>
                <ol>
                  <li>What is the main purpose of concept 1?</li>
                  <li>How does concept 2 differ from concept 3?</li>
                  <li>When would you apply concept 3 in a practical scenario?</li>
                </ol>
                
                <h2 id="resources" className="scroll-mt-16 mt-8">Additional Resources</h2>
                <ul>
                  <li>Recommended textbook chapters</li>
                  <li>Online articles</li>
                  <li>Additional practice problems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original CoursePanel for other routes
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

export default CoursePanel;
