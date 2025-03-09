import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calendar, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import Spotlight from "@/components/onboarding/Spotlight";
import { useToast } from "@/hooks/use-toast";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";

interface CourseFormValues {
  title: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
}

const CourseCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  const courseDetailsRef = useRef<HTMLDivElement>(null);
  const titleFieldRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      title: "",
      description: "",
      level: "undergraduate",
      startDate: "",
      endDate: "",
    },
  });

  // Effect to scroll to the course details when onboarding reaches that step
  useEffect(() => {
    if (isFirstTime && currentStep === 'course-create' && courseDetailsRef.current) {
      courseDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, isFirstTime]);

  const onSubmit = (data: CourseFormValues) => {
    console.log("Course data:", data);
    toast({
      title: "Course created",
      description: "Your course has been created successfully",
    });
    
    // If user is in onboarding, move to next step and navigate
    if (isFirstTime) {
      nextStep();
    }
    
    // Navigate to the lectures list for the new course
    // Using a dummy ID (1) since we don't have a backend
    navigate(`/courses/1/lectures`);
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
              description="Start by filling out the course details below. After creating your course, you'll be able to add lectures and upload materials."
              position="bottom-left"
              onNext={() => nextStep()}
              onSkip={skipOnboarding}
            />
          )}
        </div>

        <div className="grid gap-6">
          <Card ref={courseDetailsRef}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div ref={titleFieldRef}>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Introduction to Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter course description..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <PathwayTooltip 
                      content="Click here to create your course and continue to the next step where you'll add lecture materials."
                      position="top"
                      step={2}
                      className="w-72"
                      nextStep="upload-syllabus"
                      forceShow={isFirstTime && currentStep === 'course-create'}
                    >
                      <Button type="submit">Create Course</Button>
                    </PathwayTooltip>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Course Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                You can organize your course materials after creating the course.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Course schedule can be set up after creating the course.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
