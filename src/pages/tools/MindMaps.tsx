
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Plus, Save, Share, Trash, Undo } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceToolButton from "@/components/lecture/WorkspaceToolButton";

const MindMaps = () => {
  const [mindMaps, setMindMaps] = useState([
    { id: 1, title: "Physics Concepts", lastEdited: "2 days ago" },
    { id: 2, title: "Literature Themes", lastEdited: "1 week ago" },
    { id: 3, title: "Historical Timeline", lastEdited: "3 weeks ago" },
  ]);
  const [newMapTitle, setNewMapTitle] = useState("");
  
  const createNewMap = () => {
    if (newMapTitle) {
      const newId = mindMaps.length > 0 ? Math.max(...mindMaps.map(m => m.id)) + 1 : 1;
      setMindMaps([...mindMaps, { id: newId, title: newMapTitle, lastEdited: "Just now" }]);
      setNewMapTitle("");
    }
  };
  
  const actionButtons = (
    <div className="flex gap-2">
      <Button className="bg-red-violet-gradient">
        <Save className="mr-2 h-4 w-4" />
        Save Map
      </Button>
      <Button variant="outline">
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
  
  return (
    <PageLayout title="Mind Maps" actionButtons={actionButtons}>
      <div className="space-y-6">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Mind Map Editor</TabsTrigger>
            <TabsTrigger value="library">Map Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 pb-2">
                <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                  <Network className="mr-2 h-6 w-6 text-ai-magenta" />
                  Mind Map Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-2 mb-6">
                  <Input
                    placeholder="Untitled Mind Map"
                    value={newMapTitle}
                    onChange={(e) => setNewMapTitle(e.target.value)}
                  />
                  <Button 
                    onClick={createNewMap} 
                    className="bg-red-violet-gradient"
                    disabled={!newMapTitle}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>
                
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md h-[60vh] flex items-center justify-center">
                  <div className="text-center p-6">
                    <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Mind Map Canvas</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-4">
                      Create interactive mind maps to visualize subject connections and help students grasp complex relationships between concepts.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-1 h-4 w-4" /> Add Node
                      </Button>
                      <Button variant="outline" size="sm">
                        Connect Nodes
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Undo className="mr-1 h-4 w-4" /> Undo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="library">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 pb-2">
                <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                  <Network className="mr-2 h-6 w-6 text-ai-magenta" />
                  Your Mind Maps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mindMaps.map((map) => (
                    <Card key={map.id} className="overflow-hidden border hover:border-ai-magenta/30 hover:shadow-md transition-all cursor-pointer group">
                      <div className="bg-gradient-to-r from-gray-100 to-blue-50 p-4 h-40 flex items-center justify-center">
                        <Network className="h-12 w-12 text-blue-500 group-hover:text-ai-magenta transition-colors" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{map.title}</h3>
                            <p className="text-xs text-gray-500">Last edited: {map.lastEdited}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="overflow-hidden border border-dashed hover:border-ai-magenta/30 hover:shadow-md transition-all cursor-pointer">
                    <div className="bg-gray-50 p-4 h-40 flex flex-col items-center justify-center">
                      <Plus className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-center">Create New Mind Map</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MindMaps;
