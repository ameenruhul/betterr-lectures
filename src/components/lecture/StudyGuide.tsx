
import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  ListChecks, 
  MessageSquare, 
  Brain,
  PenSquare,
  Check,
  Plus,
  Trash,
  Download,
  Copy,
  Wand2,
  Lightbulb,
  GraduationCap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Define types for guide sections and topics
type TopicType = {
  id: string;
  title: string;
  content: string;
  importance: "high" | "medium" | "low";
};

type SectionType = {
  id: string;
  title: string;
  topics: TopicType[];
};

const StudyGuide = () => {
  const { toast } = useToast();
  const [guideTitle, setGuideTitle] = useState("Untitled Study Guide");
  const [sections, setSections] = useState<SectionType[]>([
    {
      id: "section-1",
      title: "Main Concepts",
      topics: [
        {
          id: "topic-1",
          title: "Key Definition",
          content: "Enter your key definition here...",
          importance: "high"
        }
      ]
    }
  ]);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [activeTopic, setActiveTopic] = useState<string>("topic-1");
  const [previewMode, setPreviewMode] = useState(false);
  
  // Function to add a new section
  const handleAddSection = () => {
    const newSection: SectionType = {
      id: `section-${Date.now()}`,
      title: "New Section",
      topics: []
    };
    
    setSections([...sections, newSection]);
    setActiveSection(newSection.id);
  };
  
  // Function to add a new topic to a section
  const handleAddTopic = (sectionId: string) => {
    const newTopic: TopicType = {
      id: `topic-${Date.now()}`,
      title: "New Topic",
      content: "Enter content here...",
      importance: "medium"
    };
    
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          topics: [...section.topics, newTopic]
        };
      }
      return section;
    }));
    
    setActiveTopic(newTopic.id);
  };
  
  // Function to update section title
  const handleUpdateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title: newTitle };
      }
      return section;
    }));
  };
  
  // Function to update topic
  const handleUpdateTopic = (
    sectionId: string, 
    topicId: string, 
    field: keyof TopicType, 
    value: string | TopicType["importance"]
  ) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          topics: section.topics.map(topic => {
            if (topic.id === topicId) {
              return { ...topic, [field]: value };
            }
            return topic;
          })
        };
      }
      return section;
    }));
  };
  
  // Function to delete a section
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    if (activeSection === sectionId && sections.length > 1) {
      setActiveSection(sections[0].id !== sectionId ? sections[0].id : sections[1].id);
    }
  };
  
  // Function to delete a topic
  const handleDeleteTopic = (sectionId: string, topicId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          topics: section.topics.filter(topic => topic.id !== topicId)
        };
      }
      return section;
    }));
  };
  
  // Function to generate study guide with AI
  const handleGenerateWithAI = () => {
    setAiSuggesting(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedSections: SectionType[] = [
        {
          id: "section-ai-1",
          title: "Core Concepts",
          topics: [
            {
              id: "topic-ai-1",
              title: "Definition and Importance",
              content: "A comprehensive explanation of the main subject and why it matters in the field.",
              importance: "high"
            },
            {
              id: "topic-ai-2",
              title: "Historical Development",
              content: "Brief timeline showing how the concept evolved over time and key milestones.",
              importance: "medium"
            }
          ]
        },
        {
          id: "section-ai-2",
          title: "Key Principles",
          topics: [
            {
              id: "topic-ai-3",
              title: "Main Principle One",
              content: "Detailed explanation of the first fundamental principle with examples.",
              importance: "high"
            },
            {
              id: "topic-ai-4",
              title: "Main Principle Two",
              content: "Explanation of the second principle with practical applications.",
              importance: "high"
            }
          ]
        },
        {
          id: "section-ai-3",
          title: "Applications and Case Studies",
          topics: [
            {
              id: "topic-ai-5",
              title: "Real-world Application",
              content: "Example of how this concept is applied in professional settings.",
              importance: "medium"
            },
            {
              id: "topic-ai-6",
              title: "Case Study Analysis",
              content: "Breakdown of a specific case where these principles were successfully implemented.",
              importance: "medium"
            }
          ]
        },
        {
          id: "section-ai-4",
          title: "Common Misconceptions",
          topics: [
            {
              id: "topic-ai-7",
              title: "Misconception vs. Reality",
              content: "Addressing common misunderstandings about the topic and clarifying the facts.",
              importance: "low"
            }
          ]
        },
        {
          id: "section-ai-5",
          title: "Review Questions",
          topics: [
            {
              id: "topic-ai-8",
              title: "Conceptual Questions",
              content: "What are the three main components of this concept? How do they interact?\nExplain the difference between X and Y approaches.",
              importance: "high"
            },
            {
              id: "topic-ai-9",
              title: "Applied Questions",
              content: "Given scenario X, how would you apply principle Y?\nWhat challenges might arise when implementing this concept in industry Z?",
              importance: "medium"
            }
          ]
        }
      ];
      
      setSections(generatedSections);
      setActiveSection("section-ai-1");
      setActiveTopic("topic-ai-1");
      setAiSuggesting(false);
      
      toast({
        title: "Study Guide Generated",
        description: "AI has created a comprehensive study guide structure for you to customize",
      });
    }, 2000);
  };
  
  // Helper function to get active section
  const getActiveSection = () => {
    return sections.find(section => section.id === activeSection);
  };
  
  // Helper function to get active topic
  const getActiveTopic = () => {
    const section = getActiveSection();
    if (!section) return null;
    
    return section.topics.find(topic => topic.id === activeTopic);
  };
  
  // Export study guide as PDF
  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "Study guide has been exported as PDF",
    });
  };
  
  // Copy to clipboard
  const handleCopyToClipboard = () => {
    // Generate text format of the study guide
    let guideText = `# ${guideTitle}\n\n`;
    
    sections.forEach(section => {
      guideText += `## ${section.title}\n\n`;
      
      section.topics.forEach(topic => {
        guideText += `### ${topic.title} (${topic.importance} priority)\n`;
        guideText += `${topic.content}\n\n`;
      });
    });
    
    navigator.clipboard.writeText(guideText);
    
    toast({
      title: "Copied to Clipboard",
      description: "Study guide content has been copied to clipboard",
    });
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left panel - Sections and Topics */}
      <div className="w-full md:w-1/3 border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-medium">Study Guide Creator</h2>
          </div>
          
          <div className="relative mb-4">
            <Input
              value={guideTitle}
              onChange={(e) => setGuideTitle(e.target.value)}
              className="pr-16 font-medium"
              placeholder="Enter guide title..."
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleAddSection}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Section
            </Button>
            <Button 
              onClick={handleGenerateWithAI}
              disabled={aiSuggesting}
              size="sm"
              className="flex-1"
            >
              {aiSuggesting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-transparent rounded-full"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Generate Guide
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="border rounded-lg overflow-hidden"
            >
              <div 
                className={cn(
                  "flex items-center justify-between p-3 cursor-pointer",
                  section.id === activeSection ? "bg-primary/10 border-b" : "hover:bg-gray-50"
                )}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="flex items-center">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs text-gray-500 ml-2">
                    ({section.topics.length} {section.topics.length === 1 ? 'topic' : 'topics'})
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                  >
                    <Trash className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              
              {section.id === activeSection && (
                <div className="p-2 space-y-1 bg-gray-50">
                  {section.topics.map((topic) => (
                    <div 
                      key={topic.id} 
                      className={cn(
                        "p-2 rounded cursor-pointer flex items-center justify-between",
                        topic.id === activeTopic ? "bg-white border shadow-sm" : "hover:bg-white"
                      )}
                      onClick={() => setActiveTopic(topic.id)}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-2 h-2 rounded-full mr-2",
                          topic.importance === "high" ? "bg-red-500" : 
                          topic.importance === "medium" ? "bg-yellow-500" : "bg-green-500"
                        )}></div>
                        <div className="text-sm">{topic.title}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTopic(section.id, topic.id);
                        }}
                      >
                        <Trash className="h-3 w-3 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-gray-500 text-sm"
                    onClick={() => handleAddTopic(section.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Topic
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={handleExportPDF}
            >
              <Download className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right panel - Content Editor */}
      <div className="w-full md:w-2/3 flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "h-8",
                !previewMode && "bg-primary text-white hover:bg-primary/90"
              )}
              onClick={() => setPreviewMode(false)}
            >
              <PenSquare className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "h-8",
                previewMode && "bg-primary text-white hover:bg-primary/90"
              )}
              onClick={() => setPreviewMode(true)}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Low</span>
            </div>
          </div>
        </div>
        
        {previewMode ? (
          // Preview Mode
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">{guideTitle}</h1>
              
              {sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 pb-2 border-b">{section.title}</h2>
                  
                  {section.topics.map((topic) => (
                    <div key={topic.id} className="mb-4">
                      <div className="flex items-center mb-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full mr-2",
                          topic.importance === "high" ? "bg-red-500" : 
                          topic.importance === "medium" ? "bg-yellow-500" : "bg-green-500"
                        )}></div>
                        <h3 className="text-lg font-medium">{topic.title}</h3>
                      </div>
                      <div className="pl-4 text-gray-700 whitespace-pre-line">
                        {topic.content}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="flex-1 p-4 overflow-y-auto">
            {getActiveSection() && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <Input
                    value={getActiveSection()?.title || ""}
                    onChange={(e) => handleUpdateSectionTitle(activeSection, e.target.value)}
                    className="font-medium"
                  />
                </div>
                
                {getActiveTopic() && (
                  <>
                    <Separator className="my-4" />
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Topic Title
                      </label>
                      <Input
                        value={getActiveTopic()?.title || ""}
                        onChange={(e) => handleUpdateTopic(activeSection, activeTopic, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Importance Level
                        </label>
                        <div className="flex space-x-2">
                          {["high", "medium", "low"].map((level) => (
                            <Button
                              key={level}
                              variant="outline"
                              size="sm"
                              className={cn(
                                "h-7",
                                getActiveTopic()?.importance === level && "bg-primary text-white hover:bg-primary/90"
                              )}
                              onClick={() => handleUpdateTopic(
                                activeSection, 
                                activeTopic, 
                                "importance", 
                                level as TopicType["importance"]
                              )}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <Textarea
                        value={getActiveTopic()?.content || ""}
                        onChange={(e) => handleUpdateTopic(activeSection, activeTopic, "content", e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const updatedContent = getActiveTopic()?.content + "\n\n" + "• Important point to remember\n• Key concept definition\n• Formula or equation";
                          handleUpdateTopic(activeSection, activeTopic, "content", updatedContent);
                        }}
                      >
                        <ListChecks className="h-4 w-4 mr-1" />
                        Add Bullet Points
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // Simulate AI improving the content
                          setTimeout(() => {
                            const currentContent = getActiveTopic()?.content || "";
                            const improvedContent = currentContent + "\n\n" + "[AI-enhanced content with better structure and clarity]";
                            handleUpdateTopic(activeSection, activeTopic, "content", improvedContent);
                            
                            toast({
                              title: "Content Enhanced",
                              description: "AI has improved your study content",
                            });
                          }, 1000);
                        }}
                      >
                        <Wand2 className="h-4 w-4 mr-1" />
                        Improve with AI
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGuide;
