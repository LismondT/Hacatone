// import logo from './logo.svg';
import './App.css';
import Cabinet from './pages/user/cabinet/cabinet.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftBar from './components/leftBar/leftBar.jsx';
import ShopPage from './pages/user/shop/shop.jsx';
import ArtefactsPage from './pages/user/artefact/artefact.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <LeftBar />
        <Routes>
          <Route path='/' element={<Cabinet />} />
          <Route path='/cabinet' element={<Cabinet />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/artefacts' element={<ArtefactsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
