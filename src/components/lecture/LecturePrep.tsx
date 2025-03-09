
import React, { useState } from "react";
import { 
  BookMarked, 
  BookOpen, 
  Copy, 
  Download, 
  FileText, 
  ListChecks, 
  MessageSquare, 
  Presentation, 
  Search, 
  Star, 
  ThumbsUp,
  Sparkles,
  ExternalLink,
  Clock,
  Brain,
  Send,
  Lightbulb,
  WandSparkles,
  GraduationCap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AIAssistant from "./AIAssistant";

const LecturePrep = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("materials");
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiResponses, setAIResponses] = useState<{id: string, content: string}[]>([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  
  // Simulated content
  const studyMaterials = [
    {
      id: "1",
      title: "Fundamentals of Machine Learning",
      type: "Article",
      source: "MIT Press Journal",
      saved: true,
      date: "2023-05-15"
    },
    {
      id: "2",
      title: "Neural Networks and Deep Learning",
      type: "Video Lecture",
      source: "Stanford Online",
      saved: false,
      date: "2023-06-22"
    },
    {
      id: "3",
      title: "Practical Applications of AI",
      type: "Case Study",
      source: "Harvard Business Review",
      saved: true,
      date: "2023-04-10"
    },
    {
      id: "4",
      title: "Ethics in Artificial Intelligence",
      type: "Research Paper",
      source: "Nature",
      saved: false,
      date: "2023-07-05"
    }
  ];
  
  const keyPoints = [
    "Introduction to supervised vs. unsupervised learning",
    "Differentiating classification and regression problems",
    "Understanding feature extraction and selection",
    "Implementing cross-validation strategies",
    "Balancing bias-variance tradeoff",
    "Ethics and responsible AI implementation"
  ];

  const recentUpdates = [
    {
      id: "1",
      title: "New Research on Active Learning Strategies",
      source: "Journal of Educational Psychology",
      date: "2 days ago",
      summary: "Recent study shows that active learning increases student engagement by 45% compared to traditional lectures."
    },
    {
      id: "2",
      title: "Meta-Analysis of Learning Retention",
      source: "Educational Research Review",
      date: "1 week ago",
      summary: "Students retain information 2.5x better when it's connected to real-world problems."
    },
    {
      id: "3",
      title: "Digital Tools in STEM Education",
      source: "Technology & Learning Journal",
      date: "2 weeks ago",
      summary: "Integration of collaborative digital tools improved problem-solving skills by 32%."
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter keywords to search for relevant study materials",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Searching for materials",
      description: `Finding resources related to "${searchQuery}"`
    });
  };

  const handleSaveMaterial = (id: string) => {
    toast({
      title: "Material saved",
      description: "Added to your saved resources library"
    });
  };

  const handleGenerateNotes = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setNotes(`# Lecture Preparation Notes

## Key Concepts to Cover
- Supervised vs. unsupervised learning approaches
- Feature extraction techniques for machine learning
- Practical applications in different industries
- Ethical considerations when implementing AI systems

## Recommended Flow
1. Start with real-world examples to engage students
2. Introduce theoretical foundations
3. Demonstrate a simple implementation
4. Discuss ethical implications
5. Provide hands-on exercise

## Potential Student Questions
- How to select appropriate algorithms for specific problems?
- What are the computational requirements for different approaches?
- How to evaluate model performance effectively?`);
      
      setIsGenerating(false);
      
      toast({
        title: "Lecture notes generated",
        description: "AI-powered notes are ready for your review"
      });
    }, 2000);
  };

  const handleAIPrompt = () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Ask AI for help with your lecture preparation",
        variant: "destructive"
      });
      return;
    }

    setIsAIThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const newResponse = {
        id: Date.now().toString(),
        content: `Based on your interest in "${aiPrompt}", here are some key teaching points to consider:

1. **Main Concepts:** Break down complex topics into digestible chunks, starting with foundational concepts
2. **Visual Aids:** Use diagrams and visualizations to explain abstract relationships
3. **Real-world Examples:** Connect theoretical knowledge to practical applications
4. **Student Activities:** Include 2-3 interactive exercises to reinforce learning
5. **Assessment:** Consider using formative assessment techniques like concept mapping

Would you like me to expand on any of these points or suggest specific resources?`
      };
      
      setAIResponses(prev => [...prev, newResponse]);
      setAIPrompt("");
      setIsAIThinking(false);
      
      toast({
        title: "AI response generated",
        description: "Check out the new suggestions for your lecture"
      });
    }, 2500);
  };

  const handleAIAssistantToggle = () => {
    setShowAIAssistant(!showAIAssistant);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <GraduationCap className="mr-2 h-5 w-5" />
          Lecture Preparation
        </h2>
        <p className="text-sm text-gray-500">Research, organize, and prepare your teaching materials with AI assistance</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Study Materials */}
        <div className="w-1/2 flex flex-col border-r overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b bg-gray-50">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for study materials, papers, videos..."
                className="pr-20 bg-white shadow-sm"
              />
              <Button 
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
          </div>

          {/* Materials Tabs */}
          <Tabs defaultValue="materials" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="flex justify-start px-4 pt-3 border-b">
              <TabsTrigger 
                value="materials" 
                className="h-9 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent data-[state=active]:shadow-none"
              >
                <BookMarked className="h-4 w-4 mr-2" />
                Study Materials
              </TabsTrigger>
              <TabsTrigger 
                value="updates" 
                className="h-9 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent data-[state=active]:shadow-none"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Research Updates
              </TabsTrigger>
            </TabsList>
            
            {/* Study Materials Content */}
            <TabsContent value="materials" className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-700">Study Materials</h3>
                <div className="text-xs text-gray-500">{studyMaterials.length} resources found</div>
              </div>

              <div className="space-y-3">
                {studyMaterials.map((material) => (
                  <div 
                    key={material.id} 
                    className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-primary">{material.title}</h4>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs font-medium mr-2">
                            {material.type}
                          </span>
                          <span>{material.source}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSaveMaterial(material.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Star className={cn(
                          "h-4 w-4", 
                          material.saved ? "fill-amber-400 text-amber-400" : "text-gray-400"
                        )} />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Added {material.date}
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ExternalLink className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Copy className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Download className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Research Updates Content */}
            <TabsContent value="updates" className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-700">Latest Research in Teaching & Learning</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <WandSparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Find More Research
                </Button>
              </div>

              <div className="space-y-3">
                {recentUpdates.map((update) => (
                  <div 
                    key={update.id} 
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-primary">{update.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">New</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {update.source} • {update.date}
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{update.summary}</p>
                    
                    <div className="flex mt-3 space-x-2">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                        Save to Notes
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        View Full Paper
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 ml-auto"
                        onClick={() => {
                          setAIPrompt(`Explain key teaching strategies based on the research: "${update.title}"`);
                          setActiveTab("ai");
                        }}
                      >
                        <Brain className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        Ask AI to Explain
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Prep Tools */}
        <div className="w-1/2 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-4 pt-4 border-b">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1 rounded-lg backdrop-blur mb-4">
                <TabsTrigger 
                  value="keypoints"
                  className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
                >
                  <ListChecks className="mr-2 h-4 w-4" />
                  Key Points
                </TabsTrigger>
                <TabsTrigger 
                  value="notes"
                  className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="ai"
                  className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Help
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Key Points Tab */}
            <TabsContent value="keypoints" className="flex-1 p-4 overflow-y-auto">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Essential Concepts</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs h-8"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    Generate More
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {keyPoints.map((point, index) => (
                    <div 
                      key={index} 
                      className="flex p-3 border rounded-lg bg-white"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 font-medium text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-800">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Teaching Approaches</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 border rounded-lg bg-white">
                    <h4 className="font-medium mb-1">Problem-Based Learning</h4>
                    <p className="text-gray-600">Present real-world problems for students to solve using AI principles</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-white">
                    <h4 className="font-medium mb-1">Flipped Classroom</h4>
                    <p className="text-gray-600">Assign reading/videos before class, use class time for discussion and practice</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-white">
                    <h4 className="font-medium mb-1">Collaborative Learning</h4>
                    <p className="text-gray-600">Form small groups to work through implementation challenges together</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">Lecture Notes</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      toast({
                        title: "Notes exported",
                        description: "Your notes have been copied to clipboard"
                      });
                    }}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      toast({
                        title: "Notes downloaded",
                        description: "Your notes have been saved as markdown"
                      });
                    }}
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write or generate lecture notes here..."
                  className="flex-1 resize-none min-h-[300px] font-mono text-sm bg-white shadow-sm"
                />
              </div>

              <Button 
                onClick={handleGenerateNotes} 
                disabled={isGenerating}
                className={cn(
                  "mt-3", 
                  isGenerating && "bg-primary/70"
                )}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full"></div>
                    Generating Notes...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Lecture Notes
                  </>
                )}
              </Button>
            </TabsContent>

            {/* AI Help Tab */}
            <TabsContent value="ai" className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">AI Teaching Assistant</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleAIAssistantToggle}
                >
                  {showAIAssistant ? "Hide AI Assistant" : "Open Full Assistant"}
                  <MessageSquare className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
              
              <div className="bg-blue-50/50 rounded-lg p-3 mb-3 border border-blue-100">
                <p className="text-sm text-blue-700">
                  <Brain className="h-4 w-4 inline-block mr-1.5" />
                  Ask AI to help with lecture planning, research questions, or explaining complex topics
                </p>
              </div>

              <div className="flex-1 overflow-y-auto mb-3 space-y-3">
                {aiResponses.map((response) => (
                  <div key={response.id} className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <Brain className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary">AI Teaching Assistant</span>
                    </div>
                    <div className="text-sm whitespace-pre-line">
                      {response.content}
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
                
                {aiResponses.length === 0 && !isAIThinking && (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-gray-600 text-sm">Ask AI to help with your lecture preparation</p>
                    <p className="text-gray-500 text-xs mt-1">Example: "Simplify complex machine learning concepts for beginners"</p>
                  </div>
                )}
                
                {isAIThinking && (
                  <div className="bg-white p-3 rounded-lg border shadow-sm animate-pulse">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <Brain className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary">AI Teaching Assistant</span>
                    </div>
                    <div className="flex space-x-1 my-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <div className="h-4 bg-gray-100 rounded mt-2"></div>
                    <div className="h-4 bg-gray-100 rounded mt-2 w-3/4"></div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Textarea
                  value={aiPrompt}
                  onChange={(e) => setAIPrompt(e.target.value)}
                  placeholder="Ask AI for help with your lecture preparation..."
                  className="min-h-[80px] max-h-[120px] resize-none pr-12 rounded-lg border shadow-sm"
                />
                <Button
                  className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={handleAIPrompt}
                  disabled={isAIThinking || !aiPrompt.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* AI Assistant Sidebar */}
        {showAIAssistant && <AIAssistant />}
      </div>
    </div>
  );
};

export default LecturePrep;
