
import React, { useState } from "react";
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
  FileText
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

interface AIAssistantProps {
  onApplySuggestion?: (text: string) => void;
}

const AIAssistant = ({ onApplySuggestion }: AIAssistantProps = {}) => {
  const [activeTab, setActiveTab] = useState("chat");
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
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: MessageType = {
        sender: "ai",
        text: "I'm analyzing your request. I can help you create content, generate quizzes, or answer questions about your course material.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
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
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 p-1 rounded-lg backdrop-blur">
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="tools"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4 space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start bg-white hover:bg-blue-50 transition-all duration-300 rounded-lg border border-gray-200 shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4 text-primary" />
              New Chat
            </Button>
          </TabsContent>

          <TabsContent value="tools" className="mt-4 space-y-2">
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

            <div className="h-px bg-gray-200 my-2"></div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={activeFeature === 'improveSlide' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('improveSlide');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Improve Slide
              </Button>
              <Button 
                variant={activeFeature === 'suggestLayout' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('suggestLayout');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Layout
              </Button>
              <Button 
                variant={activeFeature === 'generateNotes' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('generateNotes');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Speaker Notes
              </Button>
              <Button 
                variant={activeFeature === 'generateTitle' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => {
                  setActiveFeature('generateTitle');
                  setProcessedText('');
                }}
                className="justify-start"
              >
                <ListChecks className="mr-2 h-4 w-4" />
                Generate Title
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
        // AI Tools Area
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <div className="space-y-4">
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
            
            {processedText && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-2">AI Result:</h5>
                <div className="bg-white border rounded-md p-3 mb-3">
                  <p className="text-sm whitespace-pre-wrap">{processedText}</p>
                </div>
                {onApplySuggestion && (
                  <Button 
                    onClick={handleApplySuggestion}
                    className="w-full flex items-center justify-center"
                    variant="outline"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Apply to {activeFeature.includes('Slide') ? 'Slide' : 'Document'}
                  </Button>
                )}
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
