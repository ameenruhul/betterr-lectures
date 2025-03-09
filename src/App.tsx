
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CourseCreate from "./pages/CourseCreate";
import CoursePanel from "./pages/CoursePanel";
import LecturesList from "./pages/LecturesList";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { Toaster } from "./components/ui/Toaster";
import LessonPlan from "./pages/LessonPlan";
import LecturePrep from "./pages/LecturePrep";
import QuizBuilder from "./pages/QuizBuilder";
import QuizSolver from "./pages/QuizSolver";
import AssignmentGenerator from "./pages/AssignmentGenerator";
import AssignmentSolver from "./pages/AssignmentSolver";
import StudyGuide from "./pages/StudyGuide";
import Research from "./pages/Research";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Update the document title
    document.title = "Better Lectures";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/create" element={<CourseCreate />} />
        <Route path="/courses/:id" element={<CoursePanel />} />
        <Route path="/courses/:courseId/lectures" element={<LecturesList />} />
        <Route path="/courses/:courseId/lectures/:lectureId" element={<CoursePanel />} />
        <Route path="/lesson-plan" element={<LessonPlan />} />
        <Route path="/lecture-prep" element={<LecturePrep />} />
        <Route path="/quiz-builder" element={<QuizBuilder />} />
        <Route path="/quiz-solver" element={<QuizSolver />} />
        <Route path="/assignment-generator" element={<AssignmentGenerator />} />
        <Route path="/assignment-solver" element={<AssignmentSolver />} />
        <Route path="/study-guide" element={<StudyGuide />} />
        <Route path="/research" element={<Research />} />
        <Route path="/lectures-panel" element={<CoursePanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
