
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { 
  Brain, 
  BookOpen, 
  FileQuestion, 
  PencilLine, 
  FileText, 
  Sparkles, 
  Microscope, 
  ClipboardList,
  Lightbulb,
  Presentation,
  ArrowUpRight,
  Network,
  StickyNote,
  Notebook,
  Map,
  MessageSquare,
  CalendarIcon,
  BellRing,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardGuide from "@/components/onboarding/DashboardGuide";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CalendarConnector from "@/components/dashboard/CalendarConnector";

const Dashboard = () => {
  const { currentStep, isGuidedMode } = useOnboarding();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState([
    { id: 1, title: "Grade midterm papers", date: "2023-11-15", completed: false },
    { id: 2, title: "Faculty meeting", date: "2023-11-16", completed: false },
    { id: 3, title: "Submit course outline", date: "2023-11-18", completed: true },
  ]);
  
  const toggleReminderStatus = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };
  
  return (
    <div className="min-h-screen bg-accent/30">
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Teacher's Workbench</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Create Better Lectures</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">Prepare engaging materials with AI assistance</p>
                <Link to="/lectures-panel">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Start Creating <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
              
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Generate Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100 mb-4">Create effective quizzes and assignments</p>
                <Link to="/quiz-builder">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Build Assessments <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
              
            <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl transition-all border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Research Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-100 mb-4">Find resources and generate insights with AI</p>
                <Link to="/research">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Research Topics <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="col-span-2 border-none">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium">
                  <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                  Calendar
                </CardTitle>
                <CardDescription>Schedule your classes and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarConnector />
                
                <div className="flex flex-col items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal mb-4",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  {date && (
                    <div className="w-full mt-4">
                      <h3 className="font-medium mb-2">Events for {format(date, "MMMM d, yyyy")}</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                          <p className="font-medium">Introduction to Physics</p>
                          <p className="text-sm text-gray-600">9:00 AM - 10:30 AM</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-md border border-purple-200">
                          <p className="font-medium">Office Hours</p>
                          <p className="text-sm text-gray-600">1:00 PM - 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center text-lg font-medium">
                    <BellRing className="mr-2 h-5 w-5 text-amber-500" />
                    Reminders
                  </CardTitle>
                  <Link to="/tools/reminders">
                    <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1 text-ai-magenta">
                      <ExternalLink className="h-3 w-3" /> Open
                    </Button>
                  </Link>
                </div>
                <CardDescription>Keep track of important tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div 
                      key={reminder.id} 
                      className={`p-3 rounded-md border flex justify-between items-center ${
                        reminder.completed ? 'bg-gray-50 border-gray-200' : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className={reminder.completed ? 'text-gray-500 line-through' : ''}>
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-sm">{reminder.date}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleReminderStatus(reminder.id)}
                        className={`min-w-20 ${
                          reminder.completed ? 'border-gray-200' : 'border-amber-200'
                        }`}
                      >
                        {reminder.completed ? 'Completed' : 'Mark Done'}
                      </Button>
                    </div>
                  ))}
                  <Link to="/tools/reminders">
                    <Button variant="outline" className="w-full mt-2 border-amber-200 hover:border-amber-500 hover:bg-amber-50">
                      Add Reminder <PencilLine className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Teaching Enhancement Tools</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Link to="/lesson-plan">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-2">Lesson Planning</h3>
                  <p className="text-sm text-muted-foreground">Structure engaging lessons with clear learning objectives</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/lecture-prep">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Presentation className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium mb-2">Lecture Preparation</h3>
                  <p className="text-sm text-muted-foreground">Create compelling slides and lecture materials</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/quiz-builder">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <FileQuestion className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-medium mb-2">Quiz Builder</h3>
                  <p className="text-sm text-muted-foreground">Generate knowledge-testing questions</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/assignment-generator">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <ClipboardList className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-medium mb-2">Assignment Generator</h3>
                  <p className="text-sm text-muted-foreground">Create meaningful homework and projects</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Teacher's Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/tools/mind-maps">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg font-medium">
                    <Network className="mr-2 h-5 w-5 text-blue-500" />
                    Mind Maps
                  </CardTitle>
                  <CardDescription>Organize concepts visually</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Create interactive mind maps to visualize subject connections and help students grasp complex relationships between concepts.</p>
                  <Button variant="outline" className="w-full border-blue-200 hover:border-blue-500 hover:bg-blue-50">
                    Create Mind Map <Map className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/tools/sticky-notes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg font-medium">
                    <StickyNote className="mr-2 h-5 w-5 text-amber-500" />
                    Sticky Notes
                  </CardTitle>
                  <CardDescription>Capture quick thoughts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Organize your thoughts and ideas with digital sticky notes. Arrange, color-code, and group them for better lesson planning.</p>
                  <Button variant="outline" className="w-full border-amber-200 hover:border-amber-500 hover:bg-amber-50">
                    Organize Notes <MessageSquare className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/tools/lecture-notes">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg font-medium">
                    <Notebook className="mr-2 h-5 w-5 text-purple-500" />
                    Lecture Notes
                  </CardTitle>
                  <CardDescription>Detailed note taking</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Create structured lecture notes with rich text formatting, embedded resources, and organizing features to keep all your materials in one place.</p>
                  <Button variant="outline" className="w-full border-purple-200 hover:border-purple-500 hover:bg-purple-50">
                    Take Notes <PencilLine className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Link to="/tools/concept-mapper">
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg font-medium text-emerald-700">
                    <Brain className="mr-2 h-5 w-5 text-emerald-600" />
                    Concept Mapper
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-emerald-700/80 mb-4">Create visual representations of curriculum concepts and their relationships. Perfect for breaking down complex topics into digestible components.</p>
                  <Button variant="outline" className="bg-white border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700">
                    Map Concepts <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/tools/classroom-journal">
              <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg font-medium text-indigo-700">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" />
                    Classroom Journal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-700/80 mb-4">Track classroom activities, student progress, and teaching reflections in one centralized journal to improve your teaching methods over time.</p>
                  <Button variant="outline" className="bg-white border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 text-indigo-700">
                    Start Journal <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      <DashboardGuide />
    </div>
  );
};

export default Dashboard;
