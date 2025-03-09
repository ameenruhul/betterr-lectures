
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BookOpen, Upload, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import { useToast } from "@/hooks/use-toast";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";
import { cn } from "@/lib/utils";

interface CourseFormValues {
  title: string;
}

const CourseCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  const courseDetailsRef = useRef<HTMLDivElement>(null);
  const titleFieldRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      title: "",
    },
  });

  // Effect to scroll to the course details when onboarding reaches that step
  useEffect(() => {
    if (isFirstTime && currentStep === 'course-create' && courseDetailsRef.current) {
      courseDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, isFirstTime]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    // Programmatically click the hidden file input when Browse Files button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processSyllabus = async (courseTitle: string) => {
    setIsProcessing(true);
    
    // Simulate processing time for syllabus analysis
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Course created",
        description: "Your course has been created and lectures generated from the syllabus",
      });
      
      // If user is in onboarding, move to next step
      if (isFirstTime) {
        nextStep();
      }
      
      // Navigate to the lectures list for the new course
      // Using a dummy ID (1) since we don't have a backend
      navigate(`/courses/1/lectures`);
    }, 2000);
  };

  const onSubmit = (data: CourseFormValues) => {
    if (!data.title.trim()) {
      toast({
        title: "Course title required",
        description: "Please provide a title for your course",
        variant: "destructive",
      });
      return;
    }
    
    if (!file) {
      toast({
        title: "Syllabus required",
        description: "Please upload a syllabus to create your course",
        variant: "destructive",
      });
      return;
    }
    
    processSyllabus(data.title);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create New Course</h1>
          
          {/* Onboarding for Create Course */}
          {isFirstTime && currentStep === 'course-create' && (
            <CoachMark
              title="Create Your First Course"
              description="Start by entering a course name and uploading your syllabus. We'll automatically generate lecture content based on your syllabus!"
              position="bottom-left"
              onNext={() => nextStep()}
              onSkip={skipOnboarding}
            />
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card ref={courseDetailsRef} className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white rounded-t-lg pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Creation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div ref={titleFieldRef}>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Course Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Introduction to Computer Science" 
                              className="text-base py-6" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <FormLabel className="text-base">Upload Course Syllabus</FormLabel>
                    <div
                      className={cn(
                        "group h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300",
                        isDragging 
                          ? "border-primary bg-primary/5 scale-[1.02]" 
                          : "border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-gray-100/50"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText className="h-10 w-10 text-primary mb-2" />
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setFile(null)}
                            className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 mb-2 transition-colors duration-300 text-gray-400 group-hover:text-primary/70" />
                          <p className="text-sm text-center text-gray-600 mb-2">
                            Drag your syllabus here or click to browse
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            id="syllabus-upload"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white hover:bg-primary hover:text-white transition-all duration-300"
                            type="button"
                            onClick={handleBrowseClick}
                          >
                            Browse Files
                          </Button>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>

                  <div className="flex flex-col items-center pt-4">
                    <p className="text-sm text-gray-600 mb-6 text-center max-w-lg">
                      Once you upload your syllabus, we'll automatically generate a lecture structure for your course. 
                      You'll be able to edit and customize this structure in the next step.
                    </p>
                    <PathwayTooltip 
                      content="Click here to create your course and continue to the next step where your lectures will be generated from the syllabus."
                      position="top"
                      step={2}
                      className="w-72"
                      nextStep="upload-syllabus"
                      forceShow={isFirstTime && currentStep === 'course-create'}
                    >
                      <Button 
                        type="submit"
                        className="px-8 py-6 text-base"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full"></div>
                            Processing Syllabus...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Create Course & Generate Lectures
                          </>
                        )}
                      </Button>
                    </PathwayTooltip>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
