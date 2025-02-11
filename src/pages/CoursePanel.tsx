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
  Type,
  Table,
  Palette,
  Highlighter,
  Undo,
  Redo,
  LineHeight,
  IndentDecrease,
  IndentIncrease,
  LucideProps,
  Text
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
        {/* Main Toolbar */}
        <div className="border-b bg-accent/50">
          {/* File and Edit Options */}
          <div className="p-2 border-b flex items-center space-x-4">
            <Button variant="ghost" size="sm">File</Button>
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">View</Button>
            <Button variant="ghost" size="sm">Insert</Button>
            <Button variant="ghost" size="sm">Format</Button>
            <Button variant="ghost" size="sm">Tools</Button>
            <div className="flex-1" />
            <Button variant="outline" size="sm">
              <FileUp className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Formatting Toolbar */}
          <div className="p-2 flex flex-col gap-2">
            {/* Row 1: Undo/Redo, Font, Size */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-px h-4 bg-border mx-2" />
              <select className="text-sm border rounded px-2 py-1 bg-background w-40">
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Calibri</option>
                <option>Georgia</option>
                <option>Helvetica</option>
              </select>
              <select className="text-sm border rounded w-20 px-2 py-1 bg-background">
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>24</option>
                <option>36</option>
              </select>
            </div>

            {/* Row 2: Text Formatting */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Palette className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Highlighter className="h-4 w-4" />
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
                <Text className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <IndentDecrease className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <IndentIncrease className="h-4 w-4" />
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
                <Table className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Title */}
        <div className="p-2 border-b">
          <input
            type="text"
            placeholder="Untitled document"
            className="text-lg font-medium bg-transparent border-none focus:outline-none w-full"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <Card className="max-w-[850px] h-[1100px] mx-auto shadow-lg">
            <div className="h-full p-[60px]">
              <textarea
                className="w-full h-full resize-none border-none focus:outline-none bg-transparent"
                placeholder="Type or paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
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
