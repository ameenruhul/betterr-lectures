
import React from "react";
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
            {/* Convert content to slides */}
            {content.split('\n\n').map((slideContent, index) => (
              <Card key={index} className="mb-8 aspect-[16/9] shadow-md overflow-hidden">
                <div className="h-full p-8 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
                  <div className="text-center w-full">
                    {slideContent.split('\n').map((line, lineIndex) => {
                      // Make first line of each slide a heading
                      if (lineIndex === 0 && line.trim()) {
                        return <h2 key={lineIndex} className="text-2xl font-bold mb-4">{line}</h2>;
                      }
                      return <p key={lineIndex} className="mb-2">{line}</p>;
                    })}
                  </div>
                </div>
              </Card>
            ))}
            
            {content.trim() === '' && (
              <Card className="aspect-[16/9] shadow-md overflow-hidden bg-white">
                <div className="h-full p-8 flex items-center justify-center">
                  <p className="text-gray-400">Your slides will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextEditor;
