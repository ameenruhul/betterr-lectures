
import React, { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  File, 
  FileText, 
  List,
  ListChecks, 
  Plus, 
  Upload,
  Sparkles,
  Clipboard
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  duration: string;
  type: string;
  description: string;
}

const ClassPlanCreator = () => {
  const { toast } = useToast();
  const [className, setClassName] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Warm-up Discussion",
      duration: "10 mins",
      type: "Discussion",
      description: "Open-ended questions about previous lesson to activate prior knowledge"
    }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Previous Class Notes.pdf"
  ]);

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      title: "New Activity",
      duration: "15 mins",
      type: "Activity",
      description: "Describe the activity here"
    };
    setActivities([...activities, newActivity]);
  };

  const handleGeneratePlan = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of class plan you need",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const newActivities = [
        {
          id: Date.now().toString(),
          title: "Introduction: " + prompt.substring(0, 20) + "...",
          duration: "10 mins",
          type: "Lecture",
          description: "Brief introduction to the topic with key questions"
        },
        {
          id: (Date.now() + 100).toString(),
          title: "Group Activity",
          duration: "20 mins",
          type: "Group Work",
          description: "Students work in small groups to solve problem sets"
        },
        {
          id: (Date.now() + 200).toString(),
          title: "Class Discussion",
          duration: "15 mins",
          type: "Discussion",
          description: "Share group findings and consolidate learning points"
        }
      ];
      setActivities([...activities, ...newActivities]);
      setIsGenerating(false);
      
      toast({
        title: "Class Plan Generated",
        description: "Your AI-powered class plan is ready to review and edit"
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
      description: "Your class plan is being prepared for download"
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <Clipboard className="mr-2 h-5 w-5" />
          Class Plan Creator
        </h2>
        <p className="text-sm text-gray-500">Create and organize single-class activities with AI assistance</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Plan Builder */}
        <div className="w-2/3 flex flex-col border-r overflow-hidden">
          {/* Class Info */}
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Class Title</label>
                <Input 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g., Introduction to Photosynthesis"
                  className="bg-white shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Class Duration</label>
                <Input 
                  value={classDuration}
                  onChange={(e) => setClassDuration(e.target.value)}
                  placeholder="e.g., 50 minutes, 1.5 hours"
                  className="bg-white shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">Class Activities</h3>
              <Button 
                onClick={handleAddActivity}
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Activity
              </Button>
            </div>

            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full mr-2 text-sm font-medium">
                        {index + 1}
                      </span>
                      <h4 className="font-medium">{activity.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {activity.type}
                      </span>
                      <span className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        {activity.duration}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-700">{activity.description}</p>
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
                  <List className="mr-2 h-4 w-4" />
                  Templates
                </TabsTrigger>
              </TabsList>
            </div>

            {/* AI Builder Tab */}
            <TabsContent value="builder" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">What kind of class plan do you need?</label>
                <Textarea
                  placeholder="E.g., Create a 50-minute class plan for 10th grade Biology focusing on cellular respiration with hands-on activities..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-white shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Grade Level</label>
                <Select defaultValue="highschool">
                  <SelectTrigger className="bg-white shadow-sm">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Elementary School</SelectItem>
                    <SelectItem value="middleschool">Middle School</SelectItem>
                    <SelectItem value="highschool">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">Class Type</label>
                <Select defaultValue="standard">
                  <SelectTrigger className="bg-white shadow-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Classroom</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="discussion">Discussion-based</SelectItem>
                    <SelectItem value="remote">Remote/Virtual</SelectItem>
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
                    Generate Class Plan
                  </>
                )}
              </Button>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="resources" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Suggested Templates</h3>
                <div className="space-y-3">
                  {["5E Learning Cycle", "Flipped Classroom", "Problem-Based Learning", "Station Rotation"].map((template, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-3 bg-white cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <h4 className="font-medium text-gray-800">{template}</h4>
                      <p className="text-xs text-gray-500 mt-1">Ready-to-use class plan structure</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Uploaded Resources</h3>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClassPlanCreator;
