
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Save, FileUp, Bold, Italic, List, Image, Link, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LectureNotes = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: "Quantum Physics Lecture", lastEdited: "Yesterday", preview: "Introduction to quantum mechanics principles..." },
    { id: 2, title: "Literary Analysis Methods", lastEdited: "3 days ago", preview: "Techniques for analyzing poetry and prose..." },
    { id: 3, title: "World History Overview", lastEdited: "1 week ago", preview: "Major historical events of the 20th century..." },
  ]);
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [title, setTitle] = useState(activeDocument.title);
  
  const saveDocument = () => {
    // Logic to save the current document
    console.log("Saving document:", title);
  };
  
  const createNewDocument = () => {
    const newId = Math.max(...documents.map(d => d.id)) + 1;
    const newDoc = { 
      id: newId, 
      title: "Untitled Document", 
      lastEdited: "Just now", 
      preview: "Start writing your new document..." 
    };
    setDocuments([...documents, newDoc]);
    setActiveDocument(newDoc);
    setTitle(newDoc.title);
  };
  
  const actionButtons = (
    <div className="flex gap-2">
      <Button onClick={saveDocument} className="bg-red-violet-gradient">
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button variant="outline">
        <FileUp className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
  
  return (
    <PageLayout title="Lecture Notes" actionButtons={actionButtons}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 pb-2">
              <CardTitle className="flex items-center text-lg font-medium text-gray-800">
                <FileText className="mr-2 h-5 w-5 text-ai-magenta" />
                Your Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Button 
                onClick={createNewDocument} 
                className="w-full mb-4 bg-red-violet-gradient"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Document
              </Button>
              
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => {
                      setActiveDocument(doc);
                      setTitle(doc.title);
                    }}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      activeDocument.id === doc.id 
                        ? 'bg-purple-100 border border-purple-200' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium truncate">{doc.title}</h3>
                    <p className="text-xs text-gray-500">Edited: {doc.lastEdited}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-medium border-none focus-visible:ring-0 p-0 h-auto"
                placeholder="Document Title"
              />
              <p className="text-xs text-gray-500">Last edited: {activeDocument.lastEdited}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-2 bg-gray-50 rounded-md flex flex-wrap gap-2">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              
              <div 
                className="min-h-[60vh] border rounded-md p-4 focus:outline-none" 
                contentEditable
                suppressContentEditableWarning
              >
                <p>{activeDocument.preview}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default LectureNotes;
