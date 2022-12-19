import React from 'react';
import './App.css';
import MainPage from './Pages/MainPage';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TopResultPage from './Pages/TopResultPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path ="/" element = {<MainPage />} />
          <Route  path ="/topResultsPage" element = {<TopResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
