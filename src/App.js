// import logo from './logo.svg';
import './App.css';
import Cabinet from './pages/user/cabinet/cabinet.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftBar from './components/leftBar/leftBar.jsx';
import ShopPage from './pages/user/shop/shop.jsx';
import ArtefactsPage from './pages/user/artefact/artefact.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import LoginForm from './pages/login/LoginPage.jsx';
<<<<<<< HEAD
import CreateMission from './pages/hr/misson/shop.jsx'
=======
import MissionsListPage from './pages/user/missionsList/missionsList.jsx';
import MissionPage from './pages/user/missionPage/MissionPage.jsx';
>>>>>>> 30da6959e8208bbb9ca31bf0db813790588306f1

function App() {
  return (
    <Router>
      <div className="App">
        <LeftBar />
        <Routes>
					<Route
						path='/login'
						element={
              <ProtectedRoute requireAuth={false}>
                <LoginForm />
              </ProtectedRoute>
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
<<<<<<< HEAD
		  <Route path='/hr/create-mission' element={<CreateMission />} />
=======
					<Route path='/missionsList' element={<MissionsListPage />} />
					<Route path='/missionslist/:id' element={<MissionPage />}/>
>>>>>>> 30da6959e8208bbb9ca31bf0db813790588306f1
        </Routes>
      </div>
    </Router>
  );
}

export default App;
