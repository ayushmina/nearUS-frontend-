import React, { Component, useState } from "react";
import img1 from "../../components/assets/img/login-artwork.png" ;
import img from "../../components/assets/img/canvas-close.png"
import {   RecaptchaVerifier, signInWithPhoneNumber,} from "firebase/auth";
 import { auth } from "../../firebase";

// import img from "../../assets/img//";
import firebase from "../../firebase";
console.log("zFirebase", firebase.auth)
const Login =(props)=> { 

   const [phone,setPhone]=useState("");
   const setverify=()=>{
      props.setVerify(true);
   }
   // const backToLogin=()=>{
   //    props.backToLogin();
   // }
   // 
   const onSignInSubmit= async ()=>{
      console.log(phone,'phone is here ')
      const number = "+91"+phone;
         const recaptchaVerifier = await new RecaptchaVerifier(
           "recaptcha-container",
           {},
           auth
         );
         recaptchaVerifier.render();
         let result={};
          signInWithPhoneNumber(auth, number, recaptchaVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            result=confirmationResult;
            console.log(result,"here is result");
            props.setResult(result)


          }).catch((error) => {

           console.log(error,"here is eroor");
          });

   }

    return (
        <>
      
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
                             <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasVerifyotp" class="btn post-main-btn" type="button" onClick={e=>{
                                 e.preventDefault();
                                 onSignInSubmit();
                             }}>Login</button>
                          </div>
                       </div>
                    </div>
                    <div id="recaptcha-container"></div>
                    <div class="login-artwork">
                       <img src={img1} class="img img-fluid" alt="" />
                    </div>
                    </div>
        </>
    
    );
  
}

export default Login;
