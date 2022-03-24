import React, { useState, Component } from "react";
import img from "../../components/assets/img/search-icon.png";
// import img from "../../assets/img/icon-result-purple.png" ;
import img1 from "../../components/assets/img/location-icon.png";
import img2 from "../../components/assets/img/watch-icon.png" ;
import img3 from "../../components/assets/img/gcap-icon.png";
import img4 from "../../components/assets/img/edit-icon.png";
import img5 from "../../components/assets/img/delete-icon.png";
import img6 from "../../components/assets/img/icon-result-purple.png";

const DashPost =(props)=> {
 

    return (
        
        <section class="search-result-wrp">
        <div class="container">
           <div class="row">
              <div class="col-lg-6">
                 <div class="common-head">
                    <h2>Your Posted <span>Jobs</span></h2>
                 </div>
              </div>
              <div class="col-lg-6">
                 <div class="search-wrp">
                    <input type="text" placeholder="Search your Jobs by Name" class="form-control" />
                    <img src={img} class="img img-fluid" alt="" />
                 </div>
              </div>
           </div>
           <div class="search-accordian">
              <div class="accordion" id="accordionExample">
                 <div class="row">
                    <div class="col-lg-6">
                       <div class="accordion-item">
                          <h2 class="accordion-header" id="headingOne">
                             <div class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <div class="search-acc-header">
                                   <div class="search-acc-icon">
                                      <img src={img6} alt=""/>
                                   </div>
                                   <div class="search-acc-header-content">
                                      <h3>Cashier</h3>
                                      <p>Delliah's Cake Shop</p>
                                      <div>
                                         <ul>
                                            <li>
                                               <h6><img src={img1} alt="" /> Queens, New York</h6>
                                            </li>
                                            <li>
                                               <h6><img src={img1} alt=""/> $15/ hour</h6>
                                            </li>
                                            <li>
                                               <h6><img src={img2} alt=""/> Part Time</h6>
                                            </li>
                                            <li>
                                               <h6><img src={img3} alt=""/> 1-2 Years</h6>
                                            </li>
                                         </ul>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                             data-bs-parent="#accordionExample">
                             <div class="accordion-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                   incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                   dolor 
                                </p>
                             </div>
                             <div class="acc-contact-details">
                                <ul class="">
                                   <li class="border-0"><button class="btn" type="button"><img src={img4} alt=""/>Edit</button></li>
                                   <li class="border-0"><button class="btn" type="button"><img src={img5} alt=""/>Delete</button></li>
                                   <li class="border-0"><button class="btn" type="button"><img src={img5} alt=""/>Repost</button></li>
                                </ul>
                             </div>
                          </div>
                       </div>
                    </div>                    
                    </div>
                 </div>
              </div>
           </div>
     </section>
    );
  
               }

export default DashPost;
