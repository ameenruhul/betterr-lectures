import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseCreate from "./pages/CourseCreate";
import MaterialGenerator from "./pages/MaterialGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courses/create" element={<CourseCreate />} />
        <Route path="/materials/generate" element={<MaterialGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
