import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PracticePage } from './pages/PracticePage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { HistoryPage } from './pages/HistoryPage';
import { ResultsPage } from './pages/ResultsPage';
import { TestChecklistPage } from './pages/TestChecklistPage';
import { ShipPage } from './pages/ShipPage';
import { RBStepPage } from './pages/rb/RBStepPage';
import { RBProofPage } from './pages/rb/RBProofPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/prp/07-test" element={<TestChecklistPage />} />
      <Route path="/prp/08-ship" element={<ShipPage />} />
      <Route path="/rb/proof" element={<RBProofPage />} />
      <Route path="/rb/01-problem" element={<RBStepPage />} />
      <Route path="/rb/02-market" element={<RBStepPage />} />
      <Route path="/rb/03-architecture" element={<RBStepPage />} />
      <Route path="/rb/04-hld" element={<RBStepPage />} />
      <Route path="/rb/05-lld" element={<RBStepPage />} />
      <Route path="/rb/06-build" element={<RBStepPage />} />
      <Route path="/rb/07-test" element={<RBStepPage />} />
      <Route path="/rb/08-ship" element={<RBStepPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="analyzer" element={<AnalyzerPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
