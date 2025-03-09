
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Calendar, Search, Tag, Filter, Book } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JournalEntry {
  id: number;
  title: string;
  date: Date;
  content: string;
  tags: string[];
}

const ClassroomJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { 
      id: 1, 
      title: "Successful Group Project Introduction",
      date: new Date(2023, 10, 10),
      content: "Today's group project introduction went very well. Students were engaged and had lots of questions...",
      tags: ["Group Work", "Project", "Engagement"]
    },
    { 
      id: 2, 
      title: "Challenges with New Concept",
      date: new Date(2023, 10, 8),
      content: "Several students struggled with the concept of derivatives today. Need to revisit with more examples...",
      tags: ["Challenges", "Math", "Teaching Strategy"]
    },
    { 
      id: 3, 
      title: "Great Discussion on Literary Analysis",
      date: new Date(2023, 10, 5),
      content: "Excellent class discussion on 'To Kill a Mockingbird'. Students had insightful perspectives...",
      tags: ["Discussion", "Literature", "Success"]
    },
  ]);
  
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const addNewEntry = () => {
    if (newEntryTitle && selectedDate) {
      const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
      setEntries([...entries, {
        id: newId,
        title: newEntryTitle,
        date: selectedDate,
        content: newEntryContent,
        tags: selectedTags
      }]);
      setNewEntryTitle("");
      setNewEntryContent("");
      setSelectedTags([]);
    }
  };
  
  const addTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };
  
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const filteredEntries = entries.filter(entry => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query) ||
        entry.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });
  
  const actionButtons = (
    <Button onClick={addNewEntry} className="bg-red-violet-gradient" disabled={!newEntryTitle || !selectedDate}>
      <Plus className="mr-2 h-4 w-4" />
      New Entry
    </Button>
  );
  
  return (
    <PageLayout title="Classroom Journal" actionButtons={actionButtons}>
      <div className="space-y-6">
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="journal">Journal Entries</TabsTrigger>
            <TabsTrigger value="new">New Entry</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journal">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 pb-2">
                <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                  <Book className="mr-2 h-6 w-6 text-ai-magenta" />
                  Your Journal Entries
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search entries..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[200px] flex justify-between items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No journal entries found. Create your first entry!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEntries.map(entry => (
                      <Card key={entry.id} className="border border-gray-200 hover:border-indigo-200 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{entry.title}</h3>
                              <p className="text-sm text-gray-500">{format(entry.date, "MMMM d, yyyy")}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <p className="mt-3 text-sm text-gray-700 line-clamp-3">{entry.content}</p>
                          
                          {entry.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {entry.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="bg-gray-50">
                                  <Tag className="h-3 w-3 mr-1 text-ai-magenta" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="new">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 pb-2">
                <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                  <Plus className="mr-2 h-6 w-6 text-ai-magenta" />
                  Create New Journal Entry
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entry Title</label>
                    <Input
                      placeholder="Enter title for your journal entry"
                      value={newEntryTitle}
                      onChange={(e) => setNewEntryTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button onClick={addTag} variant="outline" disabled={!newTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedTags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50 flex items-center gap-1">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-red-500">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entry Content</label>
                    <textarea
                      className="w-full h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ai-magenta"
                      placeholder="Write your journal entry here..."
                      value={newEntryContent}
                      onChange={(e) => setNewEntryContent(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={addNewEntry} 
                      className="w-full bg-red-violet-gradient" 
                      disabled={!newEntryTitle || !selectedDate}
                    >
                      Save Journal Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 pb-2">
                <CardTitle className="flex items-center text-xl font-medium text-gray-800">
                  <FileText className="mr-2 h-6 w-6 text-ai-magenta" />
                  Teaching Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">This feature will analyze your journal entries to provide teaching insights.</p>
                  <p className="text-sm text-gray-400 mt-2">Coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ClassroomJournal;
