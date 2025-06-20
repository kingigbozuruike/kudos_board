import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
