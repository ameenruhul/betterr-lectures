
import React, { useState } from "react";
import LecturePrep from "../components/lecture/LecturePrep";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LecturePrepPage = () => {
  const navigate = useNavigate();
  
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
          <h1 className="text-xl font-semibold">Lecture Preparation</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Save Progress
          </Button>
          <Button size="sm">
            New Research
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <LecturePrep />
      </div>
    </div>
  );
};

export default LecturePrepPage;
