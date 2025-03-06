
import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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
      <div className="p-2 border-b bg-white rounded-t-xl shadow-sm mb-0">
        <Input
          type="text"
          placeholder="Untitled document"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          className="text-lg font-medium bg-transparent border-none focus:outline-none w-full hover:bg-gray-50 transition-colors p-2 rounded-md"
        />
      </div>
      <Card className="max-w-[850px] h-[1100px] mx-auto rounded-t-none shadow-md overflow-hidden">
        <div className="h-full p-[60px] bg-white">
          <Textarea
            className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent p-0"
            placeholder="Type or paste your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </Card>
    </div>
  );
};

export default TextEditor;
