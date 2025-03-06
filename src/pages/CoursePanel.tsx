import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
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
  IndentDecrease,
  IndentIncrease,
  Text,
  GraduationCap,
  FileQuestion,
  CheckSquare,
  FileText,
  Brain,
  NotebookPen,
  BookText,
  Microscope,
  Sparkles,
  Save,
  Check,
  ChevronLeft,
  Video,
  LayoutList
} from "lucide-react";

const CoursePanel = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState(lectureId ? `Lecture ${lectureId}` : "Untitled document");
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();

  const handleBackToLectures = () => {
    if (courseId) {
      navigate(`/courses/${courseId}/lectures`);
    } else {
      navigate("/dashboard");
    }
  };

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
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) ready for processing`,
    });
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
      <div className="w-64 border-r flex flex-col bg-white shadow-[15px_0_30px_-15px_rgba(0,0,0,0.1)]">
        {/* Navigation Header */}
        <div className="p-4 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToLectures} 
            className="mb-4 text-gray-600 hover:text-gray-900 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {lectureId ? "Back to Lectures" : "Back to Courses"}
          </Button>
          
          {lectureId && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-primary">LECTURE {lectureId}</h3>
              <h2 className="text-lg font-bold">{documentTitle}</h2>
            </div>
          )}
          
          <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
            <Upload className="h-4 w-4 mr-2 text-primary" />
            Content Upload
          </h3>
          
          {/* Content Upload Area */}
          <div
            className={`h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
              isDragging 
                ? "border-primary bg-primary/5 shadow-[inset_0_0_10px_rgba(37,99,235,0.2)]" 
                : "border-gray-200 bg-gray-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className={`h-8 w-8 mb-2 transition-colors duration-300 ${isDragging ? "text-primary" : "text-gray-400"}`} />
            <p className="text-xs text-center text-gray-600 mb-2">
              Drag files or
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] transition-all"
            >
              Browse
            </Button>
          </div>
        </div>

        {/* Lecture Navigation (only show if we're in a lecture) */}
        {lectureId && (
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
              <LayoutList className="h-4 w-4 mr-2 text-primary" />
              Lecture Navigation
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Video className="h-4 w-4 mr-2 text-primary" />
                Video Lecture
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2 text-emerald-500" />
                Reading Materials
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileQuestion className="h-4 w-4 mr-2 text-amber-500" />
                Practice Questions
              </Button>
            </div>
          </div>
        )}

        {/* Workspace Features */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          <h3 className="font-semibold mb-2 text-sm text-gray-500 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            WORKSPACE TOOLS
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Lesson Plan */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Lesson Plan</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Create comprehensive lesson plans</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Lecture Prep */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Lecture Prep</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Prepare lecture materials</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Create Quiz */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <FileQuestion className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Create Quiz</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Generate new quizzes</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Quiz Solver */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <CheckSquare className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Quiz Solver</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Get answers for quiz questions</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Assignment Questions */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <FileText className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Assignment</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Create assignments</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Assignment Solver */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <Brain className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Assignment Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Get assignment solutions</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Study Guide */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <NotebookPen className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Study Guide</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Create student study guides</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Research Updates */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-xl border-none"
                  >
                    <Microscope className="h-8 w-8 text-primary" />
                    <span className="text-xs text-center">Research</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Get latest research updates</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Main Content Area - Word Processor */}
      <div className="flex-1 flex flex-col">
        {/* Main Toolbar */}
        <div className="border-b bg-white shadow-sm">
          {/* File and Edit Options */}
          <div className="p-2 border-b flex items-center space-x-2">
            <div className="flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-gray-100 transition-colors"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save document</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                View
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                Insert
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                Format
              </Button>
            </div>
            
            <div className="flex-1" />
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadPDF}
              className="shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all"
            >
              <Download className="mr-2 h-4 w-4 text-primary" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCreatePPTX}
              className="shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all"
            >
              <Presentation className="mr-2 h-4 w-4 text-primary" />
              PPTX
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all"
            >
              <FileUp className="mr-2 h-4 w-4 text-primary" />
              Share
            </Button>
          </div>

          {/* Formatting Toolbar */}
          <div className="p-2 flex flex-col gap-2 bg-gray-50">
            {/* Row 1: Undo/Redo, Font, Size */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="rounded-md bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-md bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-px h-4 bg-gray-300 mx-2" />
              <select className="text-sm border rounded px-2 py-1 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] w-40">
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Calibri</option>
                <option>Georgia</option>
                <option>Helvetica</option>
              </select>
              <select className="text-sm border rounded w-20 px-2 py-1 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]">
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
              <ToggleGroup type="multiple" className="bg-white p-1 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="color" aria-label="Select color" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Palette className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="highlight" aria-label="Highlight text" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Highlighter className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <div className="w-px h-4 bg-gray-300 mx-2" />
              
              <ToggleGroup type="single" className="bg-white p-1 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]">
                <ToggleGroupItem value="left" aria-label="Align left" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <div className="w-px h-4 bg-gray-300 mx-2" />
              
              <ToggleGroup type="multiple" className="bg-white p-1 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]">
                <ToggleGroupItem value="list" aria-label="Bullet list" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="orderedList" aria-label="Numbered list" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="indent-decrease" aria-label="Decrease indent" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <IndentDecrease className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="indent-increase" aria-label="Increase indent" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <IndentIncrease className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <div className="w-px h-4 bg-gray-300 mx-2" />
              
              <ToggleGroup type="multiple" className="bg-white p-1 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]">
                <ToggleGroupItem value="image" aria-label="Insert image" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Image className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Insert table" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Table className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="link" aria-label="Insert link" className="rounded-sm data-[state=on]:bg-gray-100 data-[state=on]:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                  <Link className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Document Title */}
        <div className="p-2 border-b bg-white">
          <Input
            type="text"
            placeholder={lectureId ? `Lecture ${lectureId}` : "Untitled document"}
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="text-lg font-medium bg-transparent border-none focus:outline-none w-full hover:bg-gray-50 transition-colors p-2 rounded-md"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Card className="max-w-[850px] h-[1100px] mx-auto shadow-[6px_6px_12px_rgba(0,0,0,0.05),-6px_-6px_12px_rgba(255,255,255,0.8)] overflow-hidden">
            <div className="h-full p-[60px] bg-white">
              <Textarea
                className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                placeholder="Type or paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Right Sidebar - AI Assistant */}
      <div className="w-80 border-l flex flex-col bg-white shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)]">
        {/* AI Assistant Header */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4 flex items-center text-gray-700">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            AI Assistant
          </h3>
          
          {/* Mode Switcher */}
          <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]">
              <TabsTrigger 
                value="chat"
                className="data-[state=active]:shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)] data-[state=active]:bg-white rounded-md transition-all duration-300"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="builder"
                className="data-[state=active]:shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)] data-[state=active]:bg-white rounded-md transition-all duration-300"
              >
                <Bot className="mr-2 h-4 w-4" />
                Builder
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quick Actions */}
          <div className="space-y-2 mt-4">
            <Button 
              variant="outline" 
              className="w-full justify-start bg-white hover:bg-gray-50 shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.9)] active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-lg border-none"
            >
              <MessageSquare className="mr-2 h-4 w-4 text-primary" />
              New Chat
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start bg-white hover:bg-gray-50 shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.9)] active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] transition-all duration-300 rounded-lg border-none"
            >
              <Download className="mr-2 h-4 w-4 text-primary" />
              Generate Content
            </Button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex items-start space-x-3 animate-fade-up">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.9)]">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-3 shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)]">
                  <p className="text-sm">
                    Hello! I'm your AI teaching assistant. I can help you with:
                  </p>
                  <ul className="text-sm mt-2 space-y-1 text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                      Creating lecture materials
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                      Generating assignments
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                      Building study guides
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                      Research summaries
                    </li>
                  </ul>
                </div>
                <span className="text-xs text-gray-500 mt-1 ml-2">AI Assistant</span>
              </div>
            </div>

            {/* Example Builder Prompt */}
            <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 shadow-[2px_2px_5px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.9)] animate-fade-up" style={{ animationDelay: "100ms" }}>
              <p className="text-sm font-medium mb-2 text-gray-700">Quick Builder Prompts:</p>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/50 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.05),-1px_-1px_3px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.9)] hover:bg-white transition-all duration-300"
                >
                  "Create a lecture on Introduction to Neural Networks for today's AI class"
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/50 rounded-lg shadow-[1px_1px_3px_rgba(0,0,0,0.05),-1px_-1px_3px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.9)] hover:bg-white transition-all duration-300"
                >
                  "Generate a study guide for Quantum Mechanics fundamentals"
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask anything or describe what to create..."
              className="flex-1 rounded-lg border shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] bg-gray-50 focus:bg-white transition-all text-sm px-3 py-2"
            />
            <Button 
              size="icon" 
              className="bg-primary hover:bg-primary/90 rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)] transition-all"
            >
              <MessageSquare className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePanel;
