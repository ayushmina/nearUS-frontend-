import React, { Component, useState ,useEffect } from "react";
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { auth } from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import Home from './components/home';
import {useNavigate} from 'react-router-dom'
import Dashborad from './components/dashboard';

function App() {
 
  const history=useNavigate(); 


  return (
    <>
    
            <Routes>
          
              <Route exact path="/" key="home" element={<Home />} />
               <Route  path="/dashboard" key="userdashboard" element={<Dashborad />}/>
              
              </Routes>
        
    </>
  );
}

export default App;
