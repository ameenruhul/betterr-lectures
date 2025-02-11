
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  FolderPlus, 
  FileText,
  BookOpen, 
  HelpCircle,
  ClipboardList,
  Book,
  Download,
  MessageSquare,
  Bot,
  FileUp,
  Presentation
} from "lucide-react";

const CoursePanel = () => {
  const [content, setContent] = useState("");

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r flex flex-col">
        {/* Content Upload Section */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Content Upload</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="mt-auto p-4 border-t bg-accent/50">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Lesson Plan
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ClipboardList className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Book className="mr-2 h-4 w-4" />
              Study Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Word Processor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b p-2 flex items-center justify-between bg-accent/50">
          <div className="flex items-center space-x-2">
            {/* Text formatting options would go here */}
            <Button variant="ghost" size="sm">B</Button>
            <Button variant="ghost" size="sm">I</Button>
            <Button variant="ghost" size="sm">U</Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <FileUp className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Presentation className="mr-2 h-4 w-4" />
              Export PPT
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Card className="h-full p-4">
            <textarea
              className="w-full h-full resize-none border-none focus:outline-none bg-transparent"
              placeholder="Start writing your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Card>
        </div>
      </div>

      {/* Right Sidebar - AI Chat */}
      <div className="w-80 border-l flex flex-col bg-accent/50">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4 flex items-center">
            <Bot className="mr-2 h-4 w-4" />
            AI Assistant
          </h3>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with AI
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Generate Content
            </Button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                Hello! I'm your AI assistant. I can help you generate and edit content. How can I help you today?
              </p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-md border p-2 bg-background"
            />
            <Button size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePanel;
