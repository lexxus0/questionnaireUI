import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy } from "react";

const MainPage = lazy(() => import("./pages/MainPage"));
const QuestionnaireBuilder = lazy(() => import("./pages/BuilderPage"));
const QuestionnaireRunner = lazy(() => import("./pages/QuestionnaireRunner"));

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<MainPage />} />
        <Route
          path="/questionnaire/:id/build"
          element={<QuestionnaireBuilder />}
        />
        <Route
          path="/questionnaire/:id/update"
          element={<QuestionnaireBuilder />}
        />
        <Route
          path="/questionnaire/:id/run"
          element={<QuestionnaireRunner />}
        />
      </Routes>
    </main>
  );
}
