
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  Plus,
  FileText,
  Search,
  X,
  Grid2X2,
  List,
  Folder
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";
import LectureFolder from "@/components/lecture/LectureFolder";
import { cn } from "@/lib/utils";

// Simple array of lectures - each is a complete folder
const SAMPLE_LECTURES = [
  { 
    id: 1, 
    title: "Lecture 1: Introduction to Course", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 2, 
    title: "Lecture 2: Foundational Concepts", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 3, 
    title: "Lecture 3: Key Principles & Methods", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 4, 
    title: "Lecture 4: Applied Techniques", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 5, 
    title: "Lecture 5: Case Studies", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 6, 
    title: "Lecture 6: Advanced Topics", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 7, 
    title: "Lecture 7: Practical Applications", 
    type: "document", 
    duration: "75 mins" 
  },
  { 
    id: 8, 
    title: "Lecture 8: Review Session", 
    type: "document", 
    duration: "75 mins" 
  }
];

const LecturesList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentStep, isFirstTime, nextStep } = useOnboarding();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const addLectureButtonRef = useRef<HTMLButtonElement>(null);
  const firstLectureRef = useRef<HTMLDivElement>(null);

  const filteredLectures = searchQuery 
    ? SAMPLE_LECTURES.filter(lecture => 
        lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SAMPLE_LECTURES;

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
      description: "Add a new lecture to your course"
    });
    
    if (isFirstTime && currentStep === 'upload-syllabus') {
      nextStep();
    }
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
                content="Create a new lecture for your course."
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
                  New Lecture
                </Button>
              </PathwayTooltip>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Lectures</h1>
          <p className="text-gray-600">Create and organize your lecture materials for each class session</p>
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

        {/* Lectures Grid */}
        <div className={cn(
          "grid gap-4",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {filteredLectures.length > 0 ? (
            filteredLectures.map((lecture, index) => (
              <div key={lecture.id} ref={index === 0 ? firstLectureRef : undefined}>
                <PathwayTooltip 
                  content="Open this lecture to create content for your class."
                  position="right"
                  step={4}
                  className="w-72"
                  nextStep="lecture-editor"
                  navigateTo={`/courses/${courseId}/lectures/${lecture.id}`}
                  forceShow={isFirstTime && currentStep === 'lecture-list' && index === 0}
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
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              {searchQuery ? (
                <>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No lectures found</h3>
                  <p className="text-gray-500 mb-4">
                    Try using different search terms
                  </p>
                  <Button variant="outline" onClick={handleClearSearch}>
                    Clear search
                  </Button>
                </>
              ) : (
                <>
                  <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No lectures yet</h3>
                  <p className="text-gray-500 mb-4">
                    Start creating lectures for your course
                  </p>
                  <Button onClick={handleAddLecture}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Lecture
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturesList;
