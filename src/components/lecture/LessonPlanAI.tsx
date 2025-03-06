
import React, { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  File, 
  FileText, 
  GraduationCap, 
  ListChecks, 
  Plus, 
  Upload,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  title: string;
  duration: string;
  objectives: string[];
  resources: string[];
}

const LessonPlanAI = () => {
  const { toast } = useToast();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [isGenerating, setIsGenerating] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "1",
      title: "Introduction to Neural Networks",
      duration: "45 mins",
      objectives: ["Understand the core concepts of neural networks", "Identify key components of neural architecture"],
      resources: ["Textbook Chapter 3", "Online simulation"]
    }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Course Syllabus.pdf",
    "Previous Lecture Notes.docx"
  ]);

  const handleAddTopic = () => {
    const newTopic = {
      id: Date.now().toString(),
      title: "New Topic",
      duration: "30 mins",
      objectives: ["Define learning objective"],
      resources: ["Add resource"]
    };
    setTopics([...topics, newTopic]);
  };

  const handleGeneratePlan = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of lesson plan you need",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const newTopics = [
        {
          id: Date.now().toString(),
          title: "AI Generated Topic: " + prompt.substring(0, 20) + "...",
          duration: "60 mins",
          objectives: ["Understand core concepts", "Apply knowledge to real problems"],
          resources: ["AI recommended textbook", "Interactive exercise"]
        }
      ];
      setTopics([...topics, ...newTopics]);
      setIsGenerating(false);
      
      toast({
        title: "Lesson Plan Generated",
        description: "Your AI-powered lesson plan is ready to review and edit"
      });
    }, 2000);
  };

  const handleFileUpload = () => {
    toast({
      title: "File upload feature",
      description: "This feature will allow you to upload reference materials"
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format}`,
      description: "Your lesson plan is being prepared for download"
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <BookOpen className="mr-2 h-5 w-5" />
          Lesson Plan AI
        </h2>
        <p className="text-sm text-gray-500">Create and organize comprehensive lesson plans with AI assistance</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Plan Builder */}
        <div className="w-2/3 flex flex-col border-r overflow-hidden">
          {/* Course Info */}
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Course Title</label>
                <Input 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g., Introduction to Data Science"
                  className="bg-white shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Total Duration</label>
                <Input 
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  placeholder="e.g., 10 weeks, 30 hours"
                  className="bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">Topics & Modules</h3>
              <Button 
                onClick={handleAddTopic}
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Topic
              </Button>
            </div>

            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full mr-2 text-sm font-medium">
                        {index + 1}
                      </span>
                      <h4 className="font-medium">{topic.title}</h4>
                    </div>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                      {topic.duration}
                    </div>
                  </div>
                  
                  {/* Objectives */}
                  <div className="mb-2">
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Learning Objectives:</h5>
                    <ul className="text-sm pl-5 space-y-1">
                      {topic.objectives.map((objective, i) => (
                        <li key={i} className="list-disc text-gray-700">{objective}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Resources:</h5>
                    <ul className="text-sm pl-5 space-y-1">
                      {topic.resources.map((resource, i) => (
                        <li key={i} className="list-disc text-gray-700">{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="border rounded-lg p-3 bg-white shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-5 bg-gray-200 rounded w-48"></div>
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Button 
                onClick={() => handleExport("PDF")}
                variant="outline" 
                className="bg-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                onClick={() => handleExport("DOCX")}
                variant="outline"
                className="bg-white"
              >
                <File className="h-4 w-4 mr-2" />
                Export DOCX
              </Button>
              <Button className="ml-auto">
                Save Plan
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant & Resources */}
        <div className="w-1/3 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 p-1 rounded-lg backdrop-blur">
                <TabsTrigger 
                  value="builder"
                  className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Builder
                </TabsTrigger>
                <TabsTrigger 
                  value="resources"
                  className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>

            {/* AI Builder Tab */}
            <TabsContent value="builder" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">What kind of lesson plan do you need?</label>
                <Textarea
                  placeholder="E.g., Create a 4-week lesson plan for Introduction to Machine Learning for undergraduate students..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Educational Level</label>
                <Select defaultValue="undergraduate">
                  <SelectTrigger className="bg-white shadow-sm">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="k12">K-12</SelectItem>
                    <SelectItem value="highschool">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Course Format</label>
                <Select defaultValue="blended">
                  <SelectTrigger className="bg-white shadow-sm">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inperson">In-Person</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="blended">Blended</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGeneratePlan} 
                disabled={isGenerating}
                className={cn(
                  "mt-auto", 
                  isGenerating && "bg-primary/70"
                )}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Lesson Plan
                  </>
                )}
              </Button>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Uploaded Materials</h3>
                <div className="border rounded-lg bg-white overflow-hidden mb-4">
                  <ul className="divide-y">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center p-3 hover:bg-gray-50">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{file}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={handleFileUpload}
                  variant="outline" 
                  className="w-full bg-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Materials
                </Button>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Recommended Resources</h3>
                <div className="space-y-2">
                  {["Educational Psychology Guide", "Assessment Design", "Bloom's Taxonomy"].map((resource, index) => (
                    <div 
                      key={index} 
                      className="border rounded p-3 bg-white hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-gray-800 text-sm">{resource}</h4>
                      <p className="text-xs text-gray-500">Interactive content • 15 min read</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanAI;
