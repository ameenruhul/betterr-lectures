
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  BookOpen, 
  HelpCircle,
  ClipboardList,
  Book,
  Download,
  MessageSquare,
  Bot,
  FileUp,
  Presentation,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link,
  Type
} from "lucide-react";

const CoursePanel = () => {
  const [content, setContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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
    // Handle file upload logic here
    console.log("Dropped files:", files);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r flex flex-col">
        {/* Content Upload Section */}
        <div className="p-4 border-b flex-1">
          <h3 className="font-semibold mb-4">Content Upload</h3>
          <div
            className={`h-[calc(100%-2rem)] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${
              isDragging ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-sm text-center text-muted-foreground mb-2">
              Drag & drop your files here
            </p>
            <p className="text-xs text-center text-muted-foreground mb-4">
              or
            </p>
            <Button variant="outline" className="w-full">
              Browse Files
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Supports: PDF, DOCX, PPTX, TXT
            </p>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="p-4 border-t bg-accent/50">
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
        <div className="border-b flex flex-col bg-accent/50">
          <div className="p-2 flex items-center justify-between border-b">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Type className="h-4 w-4" />
              </Button>
              <select className="text-sm border rounded px-2 py-1 bg-background">
                <option>Normal text</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
              <select className="text-sm border rounded px-2 py-1 bg-background">
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Calibri</option>
              </select>
              <select className="text-sm border rounded w-16 px-2 py-1 bg-background">
                <option>11</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
              </select>
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
          <div className="p-2 flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-2" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignRight className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-2" />
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-2" />
            <Button variant="ghost" size="sm">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Link className="h-4 w-4" />
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
