
import React, { useState } from "react";
import LessonPlanAI from "../components/lecture/LessonPlanAI";
import ClassPlanCreator from "../components/lecture/ClassPlanCreator";
import { BookOpen, Clipboard } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LessonPlanPage = () => {
  const [planType, setPlanType] = useState<"lesson" | "class">("lesson");
  
  const actionButtons = (
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
  );
  
  return (
    <PageLayout title="Planning Tools" actionButtons={actionButtons}>
      {planType === "lesson" ? (
        <LessonPlanAI />
      ) : (
        <ClassPlanCreator />
      )}
    </PageLayout>
  );
};

export default LessonPlanPage;
