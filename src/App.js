// import logo from './logo.svg';
import './App.css';
import Cabinet from './pages/cabinet/cabinet.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftBar from './components/rightBar/leftBar.jsx';
import ShopPage from './pages/shop/shop.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <LeftBar />
        <Routes>
          <Route path='/' element={<Cabinet />} />
          <Route path='/cabinet' element={<Cabinet />} />
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
