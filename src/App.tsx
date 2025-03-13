
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CourseCreate from './pages/CourseCreate';
import LecturesPanel from './pages/CoursePanel';
import LecturesList from './pages/LecturesList';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/Toaster';
import LessonPlan from './pages/LessonPlan';
import LecturePrep from './pages/LecturePrep';
import QuizBuilder from './pages/QuizBuilder';
import QuizSolver from './pages/QuizSolver';
import AssignmentGenerator from './pages/AssignmentGenerator';
import AssignmentSolver from './pages/AssignmentSolver';
import StudyGuide from './pages/StudyGuide';
import Research from './pages/Research';
import Landing from './pages/Landing';
import { useEffect } from 'react';
import { OnboardingProvider } from './contexts/OnboardingContext';
import OnboardingComplete from './components/onboarding/OnboardingComplete';
import Reminders from './pages/tools/Reminders';
import MindMaps from './pages/tools/MindMaps';
import StickyNotes from './pages/tools/StickyNotes';
import LectureNotes from './pages/tools/LectureNotes';
import ConceptMapper from './pages/tools/ConceptMapper';
import ClassroomJournal from './pages/tools/ClassroomJournal';

// Account and Billing pages
import AccountPage from './pages/account';
import ProfilePage from './pages/account/profile';
import BillingPage from './pages/account/billing';
import PaymentHistoryPage from './pages/account/payment-history';

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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses/create" element={<ProtectedRoute><CourseCreate /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><LecturesPanel /></ProtectedRoute>} />
          <Route path="/courses/:courseId/lectures" element={<ProtectedRoute><LecturesList /></ProtectedRoute>} />
          <Route path="/courses/:courseId/lectures/:lectureId" element={<ProtectedRoute><LecturesPanel /></ProtectedRoute>} />
          <Route path="/lesson-plan" element={<ProtectedRoute><LessonPlan /></ProtectedRoute>} />
          <Route path="/lecture-prep" element={<ProtectedRoute><LecturePrep /></ProtectedRoute>} />
          <Route path="/quiz-builder" element={<ProtectedRoute><QuizBuilder /></ProtectedRoute>} />
          <Route path="/quiz-solver" element={<ProtectedRoute><QuizSolver /></ProtectedRoute>} />
          <Route path="/assignment-generator" element={<ProtectedRoute><AssignmentGenerator /></ProtectedRoute>} />
          <Route path="/assignment-solver" element={<ProtectedRoute><AssignmentSolver /></ProtectedRoute>} />
          <Route path="/study-guide" element={<ProtectedRoute><StudyGuide /></ProtectedRoute>} />
          <Route path="/research" element={<ProtectedRoute><Research /></ProtectedRoute>} />
          <Route path="/lectures-panel" element={<ProtectedRoute><LecturesPanel /></ProtectedRoute>} />
          
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
