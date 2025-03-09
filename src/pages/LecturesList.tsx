
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  Plus,
  FileText,
  Presentation,
  Search,
  X,
  Folder,
  Grid2X2,
  List,
  Pencil,
  BookOpen,
  GraduationCap,
  Calendar,
  ClipboardList
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";
import LectureFolder from "@/components/lecture/LectureFolder";
import { cn } from "@/lib/utils";

// Teacher workspace sections
const TEACHER_WORKSPACE = [
  {
    id: 1,
    title: "Class Preparation",
    description: "Create lesson plans and materials for upcoming classes",
    icon: BookOpen,
    lectures: [
      { id: 1, title: "Monday's Lesson Plan", type: "document", duration: "45 mins" },
      { id: 2, title: "Tuesday's Discussion Topics", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 2,
    title: "Presentations & Materials",
    description: "Create visual aids and handouts for class delivery",
    icon: Presentation,
    lectures: [
      { id: 3, title: "Topic Introduction Slides", type: "presentation", duration: "45 mins" },
      { id: 4, title: "Visual Concept Maps", type: "presentation", duration: "45 mins" },
      { id: 5, title: "Student Handouts", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 3,
    title: "Assessment Materials",
    description: "Create quizzes, tests and assignments for student evaluation",
    icon: ClipboardList,
    lectures: [
      { id: 6, title: "Chapter Quiz Questions", type: "presentation", duration: "45 mins" },
      { id: 7, title: "Group Project Guidelines", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 4,
    title: "Class Calendar & Planning",
    description: "Organize your semester schedule and course timeline",
    icon: Calendar,
    lectures: [
      { id: 8, title: "Semester Timeline", type: "presentation", duration: "45 mins" },
      { id: 9, title: "Important Deadlines", type: "document", duration: "45 mins" },
      { id: 10, title: "Topic Sequence Plan", type: "document", duration: "45 mins" }
    ]
  }
];

// Flatten lectures for search functionality
const ALL_TEACHING_MATERIALS = TEACHER_WORKSPACE.flatMap(section => section.lectures);

const LecturesList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  
  const addLectureButtonRef = useRef<HTMLButtonElement>(null);
  const firstLectureRef = useRef<HTMLDivElement>(null);

  const filteredSections = searchQuery 
    ? [] // When searching, we'll use flattenedResults instead
    : TEACHER_WORKSPACE;

  const flattenedResults = searchQuery
    ? ALL_TEACHING_MATERIALS.filter(material => 
        material.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isFirstTime && currentStep === 'upload-syllabus' && addLectureButtonRef.current) {
      addLectureButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, isFirstTime]);

  const handleBackToCourses = () => {
    navigate(`/courses/${courseId}`);
  };

  const handleAddTeachingMaterial = () => {
    toast({
      title: "Create new teaching material",
      description: "Add a new lesson plan, presentation, or assessment"
    });
    
    if (isFirstTime && currentStep === 'upload-syllabus') {
      nextStep();
    }
  };

  const handleAddSection = () => {
    toast({
      title: "Create new workspace section",
      description: "Organize your teaching materials into custom sections"
    });
  };

  const handleDeleteMaterial = (materialId: number) => {
    toast({
      title: "Delete teaching material",
      description: `Would delete material #${materialId}`
    });
  };

  const handleOpenTeachingMaterial = (materialId: number) => {
    navigate(`/courses/${courseId}/lectures/${materialId}`);
    
    if (isFirstTime && currentStep === 'lecture-list') {
      nextStep();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const toggleSectionExpanded = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToCourses} 
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            
            <div className="flex items-center gap-2">
              <PathwayTooltip 
                content="Create new teaching materials like lesson plans, presentations, quizzes and more."
                position="bottom"
                step={3}
                className="w-72"
                nextStep="lecture-list"
                forceShow={isFirstTime && currentStep === 'upload-syllabus'}
              >
                <Button 
                  onClick={handleAddTeachingMaterial} 
                  ref={addLectureButtonRef}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Teaching Material
                </Button>
              </PathwayTooltip>
              
              <Button 
                onClick={handleAddSection}
                variant="outline"
                size="sm"
              >
                <Folder className="h-4 w-4 mr-2" />
                New Section
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher's Workspace</h1>
          <p className="text-gray-600">Create and organize your classroom teaching materials with AI assistance</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search teaching materials..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {searchQuery ? (
          // Search results view
          <div className={cn(
            "grid gap-4",
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {flattenedResults.length > 0 ? (
              flattenedResults.map((material, index) => (
                <div key={material.id} ref={index === 0 ? firstLectureRef : undefined}>
                  <LectureFolder 
                    lecture={material}
                    courseId={courseId || ""}
                    onDelete={handleDeleteMaterial}
                    onOpen={handleOpenTeachingMaterial}
                    expanded={false}
                    isGridView={viewMode === "grid"}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No teaching materials found</h3>
                <p className="text-gray-500 mb-4">
                  Try using different search terms
                </p>
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Regular sections and teaching materials view
          <div className="space-y-6">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <div key={section.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  {/* Section Header */}
                  <div 
                    className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleSectionExpanded(section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h2 className="font-semibold text-lg">{section.title}</h2>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionExpanded(section.id);
                    }}>
                      {expandedSections.includes(section.id) ? (
                        <ChevronLeft className="h-4 w-4 rotate-90" />
                      ) : (
                        <ChevronLeft className="h-4 w-4 -rotate-90" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Section Content */}
                  {expandedSections.includes(section.id) && (
                    <div className="p-4">
                      <div className={cn(
                        "grid gap-4",
                        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                      )}>
                        {section.lectures.map((material, index) => (
                          <div key={material.id} ref={index === 0 && section.id === 1 ? firstLectureRef : undefined}>
                            <PathwayTooltip 
                              content="Edit this teaching material to create content for your upcoming classes."
                              position="right"
                              step={4}
                              className="w-72"
                              nextStep="lecture-editor"
                              navigateTo={`/courses/${courseId}/lectures/${material.id}`}
                              forceShow={isFirstTime && currentStep === 'lecture-list' && index === 0 && section.id === 1}
                            >
                              <LectureFolder 
                                lecture={material}
                                courseId={courseId || ""}
                                onDelete={handleDeleteMaterial}
                                onOpen={handleOpenTeachingMaterial}
                                expanded={false}
                                isGridView={viewMode === "grid"}
                              />
                            </PathwayTooltip>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your workspace is empty</h3>
                <p className="text-gray-500 mb-4">
                  Start creating teaching materials for your upcoming classes
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleAddSection} variant="outline">
                    <Folder className="h-4 w-4 mr-2" />
                    Create Section
                  </Button>
                  <Button onClick={handleAddTeachingMaterial}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Teaching Material
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturesList;
