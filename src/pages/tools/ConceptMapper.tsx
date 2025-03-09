
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Plus, Save, Share, ArrowDown, ArrowRight, X, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Concept {
  id: number;
  title: string;
  description: string;
  relationships: {
    to: number;
    label: string;
  }[];
}

const ConceptMapper = () => {
  const [concepts, setConcepts] = useState<Concept[]>([
    { 
      id: 1, 
      title: "Photosynthesis", 
      description: "Process by which plants convert light energy into chemical energy",
      relationships: [
        { to: 2, label: "produces" },
        { to: 3, label: "requires" }
      ]
    },
    { 
      id: 2, 
      title: "Glucose", 
      description: "Simple sugar that is an important energy source in living organisms",
      relationships: []
    },
    { 
      id: 3, 
      title: "Sunlight", 
      description: "Electromagnetic radiation from the sun",
      relationships: []
    }
  ]);
  const [newConceptTitle, setNewConceptTitle] = useState("");
  
  const addConcept = () => {
    if (newConceptTitle) {
      const newId = concepts.length > 0 ? Math.max(...concepts.map(c => c.id)) + 1 : 1;
      setConcepts([...concepts, { 
        id: newId, 
        title: newConceptTitle, 
        description: "", 
        relationships: [] 
      }]);
      setNewConceptTitle("");
    }
  };
  
  const actionButtons = (
    <div className="flex gap-2">
      <Button className="bg-red-violet-gradient">
        <Save className="mr-2 h-4 w-4" />
        Save Map
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
  
  return (
    <PageLayout title="Concept Mapper" actionButtons={actionButtons}>
      <div className="space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 pb-2">
            <CardTitle className="flex items-center text-xl font-medium text-gray-800">
              <Brain className="mr-2 h-6 w-6 text-ai-magenta" />
              Concept Map Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex space-x-2 mb-6">
              <Input
                placeholder="Enter new concept"
                value={newConceptTitle}
                onChange={(e) => setNewConceptTitle(e.target.value)}
              />
              <Button 
                onClick={addConcept} 
                className="bg-red-violet-gradient"
                disabled={!newConceptTitle}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Concept
              </Button>
            </div>
            
            <div className="bg-gray-50 border rounded-md min-h-[60vh] p-6 relative">
              {concepts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Brain className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No concepts yet. Add your first concept above.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {/* Concept root node */}
                  <div className="bg-emerald-100 border border-emerald-300 rounded-md p-4 w-64 text-center mb-8">
                    <h3 className="font-medium">{concepts[0].title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{concepts[0].description}</p>
                  </div>
                  
                  {/* Relationships */}
                  {concepts[0].relationships.map((rel, index) => {
                    const relatedConcept = concepts.find(c => c.id === rel.to);
                    if (!relatedConcept) return null;
                    
                    return (
                      <div key={index} className="flex flex-col items-center mb-4">
                        <div className="flex items-center mb-2">
                          <ArrowDown className="h-6 w-6 text-gray-400" />
                          <Badge className="mx-2 bg-red-violet-gradient">{rel.label}</Badge>
                        </div>
                        <div className="bg-blue-100 border border-blue-300 rounded-md p-4 w-64 text-center">
                          <h3 className="font-medium">{relatedConcept.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{relatedConcept.description}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Add more complex relationships here */}
                  <div className="mt-8 w-full">
                    <h3 className="font-medium text-center mb-4">All Concepts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {concepts.map(concept => (
                        <div
                          key={concept.id}
                          className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{concept.title}</h4>
                            <Button variant="ghost" size="sm" className="text-red-500 h-6 w-6 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            className="mt-2 text-sm"
                            placeholder="Add description"
                            value={concept.description}
                            onChange={(e) => {
                              setConcepts(concepts.map(c => 
                                c.id === concept.id ? { ...c, description: e.target.value } : c
                              ));
                            }}
                          />
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Relationships:</p>
                            {concept.relationships.length > 0 ? (
                              <div className="space-y-1">
                                {concept.relationships.map((rel, idx) => {
                                  const target = concepts.find(c => c.id === rel.to);
                                  return (
                                    <div key={idx} className="flex items-center text-xs">
                                      <ArrowRight className="h-3 w-3 text-gray-400 mr-1" />
                                      <span className="text-ai-magenta">{rel.label}</span>
                                      <span className="mx-1">→</span>
                                      <span>{target?.title || "Unknown"}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400">No relationships defined</p>
                            )}
                            <Button variant="outline" size="sm" className="mt-2 text-xs h-7 w-full">
                              <Plus className="h-3 w-3 mr-1" /> Add Relationship
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ConceptMapper;
