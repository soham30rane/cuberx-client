import React, { useState } from 'react';
import './App.css';
// import Home from './components/Home/home';
import Navbar from './components/Navbar/navbar';
import StatsBrief from './components/StatsBrief/statsBrief';
import statsBriefData from './dummyData';
// import TokenContext from './contexts/tokenContext';
// import { Route, BrowserRouter as Router,Routes } from 'react-router-dom'; 
// import Login from './components/Login/login';
// import useToken from './hooks/useToken';
// import Register from './components/Register/register';
import BgContext from './contexts/bgContext';

import AuthProvider from './providers/authProvider';
import ContentRoutes from './routes';

function App() {
  // const { token , setToken , saveToken , getToken  } = useToken()
  const [contentBg, setContentBg] = useState("#f5f5f5")
  const updateContentBg = (hexColor) => {
    setContentBg(hexColor)
  }

  return (
    <div className="App">
      <AuthProvider>
        <BgContext.Provider value={{ updateContentBg }}>
          <Navbar />
          <div className="content-container">
            <div className="main-content" style={{ backgroundColor: contentBg }} >
              <ContentRoutes />
            </div>
            <div className="divider"></div>
            <div className="statistics">
              <StatsBrief todaySolves={statsBriefData.todaySolves} bestSolve={statsBriefData.bestSolve} avgSolve={statsBriefData.avgSolve} />
            </div>
          </div>
        </BgContext.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
