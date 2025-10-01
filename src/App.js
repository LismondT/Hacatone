// import logo from './logo.svg';
import './App.css';
import Cabinet from './pages/user/cabinet/cabinet.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LeftBar from './components/leftBar/leftBar.jsx';
import HrMenu from './components/HRmenu/hrMenu.jsx';
import ShopPage from './pages/user/shop/shop.jsx';
import ArtefactsPage from './pages/user/artefact/artefact.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import LoginForm from './pages/login/LoginPage.jsx';
import MissionsListPage from './pages/user/missionsList/missionsList.jsx';
import MissionPage from './pages/user/missionPage/MissionPage.jsx';
import CreateMission from './pages/hr/mission/Mission.jsx';
import OnboardingPage from './pages/user/onboarding/onboarding.jsx';

function Layout() {
  const location = useLocation();
  const hideLeftBarRoutes = ["/login"]; // страницы, где скрываем LeftBar
  const shouldHideLeftBar = hideLeftBarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {/* {!shouldHideLeftBar && <LeftBar />} */}
      <HrMenu/>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cabinet"
          element={
            <ProtectedRoute>
              <Cabinet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route path="/artefacts" element={<ArtefactsPage />} />
        <Route path="/missionsList" element={<MissionsListPage />} />
        <Route path="/missionsList/:id" element={<MissionPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/hr/create-mission" element={<CreateMission />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}