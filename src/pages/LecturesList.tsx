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
  MoreVertical,
  Trash2,
  Edit,
  Copy
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import Spotlight from "@/components/onboarding/Spotlight";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";

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

const LectureTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4 text-primary" />;
    case "document":
      return <FileText className="h-4 w-4 text-emerald-500" />;
    case "presentation":
      return <Presentation className="h-4 w-4 text-amber-500" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-500" />;
  }
};

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

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search lectures..."
            className="max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card className="shadow-sm border-none">
          <CardHeader className="bg-gray-50 rounded-t-lg pb-2">
            <CardTitle className="text-lg font-medium">All Lectures</CardTitle>
            <CardDescription>
              {filteredLectures.length} lecture{filteredLectures.length !== 1 ? 's' : ''} in this course
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredLectures.map((lecture, index) => (
                <div 
                  key={lecture.id}
                  ref={index === 0 ? firstLectureRef : null}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <PathwayTooltip 
                    content="Select a lecture to open it in the editor. This is where you'll create your content."
                    position="right"
                    step={4}
                    className="w-72"
                    nextStep="lecture-editor"
                    navigateTo={`/courses/${courseId}/lectures/${lecture.id}`}
                    forceShow={isFirstTime && currentStep === 'lecture-list' && index === 0}
                  >
                    <div
                      className="flex-1 flex items-center space-x-4 group cursor-pointer"
                      onClick={() => handleOpenLecture(lecture.id)}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <LectureTypeIcon type={lecture.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                          {lecture.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                          <span className="capitalize">{lecture.type}</span>
                          <span>•</span>
                          <span>{lecture.duration}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-4 w-4 mr-1 text-primary" />
                        Open
                      </Button>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteLecture(lecture.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LecturesList;
