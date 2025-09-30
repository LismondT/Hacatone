// import logo from './logo.svg';
import './App.css';
import Cabinet from './pages/user/cabinet/cabinet.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        {/* <LeftBar /> */}
		<HrMenu/>
        <Routes>
		<Route
			path='/login'
			element={
              <ProtectedRoute requireAuth={false}>
                <LoginForm />
              </ProtectedRoute>
<<<<<<< HEAD
        	} />
        <Route
			path='/'
			element={
				<ProtectedRoute>
					<Cabinet />
				</ProtectedRoute>
			} />
		<Route
			path='/cabinet'
			element={
				<ProtectedRoute>
					<Cabinet />
				</ProtectedRoute>
			} />
		<Route
			path='/shop'
			element={
				<ProtectedRoute>
					<ShopPage />
				</ProtectedRoute>
			} />
        <Route path='/artefacts' element={<ArtefactsPage />} />
		<Route path='/missionsList' element={<MissionsListPage />} />
		<Route path='/missionsList/:id' element={<MissionPage />} />
		<Route path='/hr/create-mission' element={<CreateMission />} />
=======
            } />
          <Route
						path='/'
						element={
							<ProtectedRoute>
								<OnboardingPage />
							</ProtectedRoute>
					} />
          <Route
						path='/cabinet'
						element={
							<ProtectedRoute>
								<Cabinet />
							</ProtectedRoute>
						} />
          <Route
						path='/shop'
						element={
							<ProtectedRoute>
								<ShopPage />
							</ProtectedRoute>
						} />
          <Route path='/artefacts' element={<ArtefactsPage />} />
					<Route path='/missionsList' element={<MissionsListPage />} />
					<Route path='/missionsList/:id' element={<MissionPage />} />
					<Route path='/onboarding' element={<OnboardingPage />} />
		  <Route path='/hr/create-mission' element={<CreateMission />} />
>>>>>>> a1c84ce4e4d9adb4d3b4cf1cad10e369b8b9e7d9
        </Routes>
      </div>
    </Router>
  );
}

export default App;
