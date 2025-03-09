
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  Plus,
  Play,
  BookOpen,
  FileText,
  Video,
  Presentation,
  FolderOpen,
  Search,
  X
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import Spotlight from "@/components/onboarding/Spotlight";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";
import LectureFolder from "@/components/lecture/LectureFolder";

const MOCK_LECTURES = [
  { id: 1, title: "Introduction to the Course", type: "video", duration: "10:15" },
  { id: 2, title: "Key Concepts and Terminology", type: "document", duration: "15 pages" },
  { id: 3, title: "Practical Application - Part 1", type: "video", duration: "25:40" },
  { id: 4, title: "Understanding Core Principles", type: "presentation", duration: "20 slides" },
  { id: 5, title: "Case Study Analysis", type: "document", duration: "12 pages" },
  { id: 6, title: "Advanced Techniques", type: "video", duration: "18:30" },
  { id: 7, title: "Group Discussion Topics", type: "document", duration: "5 pages" },
  { id: 8, title: "Final Review and Summary", type: "presentation", duration: "15 slides" },
  { id: 9, title: "Examination Preparation", type: "video", duration: "30:00" },
  { id: 10, title: "Course Conclusion", type: "video", duration: "5:45" }
];

const LecturesList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  
  const addLectureButtonRef = useRef<HTMLButtonElement>(null);
  const firstLectureRef = useRef<HTMLDivElement>(null);

  const filteredLectures = MOCK_LECTURES.filter(lecture => 
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            
            <PathwayTooltip 
              content="Now add your first lecture to the course. This is where you'll upload your materials or create new content."
              position="bottom"
              step={3}
              className="w-72"
              nextStep="lecture-list"
              forceShow={isFirstTime && currentStep === 'upload-syllabus'}
            >
              <Button 
                onClick={handleAddLecture} 
                ref={addLectureButtonRef}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Lecture
              </Button>
            </PathwayTooltip>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Lectures</h1>
          <p className="text-gray-600">Manage and organize your course lectures</p>
        </div>

        <div className="relative mb-6 max-w-md">
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

        <div className="grid grid-cols-1 gap-2">
          {filteredLectures.length > 0 ? (
            filteredLectures.map((lecture, index) => (
              <div key={lecture.id} ref={index === 0 ? firstLectureRef : undefined}>
                <PathwayTooltip 
                  content="Select a lecture to open it in the editor. This is where you'll create your content."
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
                  />
                </PathwayTooltip>
                
                {isFirstTime && currentStep === 'lecture-list' && index === 0 && (
                  <CoachMark
                    title="Explore Your Lectures"
                    description="Click on a lecture to open it in the editor. From there, you can create and organize content."
                    position="right"
                    onNext={() => nextStep()}
                    onSkip={skipOnboarding}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No lectures found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? "Try using different search terms" 
                  : "You haven't created any lectures yet"}
              </p>
              {searchQuery ? (
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear search
                </Button>
              ) : (
                <Button onClick={handleAddLecture}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first lecture
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturesList;
