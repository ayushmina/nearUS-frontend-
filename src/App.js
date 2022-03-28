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
  const  [user,setUser]= useState("");
  const history=useNavigate(); 
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
    console.log("Auth", currentuser);
    setUser(currentuser);
  });

  return () => {
    unsubscribe();
    if(user){
      history("/dasbord")
    }
  };
}, []);

  return (
    <>
    
            <Routes>
          
              <Route exact path="/" key="home" element={<Home user={user}/>} />
               <Route  path="/dashboard" key="userdashboard" element={<Dashborad user={user}/>}/>
              
              </Routes>
        
    </>
  );
}

export default App;
