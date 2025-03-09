
import React, { useState } from "react";
import LessonPlanAI from "../components/lecture/LessonPlanAI";
import ClassPlanCreator from "../components/lecture/ClassPlanCreator";
import { ArrowLeft, BookOpen, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LessonPlanPage = () => {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState<"lesson" | "class">("lesson");
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Planning Tools</h1>
        </div>
        
        <Tabs 
          value={planType} 
          onValueChange={(value) => setPlanType(value as "lesson" | "class")}
          className="w-auto"
        >
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="lesson" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Lesson Plan Creator
            </TabsTrigger>
            <TabsTrigger value="class" className="flex items-center">
              <Clipboard className="h-4 w-4 mr-2" />
              Class Plan Creator
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1">
        {planType === "lesson" ? (
          <LessonPlanAI />
        ) : (
          <ClassPlanCreator />
        )}
      </div>
    </div>
  );
};

export default LessonPlanPage;
