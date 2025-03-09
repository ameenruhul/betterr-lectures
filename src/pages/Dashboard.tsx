import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Brain, BookOpen, GraduationCap, Bell, LineChart, Clock, ArrowUpRight, Lightbulb, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OnboardingToggle from "@/components/onboarding/OnboardingToggle";
import DashboardGuide from "@/components/onboarding/DashboardGuide";

// Sample data for the chart
const data = [
  { name: 'Mon', students: 10 },
  { name: 'Tue', students: 15 },
  { name: 'Wed', students: 12 },
  { name: 'Thu', students: 18 },
  { name: 'Fri', students: 20 },
  { name: 'Sat', students: 8 },
  { name: 'Sun', students: 5 },
];

// Sample data for pie chart
const courseData = [
  { name: 'Computer Science', value: 45 },
  { name: 'Mathematics', value: 30 },
  { name: 'Physics', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-accent/30">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <OnboardingToggle />
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Create Lecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">Quickly prepare materials for your next class</p>
                <Link to="/lecture-prep">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Get Started <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Build Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100 mb-4">Generate engaging quizzes for student assessment</p>
                <Link to="/quiz-builder">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                    Create Quiz <ChevronRight className="h-4 w-4 ml-2" />
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
                    Start Research <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2 this month
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +18 this week
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Assists</CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5 today
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Updates</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3 yesterday
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Charts Section */}
            <Card className="border-none lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Weekly student participation across courses</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="students" stroke="#2563eb" fill="#dbeafe" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Distribution */}
            <Card className="border-none">
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Active courses by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {courseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Card className="border-none">
            <CardHeader>
              <Tabs defaultValue="activity">
                <TabsList>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
                  <TabsTrigger value="tips">Teaching Tips</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="activity">
                <TabsContent value="activity" className="space-y-4 m-0">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Generated new quiz for CS101</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Updated course materials for MATH202</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Added 5 new students to PHYS101</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tasks" className="space-y-4 m-0">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Review AI-generated lecture notes</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Due in 2 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Grade midterm submissions</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Due in 4 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Prepare materials for next week</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Due in 5 days</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tips" className="space-y-4 m-0">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Use visual aids to enhance student comprehension</p>
                      <p className="text-sm text-muted-foreground">Students retain information better when visual elements are included</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Incorporate interactive elements</p>
                      <p className="text-sm text-muted-foreground">Engagement increases when students participate actively</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Use AI to personalize learning experiences</p>
                      <p className="text-sm text-muted-foreground">Better Lectures AI can help create custom content for different learning styles</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Onboarding Guide */}
      <DashboardGuide />
    </div>
  );
};

export default Dashboard;
