
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CourseCreate from "./pages/CourseCreate";
import LecturesPanel from "./pages/CoursePanel";
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
import Landing from "./pages/Landing";
import { useEffect } from "react";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import OnboardingComplete from "./components/onboarding/OnboardingComplete";
import Reminders from "./pages/tools/Reminders";
import MindMaps from "./pages/tools/MindMaps";
import StickyNotes from "./pages/tools/StickyNotes";
import LectureNotes from "./pages/tools/LectureNotes";
import ConceptMapper from "./pages/tools/ConceptMapper";
import ClassroomJournal from "./pages/tools/ClassroomJournal";

// Account and Billing pages
import AccountPage from "./pages/account";
import ProfilePage from "./pages/account/profile";
import BillingPage from "./pages/account/billing";
import PaymentHistoryPage from "./pages/account/payment-history";

function App() {
  useEffect(() => {
    // Update the document title
    document.title = "Better Lectures";
    
    // Try to update favicon dynamically
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      // You can replace this with a direct path to your favicon if you add one
      link.href = "/favicon.ico";
    }
  }, []);

  return (
    <OnboardingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/create" element={<CourseCreate />} />
          <Route path="/courses/:id" element={<LecturesPanel />} />
          <Route path="/courses/:courseId/lectures" element={<LecturesList />} />
          <Route path="/courses/:courseId/lectures/:lectureId" element={<LecturesPanel />} />
          <Route path="/lesson-plan" element={<LessonPlan />} />
          <Route path="/lecture-prep" element={<LecturePrep />} />
          <Route path="/quiz-builder" element={<QuizBuilder />} />
          <Route path="/quiz-solver" element={<QuizSolver />} />
          <Route path="/assignment-generator" element={<AssignmentGenerator />} />
          <Route path="/assignment-solver" element={<AssignmentSolver />} />
          <Route path="/study-guide" element={<StudyGuide />} />
          <Route path="/research" element={<Research />} />
          <Route path="/lectures-panel" element={<LecturesPanel />} />
          
          {/* Account and Billing Routes */}
          <Route path="/account" element={<AccountPage />}>
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/billing" element={<BillingPage />} />
            <Route path="/account/payment-history" element={<PaymentHistoryPage />} />
            <Route index element={<ProfilePage />} />
          </Route>
          
          {/* Tool Routes */}
          <Route path="/tools/reminders" element={<Reminders />} />
          <Route path="/tools/mind-maps" element={<MindMaps />} />
          <Route path="/tools/sticky-notes" element={<StickyNotes />} />
          <Route path="/tools/lecture-notes" element={<LectureNotes />} />
          <Route path="/tools/concept-mapper" element={<ConceptMapper />} />
          <Route path="/tools/classroom-journal" element={<ClassroomJournal />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <OnboardingComplete />
      </Router>
    </OnboardingProvider>
  );
}

export default App;
