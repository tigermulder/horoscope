import React from 'react';
import Header from './components/header/Header';
import ManseryeokForm from './components/userInput/ManseryeokForm';
import ManseryeokResult from './components/userResult/ManseryeokResult';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ManseryeokForm />} />
          <Route path="/result" element={<ManseryeokResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
