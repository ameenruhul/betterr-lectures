import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Presentation } from "lucide-react";

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
}

const TextEditor = ({
  content,
  setContent,
  documentTitle,
  setDocumentTitle,
}: TextEditorProps) => {
  // Store individual slide contents when editing in slides view
  const [slideContents, setSlideContents] = useState<string[]>(() => 
    content ? content.split('\n\n') : [""]
  );

  // Update the main content when individual slides are edited
  const handleSlideContentChange = (index: number, newContent: string) => {
    const newSlideContents = [...slideContents];
    newSlideContents[index] = newContent;
    setSlideContents(newSlideContents);
    
    // Synchronize with the main content
    setContent(newSlideContents.join('\n\n'));
  };

  // Keep slides in sync when document content changes
  React.useEffect(() => {
    const newSlideContents = content ? content.split('\n\n') : [""];
    setSlideContents(newSlideContents);
  }, [content]);

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <Tabs defaultValue="document" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 border-b bg-white rounded-t-xl shadow-sm mb-0 flex-1 mr-4">
            <Input
              type="text"
              placeholder="Untitled document"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-medium bg-transparent border-none focus:outline-none w-full hover:bg-gray-50 transition-colors p-2 rounded-md"
            />
          </div>
          
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Document</span>
            </TabsTrigger>
            <TabsTrigger value="slides" className="flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Slides</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="document" className="mt-0">
          <Card className="max-w-[850px] h-[1100px] mx-auto rounded-t-none shadow-md overflow-y-auto">
            <div className="h-full p-[60px] bg-white">
              <Textarea
                className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                placeholder="Type or paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="slides" className="mt-0">
          <div className="max-w-[850px] mx-auto">
            {slideContents.length > 0 ? (
              slideContents.map((slideContent, index) => (
                <Card key={index} className="mb-8 aspect-[16/9] shadow-md overflow-hidden">
                  <div className="h-full p-8 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
                    <Textarea
                      className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent text-center"
                      placeholder="Edit this slide..."
                      value={slideContent}
                      onChange={(e) => handleSlideContentChange(index, e.target.value)}
                    />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="aspect-[16/9] shadow-md overflow-hidden bg-white">
                <div className="h-full p-8 flex items-center justify-center">
                  <p className="text-gray-400">Your slides will appear here</p>
                </div>
              </Card>
            )}
            
            <div className="mt-4 flex justify-center">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  const newSlideContents = [...slideContents, "New slide"];
                  setSlideContents(newSlideContents);
                  setContent(newSlideContents.join('\n\n'));
                }}
              >
                Add Slide
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextEditor;
