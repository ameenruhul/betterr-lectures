
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
  FolderOpen,
  Search,
  X,
  Folder,
  Grid2X2,
  List,
  Pencil,
  GraduationCap
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import Spotlight from "@/components/onboarding/Spotlight";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";
import LectureFolder from "@/components/lecture/LectureFolder";
import { cn } from "@/lib/utils";

// Organizing lectures by modules (simulating folder structure)
const MOCK_MODULES = [
  {
    id: 1,
    title: "Module 1: Introduction",
    lectures: [
      { id: 1, title: "Introduction to the Course", type: "document", duration: "45 mins" },
      { id: 2, title: "Key Concepts and Terminology", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Core Principles",
    lectures: [
      { id: 3, title: "Practical Application - Part 1", type: "presentation", duration: "45 mins" },
      { id: 4, title: "Understanding Core Principles", type: "presentation", duration: "45 mins" },
      { id: 5, title: "Case Study Analysis", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Advanced Topics",
    lectures: [
      { id: 6, title: "Advanced Techniques", type: "presentation", duration: "45 mins" },
      { id: 7, title: "Group Discussion Topics", type: "document", duration: "45 mins" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Final Review",
    lectures: [
      { id: 8, title: "Final Review and Summary", type: "presentation", duration: "45 mins" },
      { id: 9, title: "Examination Preparation", type: "document", duration: "45 mins" },
      { id: 10, title: "Course Conclusion", type: "document", duration: "45 mins" }
    ]
  }
];

// Flatten lectures for search functionality
const MOCK_LECTURES = MOCK_MODULES.flatMap(module => module.lectures);

const LecturesList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  
  const addLectureButtonRef = useRef<HTMLButtonElement>(null);
  const firstLectureRef = useRef<HTMLDivElement>(null);

  const filteredModules = searchQuery 
    ? [] // When searching, we'll use flattenedResults instead
    : MOCK_MODULES;

  const flattenedResults = searchQuery
    ? MOCK_LECTURES.filter(lecture => 
        lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleAddLecture = () => {
    toast({
      title: "Create new lecture",
      description: "This would open a lecture creation dialog"
    });
    
    if (isFirstTime && currentStep === 'upload-syllabus') {
      nextStep();
    }
  };

  const handleAddModule = () => {
    toast({
      title: "Create new module",
      description: "This would open a module creation dialog"
    });
  };

  const handleDeleteLecture = (lectureId: number) => {
    toast({
      title: "Delete lecture",
      description: `Would delete lecture #${lectureId}`
    });
  };

  const handleOpenLecture = (lectureId: number) => {
    navigate(`/courses/${courseId}/lectures/${lectureId}`);
    
    if (isFirstTime && currentStep === 'lecture-list') {
      nextStep();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const toggleModuleExpanded = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
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
                content="Add a new lecture to organize your teaching materials, quizzes, and class plans."
                position="bottom"
                step={3}
                className="w-72"
                nextStep="lecture-list"
                forceShow={isFirstTime && currentStep === 'upload-syllabus'}
              >
                <Button 
                  onClick={handleAddLecture} 
                  ref={addLectureButtonRef}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lecture
                </Button>
              </PathwayTooltip>
              
              <Button 
                onClick={handleAddModule}
                variant="outline"
                size="sm"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                New Module
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Workspace</h1>
          <p className="text-gray-600">Organize your teaching materials, class plans, and assessments</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search lectures..."
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
              flattenedResults.map((lecture, index) => (
                <div key={lecture.id} ref={index === 0 ? firstLectureRef : undefined}>
                  <LectureFolder 
                    lecture={lecture}
                    courseId={courseId || ""}
                    onDelete={handleDeleteLecture}
                    onOpen={handleOpenLecture}
                    expanded={false}
                    isGridView={viewMode === "grid"}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No lectures found</h3>
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
          // Regular modules and lectures view
          <div className="space-y-6">
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <div key={module.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  {/* Module Header */}
                  <div 
                    className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleModuleExpanded(module.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-blue-500" />
                      <h2 className="font-semibold text-lg">{module.title}</h2>
                      <span className="text-sm text-gray-500">({module.lectures.length} lectures)</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
                      e.stopPropagation();
                      toggleModuleExpanded(module.id);
                    }}>
                      {expandedModules.includes(module.id) ? (
                        <ChevronLeft className="h-4 w-4 rotate-90" />
                      ) : (
                        <ChevronLeft className="h-4 w-4 -rotate-90" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Module Content */}
                  {expandedModules.includes(module.id) && (
                    <div className="p-4">
                      <div className={cn(
                        "grid gap-4",
                        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                      )}>
                        {module.lectures.map((lecture, index) => (
                          <div key={lecture.id} ref={index === 0 && module.id === 1 ? firstLectureRef : undefined}>
                            <PathwayTooltip 
                              content="Edit your lecture to create materials, quizzes, and class plans for your students."
                              position="right"
                              step={4}
                              className="w-72"
                              nextStep="lecture-editor"
                              navigateTo={`/courses/${courseId}/lectures/${lecture.id}`}
                              forceShow={isFirstTime && currentStep === 'lecture-list' && index === 0 && module.id === 1}
                            >
                              <LectureFolder 
                                lecture={lecture}
                                courseId={courseId || ""}
                                onDelete={handleDeleteLecture}
                                onOpen={handleOpenLecture}
                                expanded={false}
                                isGridView={viewMode === "grid"}
                              />
                            </PathwayTooltip>
                            
                            {isFirstTime && currentStep === 'lecture-list' && index === 0 && module.id === 1 && (
                              <CoachMark
                                title="Prepare Your Lectures"
                                description="Click on a lecture to open the editor where you can create lesson plans, quizzes, and teaching materials."
                                position="right"
                                onNext={() => nextStep()}
                                onSkip={skipOnboarding}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No modules found</h3>
                <p className="text-gray-500 mb-4">
                  Start by creating your first module and lecture
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleAddModule} variant="outline">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Create Module
                  </Button>
                  <Button onClick={handleAddLecture}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Lecture
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
