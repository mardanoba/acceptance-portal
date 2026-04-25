import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import WelcomePage from './pages/WelcomePage';
import StatusPage from './pages/StatusPage';
import CongratulationsPage from './pages/CongratulationsPage';
import WorkIDPage from './pages/WorkIDPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/welcome/:token" element={<WelcomePage />} />
        <Route path="/status/:token" element={<StatusPage />} />
        <Route path="/congratulations/:token" element={<CongratulationsPage />} />
        <Route path="/work-id/:token" element={<WorkIDPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;