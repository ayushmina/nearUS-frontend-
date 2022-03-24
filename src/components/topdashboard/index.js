import React, { useState, Component } from "react";
import img from "../../components/assets/img//NearUS-black.png";
const TopDashBoradheader =(props)=> {
 
    return (
        <header>
        <nav class="navbar">
           <div class="container">
              <a href="index.html" class="navbar-brand"><img src="./img/NearUS-black.png" class="img img-fluid" alt="" /></a>
              <div class="nav-buttons">
                 <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasPostjob" class="btn" type="button">Post a Job</button>
                 <button class="btn logged-user-icon" type="button">aj</button>
              </div>
           </div>
        </nav>
     </header>
    
    );
  
               }

export default TopDashBoradheader;
