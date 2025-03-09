
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  MessageSquare, 
  Download,
  Check,
  Send,
  Sparkles,
  PenSquare,
  BookOpen,
  ListChecks,
  Search,
  Plus,
  Wand2,
  FileText,
  MessageCircle,
  Hammer,
  LayoutTemplate,
  FileEdit,
  Code,
  BookOpen as BookIcon,
  Image,
  File,
  ListChecks as QuizIcon,
  ClipboardList,
  Presentation
} from "lucide-react";
import { cn } from "@/lib/utils";

// Message types for the chat
type MessageType = {
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
};

type AIFeature = 
  | "chat"
  | "improveText" 
  | "summarize" 
  | "expand" 
  | "fixGrammar" 
  | "generateTitle"
  | "improveSlide"
  | "suggestLayout"
  | "generateNotes";

type AIMode = "chat" | "builder";

interface AIAssistantProps {
  onApplySuggestion?: (text: string) => void;
  documentContent?: string;
}

const AIAssistant = ({ 
  onApplySuggestion, 
  documentContent = ""
}: AIAssistantProps) => {
  const [activeTab, setActiveTab] = useState<AIMode>("chat");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      sender: "ai",
      text: "Hello! I'm your AI teaching assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState<AIFeature>("chat");
  const [textToProcess, setTextToProcess] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [contentType, setContentType] = useState<string>("lecture");

  // Reset content state when switching modes
  useEffect(() => {
    setInputValue("");
    setProcessedText("");
    setTextToProcess("");
  }, [activeTab]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessage: MessageType = {
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Generate AI response based on document context if available
    setIsTyping(true);
    setTimeout(() => {
      let aiResponse = "I'm analyzing your request. I can help you create content, generate quizzes, or answer questions about your course material.";
      
      // In chat mode, try to reference the document context
      if (activeTab === "chat" && documentContent) {
        if (inputValue.toLowerCase().includes("summarize")) {
          aiResponse = `Based on the document, here's a summary: ${documentContent.substring(0, 100)}...`;
        } else if (inputValue.toLowerCase().includes("key points")) {
          aiResponse = "Based on your document, the key points appear to be:\n• Point 1\n• Point 2\n• Point 3";
        } else if (inputValue.toLowerCase().includes("explain")) {
          aiResponse = `I'll explain this concept further based on your document content: ${documentContent.substring(0, 150)}...`;
        }
      }
      
      const aiResponseObj: MessageType = {
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponseObj]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle quick prompt selection
  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  // Handle keypress for sending message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeFeature === 'chat') {
        handleSendMessage();
      } else {
        handleProcessText();
      }
    }
  };

  // Handle creating content from a template
  const handleCreateContent = (templateType: string) => {
    setIsProcessing(true);
    setContentType(templateType);
    
    // Simulate content generation based on template
    setTimeout(() => {
      let result = "";
      
      switch (templateType) {
        case "lecture":
          result = "# Introduction to the Topic\n\n## Learning Objectives\n- Understand key concepts\n- Apply principles to real-world scenarios\n- Analyze case studies\n\n## Main Content\n1. Historical background\n2. Theoretical framework\n3. Practical applications\n\n## Conclusion\n- Summary of key points\n- Questions for discussion";
          break;
        case "quiz":
          result = "# Quiz: Topic Assessment\n\n1. What is the primary function of X?\n   a) Option A\n   b) Option B\n   c) Option C\n   d) Option D\n\n2. Which of the following best describes Y?\n   a) Description 1\n   b) Description 2\n   c) Description 3\n   d) Description 4";
          break;
        case "slide":
          result = "# Title Slide\n\n## Subtitle or Supporting Text\n\n---\n\n# Key Point 1\n\n- Supporting detail\n- Example or illustration\n- Connection to broader concept\n\n---\n\n# Key Point 2\n\n- Supporting evidence\n- Visual reference\n- Application";
          break;
        case "assignment":
          result = "# Assignment: Topic Application\n\n## Objectives\n- Demonstrate understanding of core concepts\n- Apply theoretical knowledge to practical scenarios\n- Develop analytical skills\n\n## Instructions\n1. Review material in Chapter X\n2. Complete exercises A, B, and C\n3. Submit a 500-word analysis";
          break;
        case "notes":
          result = "# Instructor Notes\n\n## Pre-class Preparation\n- Review latest research on X\n- Prepare examples for concept Y\n- Set up demonstration materials\n\n## During Class\n- Opening activity (10 min)\n- Main lecture (25 min)\n- Group activity (15 min)\n- Discussion and Q&A (10 min)";
          break;
        default:
          result = "# New Content\n\nAdd your content here...";
      }
      
      setProcessedText(result);
      setIsProcessing(false);
    }, 1500);
  };

  // Function to process text based on selected feature
  const handleProcessText = () => {
    if (!textToProcess.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let result = "";
      
      switch (activeFeature) {
        case 'improveText':
          result = `${textToProcess} [Enhanced with better vocabulary, clearer structure, and improved flow]`;
          break;
        case 'summarize':
          result = `Summary: ${textToProcess.split(' ').slice(0, Math.min(20, textToProcess.split(' ').length)).join(' ')}${textToProcess.split(' ').length > 20 ? '...' : ''}`;
          break;
        case 'expand':
          result = `${textToProcess}\n\nAdditional context and explanation: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
          break;
        case 'fixGrammar':
          result = textToProcess
            .replace(/\bi\b/g, "I")
            .replace(/\s{2,}/g, " ")
            .replace(/\b(am|is|are|was|were)\b\s+(\w+)ing/g, "$1 $2ing")
            .replace(/\b(dont|cant|wont|didnt)\b/g, (match) => match.charAt(0) + "o" + match.charAt(1) + "'t")
            .trim();
          break;
        case 'generateTitle':
          const words = textToProcess.split(' ').filter(word => word.length > 3);
          const randomWords = Array(3).fill(0).map(() => words[Math.floor(Math.random() * words.length)]);
          result = `${randomWords.join(' ')}`;
          break;
        case 'improveSlide':
          result = textToProcess
            .split('\n')
            .map(line => line.trim())
            .filter(line => line)
            .map(line => {
              // Add bullet points if not already there
              if (!line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*')) {
                return `• ${line}`;
              }
              return line;
            })
            .join('\n\n');
          break;
        case 'suggestLayout':
          // Simple logic to suggest layout
          if (textToProcess.toLowerCase().includes("title") || textToProcess.length < 50) {
            result = "Based on your content, I recommend using a 'Title' layout to make the main point stand out.";
          } else if (textToProcess.toLowerCase().includes("image") || textToProcess.includes("![")) {
            result = "Your content mentions images. I recommend using an 'Image' layout to showcase visuals prominently.";
          } else if (textToProcess.length > 200) {
            result = "Your content is detailed. I recommend using a 'Two-Column' layout to organize information clearly.";
          } else {
            result = "For this content, I recommend using the standard 'Content' layout for clear presentation.";
          }
          break;
        case 'generateNotes':
          const lines = textToProcess.split('\n').filter(line => line.trim());
          result = lines.map(line => `• Speaking point: ${line.trim().replace(/^[-•*]\s*/, '')}`).join('\n\n');
          break;
        default:
          result = "Processed text";
      }
      
      setProcessedText(result);
      setIsProcessing(false);
    }, 1500);
  };

  // Function to apply suggestions to the document
  const handleApplySuggestion = () => {
    if (onApplySuggestion && processedText) {
      onApplySuggestion(processedText);
      setProcessedText("");
      setTextToProcess("");
    }
  };

  // Function to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full h-full border-l flex flex-col bg-white shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* AI Assistant Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white">
        <h3 className="font-semibold mb-4 flex items-center text-primary">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          AI Teaching Assistant
        </h3>
        
        {/* Mode Switcher */}
        <Tabs defaultValue="chat" className="w-full" onValueChange={(value) => setActiveTab(value as AIMode)}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 p-1 rounded-lg backdrop-blur">
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat Mode
            </TabsTrigger>
            <TabsTrigger 
              value="builder"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
            >
              <LayoutTemplate className="mr-2 h-4 w-4" />
              Builder Mode
            </TabsTrigger>
          </TabsList>

          {/* Chat Mode Content */}
          <TabsContent value="chat" className="mt-4 space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start bg-white hover:bg-blue-50 transition-all duration-300 rounded-lg border border-gray-200 shadow-sm"
              onClick={() => {
                setMessages([{
                  sender: "ai",
                  text: "Hello! I'm your AI teaching assistant. How can I help you today?",
                  timestamp: new Date(),
                }]);
              }}
            >
              <Plus className="mr-2 h-4 w-4 text-primary" />
              New Chat
            </Button>
          </TabsContent>

          {/* Builder Mode Content */}
          <TabsContent value="builder" className="mt-4 space-y-4">
            <div className="text-sm text-gray-600 mb-2">
              Create new content from scratch:
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("lecture")}
              >
                <FileEdit className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Lecture</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("quiz")}
              >
                <QuizIcon className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Quiz</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("slide")}
              >
                <Presentation className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Slides</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("assignment")}
              >
                <ClipboardList className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Assignment</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("notes")}
              >
                <BookIcon className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Notes</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-auto py-4 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                onClick={() => handleCreateContent("custom")}
              >
                <File className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs font-medium">Custom</span>
              </Button>
            </div>
            
            <div className="h-px bg-gray-200 my-2"></div>
            
            <div className="text-sm text-gray-600 mb-2">
              Tools:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={activeFeature === 'improveText' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('improveText');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Improve Text
              </Button>
              <Button 
                variant={activeFeature === 'summarize' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('summarize');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <FileText className="mr-2 h-4 w-4" />
                Summarize
              </Button>
              <Button 
                variant={activeFeature === 'expand' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('expand');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <Plus className="mr-2 h-4 w-4" />
                Expand
              </Button>
              <Button 
                variant={activeFeature === 'fixGrammar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('fixGrammar');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <Check className="mr-2 h-4 w-4" />
                Fix Grammar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content Area */}
      {activeTab === "chat" ? (
        // Chat Messages Area
        <div 
          className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-blue-50/50 to-white/50"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-start space-x-3 animate-fade-up",
                  { "justify-end": message.sender === "user" }
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={cn(
                  "max-w-[80%]",
                  message.sender === "user" ? "order-first" : "flex-1"
                )}>
                  <div className={cn(
                    "rounded-2xl p-3 shadow-sm",
                    message.sender === "ai" 
                      ? "bg-white border border-gray-100" 
                      : "bg-primary text-white"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block px-2">
                    {message.sender === "ai" ? "AI" : "You"} • {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white">
                    <div className="h-4 w-4 text-gray-500 font-semibold text-xs">You</div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3 animate-fade-up">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Features Cards */}
            {messages.length < 2 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium text-gray-700 px-1">I can help you with:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                    onClick={() => handleQuickPrompt("Create a lecture outline for today's class")}
                  >
                    <PenSquare className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xs font-medium">Create Lectures</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                    onClick={() => handleQuickPrompt("Generate a quiz on the topic")}
                  >
                    <ListChecks className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xs font-medium">Build Quizzes</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                    onClick={() => handleQuickPrompt("Summarize this research paper")}
                  >
                    <BookOpen className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xs font-medium">Research Help</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center h-auto py-3 px-2 bg-white hover:bg-blue-50 transition-all shadow-sm border border-gray-200 rounded-xl"
                    onClick={() => handleQuickPrompt("Search for information on")}
                  >
                    <Search className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xs font-medium">Find Information</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Builder Mode Area
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <div className="space-y-4">
            {!processedText ? (
              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  {activeFeature === 'improveText' && "Improve Text"}
                  {activeFeature === 'summarize' && "Summarize Content"}
                  {activeFeature === 'expand' && "Expand Content"}
                  {activeFeature === 'fixGrammar' && "Fix Grammar"}
                  {activeFeature === 'generateTitle' && "Generate Title"}
                  {activeFeature === 'improveSlide' && "Improve Slide"}
                  {activeFeature === 'suggestLayout' && "Suggest Layout"}
                  {activeFeature === 'generateNotes' && "Generate Speaker Notes"}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {activeFeature === 'improveText' && "Enhance your writing with better vocabulary, structure, and flow."}
                  {activeFeature === 'summarize' && "Create a concise summary of your content."}
                  {activeFeature === 'expand' && "Add details and explanations to make your content more comprehensive."}
                  {activeFeature === 'fixGrammar' && "Correct grammar, spelling, and punctuation errors."}
                  {activeFeature === 'generateTitle' && "Create a catchy title based on your content."}
                  {activeFeature === 'improveSlide' && "Optimize your slide content for better presentation."}
                  {activeFeature === 'suggestLayout' && "Get layout recommendations based on your slide content."}
                  {activeFeature === 'generateNotes' && "Create speaker notes to accompany your slide."}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-1 text-primary" />
                  {contentType === 'lecture' && "Lecture Template"}
                  {contentType === 'quiz' && "Quiz Template"}
                  {contentType === 'slide' && "Slide Template"}
                  {contentType === 'assignment' && "Assignment Template"}
                  {contentType === 'notes' && "Notes Template"}
                  {contentType === 'custom' && "Custom Content"}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {contentType === 'lecture' && "A structured lecture outline with learning objectives, content sections, and conclusion."}
                  {contentType === 'quiz' && "A formatted quiz with multiple-choice questions to assess student understanding."}
                  {contentType === 'slide' && "A set of slides with title and content sections for presentation."}
                  {contentType === 'assignment' && "A complete assignment with objectives, instructions, and submission details."}
                  {contentType === 'notes' && "Instructor notes with pre-class preparation and in-class activities."}
                  {contentType === 'custom' && "Custom content generated from scratch."}
                </p>
              </div>
            )}
            
            {!processedText && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeFeature === 'generateTitle' ? "Enter content to generate a title from:" : "Paste your text here:"}
                </label>
                <Textarea
                  value={textToProcess}
                  onChange={(e) => setTextToProcess(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Enter text to ${activeFeature === 'improveText' ? 'improve' : activeFeature}...`}
                  className="min-h-[100px] border rounded-md"
                />
              </div>
            )}
            
            {!processedText && (
              <div className="flex justify-end">
                <Button 
                  onClick={handleProcessText}
                  disabled={isProcessing || !textToProcess.trim()}
                  className="flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 flex space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Process with AI
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {processedText && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Generated Content:</h5>
                <div className="bg-white border rounded-md p-3 mb-3">
                  <p className="text-sm whitespace-pre-wrap">{processedText}</p>
                </div>
                <div className="flex space-x-2">
                  {onApplySuggestion && (
                    <Button 
                      onClick={handleApplySuggestion}
                      className="flex-1 flex items-center justify-center"
                      variant="default"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Apply to Document
                    </Button>
                  )}
                  <Button 
                    onClick={() => {
                      setProcessedText("");
                      setTextToProcess("");
                    }}
                    className="flex items-center justify-center"
                    variant="outline"
                  >
                    Create New
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Input */}
      {activeTab === "chat" && (
        <div className="p-3 border-t bg-white">
          <div className="relative rounded-lg border bg-gray-50 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything or describe what to create..."
              className="min-h-[60px] max-h-[200px] border-0 bg-transparent focus-visible:ring-0 text-sm p-3 rounded-lg resize-none"
            />
            <Button 
              size="sm"
              className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 rounded-lg transition-all h-8 w-8 p-0"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
