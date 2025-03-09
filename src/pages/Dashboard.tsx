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
  ArrowUpRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OnboardingToggle from "@/components/onboarding/OnboardingToggle";
import DashboardGuide from "@/components/onboarding/DashboardGuide";
import { useOnboarding } from "@/contexts/OnboardingContext";
import Spotlight from "@/components/onboarding/Spotlight";
import PathwayTooltip from "@/components/onboarding/PathwayTooltip";

const Dashboard = () => {
  const { currentStep, isGuidedMode } = useOnboarding();
  
  const isSpotlightActive = (step: string) => {
    return currentStep === step && isGuidedMode;
  };

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Teacher's Workbench</h1>
            <OnboardingToggle />
          </div>
          
          <Spotlight active={isSpotlightActive('create-course')} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PathwayTooltip 
                content="Step 1: Start by creating a new course or lecture" 
                position="bottom"
              >
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
              </PathwayTooltip>
              
              <PathwayTooltip 
                content="Create assessments to test student understanding"
                position="bottom"
              >
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
              </PathwayTooltip>
              
              <PathwayTooltip 
                content="Find research to enhance your teaching content"
                position="bottom"
              >
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
              </PathwayTooltip>
            </div>
          </Spotlight>

          <h2 className="text-xl font-semibold mt-8 mb-4">Teaching Enhancement Tools</h2>
          <Spotlight active={isSpotlightActive('course-details')} className="w-full">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <PathwayTooltip 
                content="Step 2: Create a lesson plan for your course"
                position="top"
              >
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
              </PathwayTooltip>

              <PathwayTooltip 
                content="Step 3: Prepare your lecture materials"
                position="top"
              >
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
              </PathwayTooltip>

              <PathwayTooltip 
                content="Step 4: Create assessments for your students"
                position="top"
              >
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
              </PathwayTooltip>

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

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <Link to="/quiz-solver">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                      <Brain className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-medium mb-2">Quiz Solver</h3>
                    <p className="text-sm text-muted-foreground">Test solutions and understand potential responses</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/research">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                      <Microscope className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-medium mb-2">Research Assistant</h3>
                    <p className="text-sm text-muted-foreground">Discover resources and insights for lectures</p>
                  </CardContent>
                </Card>
              </Link>

              <PathwayTooltip 
                content="Step 5: Create comprehensive study materials"
                position="bottom"
              >
                <Link to="/study-guide">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-medium mb-2">Study Guide Creator</h3>
                      <p className="text-sm text-muted-foreground">Build comprehensive guides for student success</p>
                    </CardContent>
                  </Card>
                </Link>
              </PathwayTooltip>

              <Link to="/assignment-solver">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-none">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                      <PencilLine className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="font-medium mb-2">Assignment Solver</h3>
                    <p className="text-sm text-muted-foreground">Understand expected answers and solving approaches</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </Spotlight>

          <Spotlight active={isSpotlightActive('upload-syllabus')} className="w-full">
            <Card className="border-none mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                  Teaching Excellence Tips
                </CardTitle>
                <CardDescription>Latest insights to improve your teaching effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-2">Active Learning Strategies</h3>
                    <p className="text-amber-700 text-sm">Increase student engagement by incorporating think-pair-share activities, quick polls, and problem-solving exercises throughout your lectures.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Visual Learning Enhancement</h3>
                    <p className="text-blue-700 text-sm">Use diagrams, charts, and visual metaphors to increase retention. The brain processes visual information 60,000 times faster than text.</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-2">Effective Questioning Techniques</h3>
                    <p className="text-green-700 text-sm">Use a mix of recall, application, and analysis questions. Begin lectures with engaging "essential questions" that spark curiosity.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Spotlight>

          <Spotlight active={isSpotlightActive('lecture-list')} className="w-full">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription>Quick steps to become a better educator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center text-primary font-medium mr-4">1</div>
                    <div>
                      <h3 className="font-medium mb-1">Create your first lecture plan</h3>
                      <p className="text-sm text-muted-foreground mb-2">Start by organizing your lecture content with clear learning objectives.</p>
                      <Link to="/lesson-plan">
                        <Button variant="outline" size="sm">
                          Create Lesson Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center text-primary font-medium mr-4">2</div>
                    <div>
                      <h3 className="font-medium mb-1">Generate engaging assessment materials</h3>
                      <p className="text-sm text-muted-foreground mb-2">Build quizzes that test understanding, not just memorization.</p>
                      <Link to="/quiz-builder">
                        <Button variant="outline" size="sm">
                          Create Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center text-primary font-medium mr-4">3</div>
                    <div>
                      <h3 className="font-medium mb-1">Research and enhance your content</h3>
                      <p className="text-sm text-muted-foreground mb-2">Find the latest research and resources to support your teaching.</p>
                      <Link to="/research">
                        <Button variant="outline" size="sm">
                          Start Researching
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Spotlight>
        </div>
      </div>
      
      <DashboardGuide />
    </div>
  );
};

export default Dashboard;
