import React, { useState, Component } from "react";
import img from "../../components/assets/img/white-logo.png";
const Header =(props)=> {
 
const openLogin =()=>{
   props.setLogin();

} 
    return (
        <header>
        <nav class="navbar">
           <div class="container">
              <a class="navbar-brand"><img src={img}class="img img-fluid" alt=""/></a>
              <div class="nav-buttons">
                 <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasLogin" class="btn" type="button" onClick={e=>{
                    e.preventDefault()
                    openLogin();
                 }}>Login / Signup</button>
                 <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasPostjob" class="btn" type="button">Post a
                 Job</button>
              </div>
           </div>
        </nav>
     </header>
    
    );
  
               }

export default Header;
