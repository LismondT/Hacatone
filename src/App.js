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
import CreateMission from './pages/hr/mission/Mission.jsx'
=======
import CreateMission from './pages/hr/misson/shop.jsx'
>>>>>>> 90ff172e4183f2004ef109f54836528bc8f91a35

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
		  <Route path='/hr/create-mission' element={<CreateMission />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
