
import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Search, 
  Download, 
  Copy, 
  ExternalLink,
  Filter,
  Clock,
  BookMarked,
  FileQuestion,
  DollarSign,
  Star,
  Check,
  ArrowRight,
  Link,
  Quote,
  Lightbulb,
  Bot,
  Send,
  Brain
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Types for research resources
type ResourceType = {
  id: string;
  title: string;
  authors: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  type: "article" | "book" | "journal" | "video" | "website";
  keywords: string[];
  saved: boolean;
  accessType: "open" | "subscription" | "paid";
};

type NoteType = {
  id: string;
  content: string;
  resourceId: string;
  timestamp: Date;
  tags: string[];
};

const Research = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [selectedResource, setSelectedResource] = useState<ResourceType | null>(null);
  const [activeTab, setActiveTab] = useState("search");
  const [filters, setFilters] = useState({
    type: "all",
    access: "all",
    sortBy: "relevance",
  });
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Sample resources for demo
  const sampleResources: ResourceType[] = [
    {
      id: "1",
      title: "The Impact of AI on Education: A Comprehensive Review",
      authors: "Johnson, A., Smith, B., & Williams, C.",
      source: "Journal of Educational Technology",
      date: "2023",
      summary: "This comprehensive review examines how artificial intelligence is transforming educational practices across different levels of schooling.",
      url: "https://example.com/journal1",
      type: "journal",
      keywords: ["artificial intelligence", "education", "technology", "teaching"],
      saved: true,
      accessType: "open"
    },
    {
      id: "2",
      title: "Cognitive Science and Learning: New Perspectives",
      authors: "Brown, D. & Miller, E.",
      source: "Oxford University Press",
      date: "2022",
      summary: "This book explores recent findings in cognitive science and their applications to learning environments and teaching methodologies.",
      url: "https://example.com/book1",
      type: "book",
      keywords: ["cognitive science", "learning", "cognition", "teaching methods"],
      saved: false,
      accessType: "paid"
    },
    {
      id: "3",
      title: "Student Engagement in Digital Learning Environments",
      authors: "Garcia, F.",
      source: "Education Technology Research",
      date: "2023",
      summary: "This study investigates factors that influence student engagement in digital and remote learning contexts.",
      url: "https://example.com/article1",
      type: "article",
      keywords: ["student engagement", "digital learning", "online education", "remote teaching"],
      saved: false,
      accessType: "subscription"
    },
    {
      id: "4",
      title: "Effective Teaching Strategies for STEM Education",
      authors: "Wilson, G. & Thompson, H.",
      source: "STEM Teaching Channel",
      date: "2023",
      summary: "This video series demonstrates practical teaching strategies for enhancing STEM education in K-12 classrooms.",
      url: "https://example.com/video1",
      type: "video",
      keywords: ["STEM", "teaching strategies", "K-12", "practical methods"],
      saved: true,
      accessType: "open"
    }
  ];
  
  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter keywords to search for resources",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      // Filter sample resources based on keywords in the search query
      const keywords = searchQuery.toLowerCase().split(/\s+/);
      const filteredResources = sampleResources.filter(resource => 
        keywords.some(keyword => 
          resource.title.toLowerCase().includes(keyword) || 
          resource.summary.toLowerCase().includes(keyword) ||
          resource.keywords.some(k => k.toLowerCase().includes(keyword))
        )
      );
      
      setResources(filteredResources);
      setIsSearching(false);
      
      toast({
        title: "Search Results",
        description: `Found ${filteredResources.length} resources matching your query`,
      });
    }, 1500);
  };
  
  // Handle saving a resource
  const handleSaveResource = (resourceId: string) => {
    setResources(resources.map(resource => {
      if (resource.id === resourceId) {
        return { ...resource, saved: !resource.saved };
      }
      return resource;
    }));
    
    toast({
      title: "Resource Saved",
      description: "Added to your saved resources library",
    });
  };
  
  // Handle selecting a resource to view
  const handleSelectResource = (resource: ResourceType) => {
    setSelectedResource(resource);
    setActiveTab("resource");
  };
  
  // Handle adding a note
  const handleAddNote = () => {
    if (!currentNote.trim() || !selectedResource) {
      toast({
        title: "Empty Note",
        description: "Please enter some content for your note",
        variant: "destructive"
      });
      return;
    }
    
    const newNote: NoteType = {
      id: `note-${Date.now()}`,
      content: currentNote,
      resourceId: selectedResource.id,
      timestamp: new Date(),
      tags: []
    };
    
    setNotes([...notes, newNote]);
    setCurrentNote("");
    
    toast({
      title: "Note Added",
      description: "Your research note has been saved",
    });
  };
  
  // Handle asking AI for research help
  const handleAskAI = () => {
    if (!aiQuestion.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter a question for the research assistant",
        variant: "destructive"
      });
      return;
    }
    
    setIsAiThinking(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      // Generate a contextual answer based on the question
      let answer = "";
      const question = aiQuestion.toLowerCase();
      
      if (question.includes("methodology") || question.includes("method")) {
        answer = "Research methodologies should align with your research questions. For educational research, consider:\n\n1. **Quantitative methods**: Surveys, experimental designs, and statistical analysis when you need numerical data or to test hypotheses.\n\n2. **Qualitative methods**: Interviews, observations, and case studies when exploring experiences or contexts in depth.\n\n3. **Mixed methods**: Combining both approaches for comprehensive understanding.\n\n4. **Design-based research**: Particularly useful for educational technology interventions.\n\nEnsure you consider ethical implications, participant demographics, and validity concerns regardless of methodology.";
      } 
      else if (question.includes("cite") || question.includes("citation") || question.includes("reference")) {
        answer = "For academic citations, follow these guidelines:\n\n**APA Style (7th edition)**:\n- Journal article: Author, A. A., & Author, B. B. (Year). Title of article. *Journal Name*, Volume(Issue), page range. DOI\n- Book: Author, A. A. (Year). *Title of book*. Publisher.\n\n**MLA Style (9th edition)**:\n- Journal article: Author, First Name. \"Title of Article.\" *Journal Name*, vol. #, no. #, Year, pp. page range.\n- Book: Author, First Name. *Title of Book*. Publisher, Year.\n\nAlways check your institution's preferred citation style and use citation management tools like Zotero or Mendeley to help organize references.";
      }
      else if (question.includes("literature review") || question.includes("background research")) {
        answer = "A strong literature review should:\n\n1. **Be comprehensive yet focused** - Cover all relevant research but maintain clear boundaries.\n\n2. **Be analytical not just descriptive** - Don't just summarize papers; analyze connections, contradictions, and gaps.\n\n3. **Be organized thematically** - Structure by concepts rather than just listing papers chronologically.\n\n4. **Establish context** - Show how your research fills a gap or extends existing knowledge.\n\n5. **Be current** - Include recent publications while acknowledging seminal works.\n\nStart with systematic database searches using key terms, then use citation tracking (both forward and backward) to expand your sources.";
      }
      else {
        answer = "Based on your question about \"" + aiQuestion + "\", here are some research considerations:\n\n1. **Narrow your focus** - Consider developing a more specific research question that addresses a clear gap in existing literature.\n\n2. **Explore multiple perspectives** - Look for contrasting viewpoints in the literature to develop a balanced understanding.\n\n3. **Consider methodology carefully** - Ensure your research methods align with your questions and theoretical framework.\n\n4. **Ethical considerations** - Remember to address potential ethical issues, especially when research involves human subjects.\n\nWould you like more specific guidance on any of these aspects?";
      }
      
      setAiAnswer(answer);
      setIsAiThinking(false);
    }, 2000);
  };
  
  // Handle applying filters
  const handleApplyFilters = () => {
    let filtered = [...sampleResources];
    
    // Apply type filter
    if (filters.type !== "all") {
      filtered = filtered.filter(resource => resource.type === filters.type);
    }
    
    // Apply access filter
    if (filters.access !== "all") {
      filtered = filtered.filter(resource => resource.accessType === filters.access);
    }
    
    // Apply sorting
    if (filters.sortBy === "date") {
      filtered.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    } else if (filters.sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setResources(filtered);
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} filtered resources`,
    });
  };
  
  // Format date for notes
  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left panel - Search and Filters */}
      <div className="w-full md:w-2/5 border-r flex flex-col h-full">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-medium">Research Assistant</h2>
          </div>
          
          <div className="relative mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, journals, books..."
              className="pr-16"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button 
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-20 border-t-transparent rounded-full"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <Label htmlFor="type-filter" className="text-xs">Resource Type</Label>
              <Select 
                value={filters.type} 
                onValueChange={(value) => setFilters({...filters, type: value})}
              >
                <SelectTrigger id="type-filter" className="h-8">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="journal">Journals</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="website">Websites</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="access-filter" className="text-xs">Access Type</Label>
              <Select 
                value={filters.access} 
                onValueChange={(value) => setFilters({...filters, access: value})}
              >
                <SelectTrigger id="access-filter" className="h-8">
                  <SelectValue placeholder="All Access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Access</SelectItem>
                  <SelectItem value="open">Open Access</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="sort-by" className="text-xs">Sort By</Label>
              <Select 
                value={filters.sortBy} 
                onValueChange={(value) => setFilters({...filters, sortBy: value})}
              >
                <SelectTrigger id="sort-by" className="h-8">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleApplyFilters}
              className="self-end h-8"
              variant="outline"
            >
              <Filter className="h-4 w-4 mr-1" />
              Apply Filters
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-3 pt-3 border-b">
            <TabsList className="grid w-full grid-cols-3 h-9">
              <TabsTrigger value="search" className="text-xs">
                <Search className="h-3 w-3 mr-1" />
                Search Results
              </TabsTrigger>
              <TabsTrigger value="resource" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                Resource View
              </TabsTrigger>
              <TabsTrigger value="ai" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                Research AI
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="search" className="flex-1 overflow-y-auto p-3 space-y-3">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSelectResource(resource)}
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-primary">{resource.title}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        {resource.authors}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <div className={cn(
                          "px-1.5 py-0.5 rounded-sm mr-2",
                          resource.type === "article" ? "bg-blue-100 text-blue-800" :
                          resource.type === "journal" ? "bg-purple-100 text-purple-800" :
                          resource.type === "book" ? "bg-green-100 text-green-800" :
                          resource.type === "video" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        )}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </div>
                        <span>{resource.source}, {resource.date}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveResource(resource.id);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Star className={cn(
                        "h-4 w-4", 
                        resource.saved ? "fill-amber-400 text-amber-400" : "text-gray-400"
                      )} />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {resource.summary}
                  </p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex">
                      {resource.accessType === "open" ? (
                        <div className="flex items-center text-green-600 text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Open Access
                        </div>
                      ) : resource.accessType === "subscription" ? (
                        <div className="flex items-center text-orange-600 text-xs">
                          <FileQuestion className="h-3 w-3 mr-1" />
                          Subscription
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 text-xs">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Paid
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectResource(resource);
                      }}
                    >
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                {isSearching ? (
                  <p className="text-gray-500">Searching for resources...</p>
                ) : searchQuery ? (
                  <p className="text-gray-500">No resources found matching your query</p>
                ) : (
                  <>
                    <p className="text-gray-600">Search for research resources</p>
                    <p className="text-gray-500 text-sm mt-1">Enter keywords to find relevant articles, books and journals</p>
                  </>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resource" className="flex-1 overflow-y-auto">
            {selectedResource ? (
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-primary">{selectedResource.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSaveResource(selectedResource.id)}
                    className="h-8 w-8 p-0 ml-2"
                  >
                    <Star className={cn(
                      "h-4 w-4", 
                      selectedResource.saved ? "fill-amber-400 text-amber-400" : "text-gray-400"
                    )} />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Authors</div>
                    <div>{selectedResource.authors}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500">Source</div>
                    <div>{selectedResource.source}, {selectedResource.date}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500">Summary</div>
                    <p className="text-gray-700">{selectedResource.summary}</p>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500">Keywords</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedResource.keywords.map((keyword, index) => (
                        <div 
                          key={index}
                          className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-700"
                        >
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(selectedResource.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Source
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${selectedResource.authors} (${selectedResource.date}). ${selectedResource.title}. ${selectedResource.source}.`
                          );
                          toast({
                            title: "Citation Copied",
                            description: "Citation has been copied to clipboard",
                          });
                        }}
                      >
                        <Quote className="h-4 w-4 mr-1" />
                        Copy Citation
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-medium mb-2">Research Notes</h4>
                    <Textarea
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder="Add notes about this resource..."
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleAddNote}
                      className="mt-2 w-full"
                    >
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Save Note
                    </Button>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {notes.filter(note => note.resourceId === selectedResource.id).map((note) => (
                      <div 
                        key={note.id} 
                        className="border rounded-lg p-3 bg-gray-50"
                      >
                        <p className="text-gray-700 text-sm">{note.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-gray-500">
                            <Clock className="h-3 w-3 inline-block mr-1" />
                            {formatDate(note.timestamp)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs p-0"
                            onClick={() => {
                              // Remove note
                              setNotes(notes.filter(n => n.id !== note.id));
                              toast({
                                title: "Note Removed",
                                description: "Your research note has been deleted",
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No resource selected</p>
                <p className="text-gray-500 text-sm mt-1">Search and click on a resource to view details</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai" className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Research AI Assistant</h3>
              </div>
              <p className="text-sm text-gray-600">
                Ask for help with research methods, citations, literature reviews, and more
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {aiAnswer && (
                <div className="mb-4 animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                        <div className="whitespace-pre-line text-sm">{aiAnswer}</div>
                      </div>
                      <div className="flex mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(aiAnswer);
                            toast({
                              title: "Copied to clipboard",
                              description: "AI response has been copied",
                            });
                          }}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => {
                            const newNote: NoteType = {
                              id: `note-${Date.now()}`,
                              content: `AI Research Assistant: ${aiQuestion}\n\n${aiAnswer}`,
                              resourceId: selectedResource?.id || "general",
                              timestamp: new Date(),
                              tags: ["ai-generated"]
                            };
                            
                            setNotes([...notes, newNote]);
                            
                            toast({
                              title: "Saved to Notes",
                              description: "AI response saved to your research notes",
                            });
                          }}
                        >
                          <BookMarked className="h-3 w-3 mr-1" />
                          Save as Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isAiThinking && (
                <div className="mb-4 animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!aiAnswer && !isAiThinking && (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-medium">Research Assistant</h4>
                  <p className="text-gray-500 text-sm mt-1">Ask for help with your research</p>
                  <div className="mt-3 text-xs text-gray-500 max-w-sm">
                    <span className="font-medium block mb-1">Example questions:</span>
                    <p onClick={() => setAiQuestion("How do I structure a literature review?")} className="cursor-pointer hover:text-primary">• How do I structure a literature review?</p>
                    <p onClick={() => setAiQuestion("What citation style should I use for my research paper?")} className="cursor-pointer hover:text-primary">• What citation style should I use for my research paper?</p>
                    <p onClick={() => setAiQuestion("What research methodology is best for educational studies?")} className="cursor-pointer hover:text-primary">• What research methodology is best for educational studies?</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t">
              <div className="relative">
                <Textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask a research question..."
                  className="min-h-[80px] resize-none pr-14 rounded-lg"
                />
                <Button
                  className="absolute bottom-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={handleAskAI}
                  disabled={isAiThinking || !aiQuestion.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Right panel - Compiled Research */}
      <div className="w-full md:w-3/5 flex flex-col h-full">
        <div className="p-4 border-b bg-white">
          <h3 className="font-medium mb-2">Research Compilation</h3>
          <div className="flex justify-between items-center">
            <div>
              <Input
                placeholder="Untitled Research"
                className="font-medium"
              />
            </div>
            <div className="flex space-x-2 ml-2">
              <Button 
                variant="outline" 
                size="sm"
                className="h-9"
                onClick={() => {
                  toast({
                    title: "Research Exported",
                    description: "Your research has been exported as PDF",
                  });
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-9"
                onClick={() => {
                  navigator.clipboard.writeText("Research compilation content");
                  toast({
                    title: "Copied to Clipboard",
                    description: "Research content has been copied",
                  });
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-700 mb-3">
                This research focuses on exploring the latest developments in educational technology and their implications for teaching methodologies. By examining current literature and studies, we aim to identify effective strategies for integrating technology in learning environments.
              </p>
              <p className="text-gray-700">
                The significance of this research lies in addressing the growing need for educators to adapt to rapidly evolving technological tools while maintaining pedagogical effectiveness. As digital learning environments become increasingly prevalent, understanding best practices becomes essential.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Literature Review</h2>
              <p className="text-gray-700 mb-2">
                Current research demonstrates several key trends in educational technology:
              </p>
              <ul className="list-disc pl-5 mb-3 space-y-2">
                <li className="text-gray-700">
                  <span className="font-medium">Adaptive Learning Systems:</span> Recent studies by Johnson et al. (2023) indicate that AI-driven adaptive systems can increase student engagement by customizing content delivery based on individual progress.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Collaborative Digital Tools:</span> Garcia (2023) found that digital collaboration platforms enhance peer learning and critical thinking skills when implemented with structured guidance.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Cognitive Science Applications:</span> Brown & Miller's (2022) research highlights how cognitive science principles can inform more effective digital learning experiences.
                </li>
              </ul>
              <p className="text-gray-700">
                These findings suggest a shift toward more personalized, interactive, and evidence-based approaches to educational technology implementation.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Methodology</h2>
              <p className="text-gray-700 mb-3">
                This research employs a mixed-methods approach combining:
              </p>
              <ol className="list-decimal pl-5 mb-3 space-y-2">
                <li className="text-gray-700">
                  Systematic literature review of peer-reviewed publications from the past three years
                </li>
                <li className="text-gray-700">
                  Comparative analysis of case studies across different educational levels
                </li>
                <li className="text-gray-700">
                  Synthesis of qualitative and quantitative findings to identify emerging patterns
                </li>
              </ol>
              <p className="text-gray-700">
                This approach allows for comprehensive examination of both theoretical frameworks and practical applications in diverse educational contexts.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Findings</h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-1">1. Integration Challenges</h3>
                  <p className="text-gray-700 text-sm">
                    Despite positive results, significant challenges remain in technology implementation, including infrastructure limitations, educator training needs, and equity concerns.
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-1">2. Pedagogical Alignment</h3>
                  <p className="text-gray-700 text-sm">
                    The most successful implementations align technology with sound pedagogical principles rather than adopting technology for its own sake.
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-1">3. Hybrid Approaches</h3>
                  <p className="text-gray-700 text-sm">
                    Research increasingly supports balanced hybrid approaches that combine digital and traditional methods according to specific learning objectives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-3">
              <Button 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "AI Analysis Requested",
                    description: "Analyzing your research compilation...",
                  });
                  
                  // Simulate AI analysis
                  setTimeout(() => {
                    toast({
                      title: "AI Analysis Complete",
                      description: "Suggestions for improving your research have been generated",
                    });
                  }, 2000);
                }}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Analyze with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
