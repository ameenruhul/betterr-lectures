import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, FileEdit, GraduationCap, LayoutDashboard, Settings } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";
import { DashboardHeader } from "@/components/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="p-8">
        <DashboardHeader />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Create New Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Start a new course with AI-powered content generation
              </p>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="h-5 w-5 text-primary" />
                Recent Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Introduction to AI - Lecture 3</li>
                <li className="text-sm text-gray-600">Data Structures Quiz</li>
                <li className="text-sm text-gray-600">Algorithm Analysis Notes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Research Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                3 new papers related to your courses
              </p>
              <Button variant="outline" className="w-full">View Updates</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;