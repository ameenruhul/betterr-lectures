
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
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

// Message types for the chat
type MessageType = {
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
};

const AIAssistant = () => {
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
      handleSendMessage();
    }
  };

  // Function to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-80 border-l flex flex-col bg-white shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
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
              value="builder"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300 data-[state=active]:shadow-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Builder
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

          <TabsContent value="builder" className="mt-4 space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start bg-white hover:bg-blue-50 transition-all duration-300 rounded-lg border border-gray-200 shadow-sm"
            >
              <PenSquare className="mr-2 h-4 w-4 text-primary" />
              New Document
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start bg-white hover:bg-blue-50 transition-all duration-300 rounded-lg border border-gray-200 shadow-sm"
            >
              <Download className="mr-2 h-4 w-4 text-primary" />
              Generate Content
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Messages Area */}
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
          
          {/* Example Builder Prompts */}
          {activeTab === "builder" && messages.length < 3 && (
            <div className="bg-blue-50/80 rounded-xl p-3 border border-blue-100 shadow-sm animate-fade-up mt-6">
              <p className="text-sm font-medium mb-2 text-primary">Quick Builder Prompts:</p>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/70 rounded-lg border border-gray-100 hover:bg-white hover:border-primary/20 transition-all duration-300 shadow-sm"
                  onClick={() => handleQuickPrompt("Create a lecture on Introduction to Neural Networks for today's AI class")}
                >
                  "Create a lecture on Introduction to Neural Networks for today's AI class"
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/70 rounded-lg border border-gray-100 hover:bg-white hover:border-primary/20 transition-all duration-300 shadow-sm"
                  onClick={() => handleQuickPrompt("Generate a study guide for Quantum Mechanics fundamentals")}
                >
                  "Generate a study guide for Quantum Mechanics fundamentals"
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
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
    </div>
  );
};

export default AIAssistant;
