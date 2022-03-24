import React, { Component, useState } from "react";
import img1 from "../../components/assets/img//login-artwork.png" ;
// import img from "../../assets/img//";
const Login =()=> {

   const [phone,setPhone]=useState("");
   // 
    return (
        <>
         <div class="offcanvas offcanvas-end common-offcanvas" tabindex="-1" id="offcanvasPostjob"
            aria-labelledby="offcanvasPostjobLabel">
           <div class="canvas-wrp">
              {/* <div class="offcanvas-header">
                 <img class="canvas-close" data-bs-dismiss="offcanvas" src={img} className="img img-fluid"
                    alt="" />
              </div> */}
              <div class="offcanvas-body">
                 <div class="post-job-content">
                    <h3 class="mb-0">Login as <span>Employer</span></h3>
                    <p>Add, View, Edit or Repost jobs!</p>
                    <div class="mt-5">
                       <div class="row">
                          <div class="col-lg-12">
                             <div class="">
                                <input type="text" class="form-control" placeholder="Phone Number" onChange={(e) => {
                      setPhone(e.target.value);
                    }}/>
                             </div>
                          </div>
                          <div class="col-lg-12">
                             <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasVerifyotp" class="btn post-main-btn" type="button">Login</button>
                          </div>
                       </div>
                    </div>
                    <div class="login-artwork">
                       <img src={img1} class="img img-fluid" alt="" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
       
        </>
    
    );
  
}

export default Login;
