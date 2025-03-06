
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  MessageSquare, 
  Download,
  Check,
} from "lucide-react";

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState("chat");
  
  return (
    <div className="w-80 border-l flex flex-col bg-white shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)]">
      {/* AI Assistant Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-4 flex items-center text-gray-700">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          AI Assistant
        </h3>
        
        {/* Mode Switcher */}
        <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="builder"
              className="data-[state=active]:bg-white rounded-md transition-all duration-300"
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
            className="w-full justify-start bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg"
          >
            <MessageSquare className="mr-2 h-4 w-4 text-primary" />
            New Chat
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg"
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
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
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
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 shadow-sm animate-fade-up" style={{ animationDelay: "100ms" }}>
            <p className="text-sm font-medium mb-2 text-gray-700">Quick Builder Prompts:</p>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/50 rounded-lg hover:bg-white transition-all duration-300"
              >
                "Create a lecture on Introduction to Neural Networks for today's AI class"
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm h-auto py-2 text-left normal-case bg-white/50 rounded-lg hover:bg-white transition-all duration-300"
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
            className="flex-1 rounded-lg border bg-gray-50 focus:bg-white transition-all text-sm px-3 py-2"
          />
          <Button 
            size="icon" 
            className="bg-primary hover:bg-primary/90 rounded-lg transition-all"
          >
            <MessageSquare className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
