import React, { useState, Component } from "react";
import img from "../../components/assets/img/white-logo.png";
import {useNavigate} from 'react-router-dom'

const Header =(props)=> {
const history=useNavigate(); 
const openLogin =()=>{
   if(props.user){
      history("/dashboard")
   }else{
   props.setLogin();
   }
}
const showPost=()=>{

   props.showPost();

} 
    return (
        <header>
        <nav class="navbar">
           <div class="container">
              <a class="navbar-brand"><img src={img}class="img img-fluid" alt=""/></a>
              <div class="nav-buttons">
                 <button  class="btn" type="button"    onClick={e=>{
      e.preventDefault()
      openLogin();
   }} >
      {props.user ? 'Dashboard' : 'Login/signup'}</button>

      {props.user ?
                 <button   class="btn" type="button"onClick={e=>{
      e.preventDefault()
      showPost();
   }}        >Post a
                 Job</button>:
                 ''}
              </div>
           </div>
        </nav>
     </header>
    
    );
  
               }

export default Header;
