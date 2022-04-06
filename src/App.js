import React, { Component, useState ,useEffect } from "react";
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import { auth } from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import Home from './components/home';
import {useNavigate} from 'react-router-dom'
import Dashboard from './components/dashboard';
import NotFound from "./components/notFound";

function App() {
 
  const history=useNavigate(); 


  return (
    <>
    
            <Routes>
          
              <Route exact path="/" key="home" element={<Home />} />
               <Route exact path="/dashboard" key="userdashboard" element={<Dashboard />}/>
               <Route path="*" element={<Navigate to="/" />} />
              </Routes>
        
    </>
  );
}

export default App;
