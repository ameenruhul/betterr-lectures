
import React from "react";
import LecturePrep from "../components/lecture/LecturePrep";
import PageLayout from "../components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const LecturePrepPage = () => {
  const actionButtons = (
    <>
      <Button variant="outline" size="sm">
        Save Progress
      </Button>
      <Button size="sm">
        New Research
      </Button>
    </>
  );
  
  return (
    <PageLayout title="Lecture Preparation" actionButtons={actionButtons}>
      <LecturePrep />
    </PageLayout>
  );
};

export default LecturePrepPage;
