import React, { Component, useEffect, useState } from "react";
import img1 from "../../components/assets/img/login-artwork.png" ;
import img from "../../components/assets/img/canvas-close.png"
import {   RecaptchaVerifier, signInWithPhoneNumber,} from "firebase/auth";
import { toast } from "react-toastify";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { auth } from "../../firebase";
import firebase from "../../firebase";
import { type } from "superagent/lib/utils";

const Login =(props)=> { 
 
   const [phone,setPhone]=useState("");
   const setverify=()=>{
      props.setVerify(true);
   }
   let recaptchaWrapperRef ;
   const onSignInSubmit= async ()=>{
      if (recaptchaWrapperRef) {
         recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
       }
      if(phone.length<10){
         toast('Phone Number Invalid')
         return false;
      }
      props.setLoading(true);
      
      const number = "+" + phone;
         const recaptchaVerifier = await new RecaptchaVerifier(
           "recaptcha-container",
           {
            'size': 'invisible',
           },
           auth
         );
         let result={};
          signInWithPhoneNumber(auth, number, recaptchaVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            result=confirmationResult;
         
            let dataToSend={
               phoneNumber: "+"+ phone,
            }
            props.setResult(result,dataToSend)
            toast("otp sent successfully")
            props.setLoading(false);
            document.getElementById("hellllll").innerHTML = "<div id='recaptcha'></div>";
            recaptchaVerifier.clear();

          }).catch((error) => {
            props.setLoading(false);
            toast("auth/invalid-phone-number")
            document.getElementById("hellllll").innerHTML = "<div id='recaptcha'></div>";
            recaptchaVerifier.clear();
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
                                {/* <input type="text" class="form-control" placeholder="Phone Number" onChange={(e) => {
                      setPhone(e.target.value);}}
                      maxlength="10"

                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    /> */}
                    <PhoneInput
                              country="us"
                              class="form-control changephone"
                              value={phone}
                              onChange={(phoneNumber) =>
                                setPhone( phoneNumber )
                              }
                              style={{ display: "flex", flex: 1 }}
                              alwaysDefaultMask={false}
                            
                     />
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
                    <div id="hellllll" ref={ref => recaptchaWrapperRef = ref}>
                <div id="recaptcha-container"></div>
             </div>
                    <div class="login-artwork">
                       <img src={img1} class="img img-fluid" alt="" />
                    </div>
                    </div>
        </>
    
    );
  
}

export default Login;
// {
//    "user": {
//        "uid": "mIGdjSN6EJf4nD14CbypTxF8Yq92",
//        "emailVerified": false,
//        "isAnonymous": false,
//        "phoneNumber": "+919999999999",
//        "providerData": [
//            {
//                "providerId": "phone",
//                "uid": "+919999999999",
//                "displayName": null,
//                "email": null,
//                "phoneNumber": "+919999999999",
//                "photoURL": null
//            }
//        ],
//        "stsTokenManager": {
//            "refreshToken": "AIwUaOnUxo5l4AQu2GYQZ4FVSkrSNu3jeUz6rV6fzzYgBF9Z7krb-d-FhHHW8tzql_AtqURAWMPAb7y9BfJU2Ik0KYjczYgC6axa3GT1AxXMVXjfgy95owhBqnLIGWgk99orCtA1Otf5ihV_KxMQX0-YYowFutkOtGWjhsn-r76vmE6PC3Rej5agRX0wOJjhzsvgFq4XLL_R",
//            "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2NDExN2FjMzk2YmM3MWM4YzU5ZmI1MTlmMDEzZTJiNWJiNmM2ZTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhcnVzLTlhY2NlIiwiYXVkIjoibmVhcnVzLTlhY2NlIiwiYXV0aF90aW1lIjoxNjQ4NTQ5Mjg2LCJ1c2VyX2lkIjoibUlHZGpTTjZFSmY0bkQxNENieXBUeEY4WXE5MiIsInN1YiI6Im1JR2RqU042RUpmNG5EMTRDYnlwVHhGOFlxOTIiLCJpYXQiOjE2NDg1NDkyODYsImV4cCI6MTY0ODU1Mjg4NiwicGhvbmVfbnVtYmVyIjoiKzkxOTk5OTk5OTk5OSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTk5OTk5OTk5OSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.JubVmE-Js6ea_ySuvuJJQlaRoKmWcU5inx4IMt3nRV39s-hI0rSSXcpmpSeZFdLG9ym3blYL4mAwLjZvLXS42Har1hRqKCzU_v6ZSLKC5Nx21wvJ5QZ2iTAC_L_Mv4YDKi_7sIqGQwrlLA4rNdPq6_D2kBII_N7LdBSyy-HQRdpNSCJ7y1ilhIuWdc4epv9is-iWWs2kj-LbIEf3sSItzdQJJTaM0LvkQsyTboF38xgphoiaYQnG-VfWoEcpw-Ivfb9en5eBTe700kwz7efC_Kwbz6hdo53Gta4z7Dq62eA0scyW_qqxUO1Ms2kLo6BUD_5XckLpmM8UKW9ln929_g",
//            "expirationTime": 1648552886799
//        },
//        "createdAt": "1648470561014",
//        "lastLoginAt": "1648549285607",
//        "apiKey": "AIzaSyBnW-JxS_ObTxL13cqVEcouFgaxErwrvlc",
//        "appName": "[DEFAULT]"
//    },
//    "providerId": "phone",
//    "_tokenResponse": {
//        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2NDExN2FjMzk2YmM3MWM4YzU5ZmI1MTlmMDEzZTJiNWJiNmM2ZTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhcnVzLTlhY2NlIiwiYXVkIjoibmVhcnVzLTlhY2NlIiwiYXV0aF90aW1lIjoxNjQ4NTQ5Mjg2LCJ1c2VyX2lkIjoibUlHZGpTTjZFSmY0bkQxNENieXBUeEY4WXE5MiIsInN1YiI6Im1JR2RqU042RUpmNG5EMTRDYnlwVHhGOFlxOTIiLCJpYXQiOjE2NDg1NDkyODYsImV4cCI6MTY0ODU1Mjg4NiwicGhvbmVfbnVtYmVyIjoiKzkxOTk5OTk5OTk5OSIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTk5OTk5OTk5OSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.JubVmE-Js6ea_ySuvuJJQlaRoKmWcU5inx4IMt3nRV39s-hI0rSSXcpmpSeZFdLG9ym3blYL4mAwLjZvLXS42Har1hRqKCzU_v6ZSLKC5Nx21wvJ5QZ2iTAC_L_Mv4YDKi_7sIqGQwrlLA4rNdPq6_D2kBII_N7LdBSyy-HQRdpNSCJ7y1ilhIuWdc4epv9is-iWWs2kj-LbIEf3sSItzdQJJTaM0LvkQsyTboF38xgphoiaYQnG-VfWoEcpw-Ivfb9en5eBTe700kwz7efC_Kwbz6hdo53Gta4z7Dq62eA0scyW_qqxUO1Ms2kLo6BUD_5XckLpmM8UKW9ln929_g",
//        "refreshToken": "AIwUaOnUxo5l4AQu2GYQZ4FVSkrSNu3jeUz6rV6fzzYgBF9Z7krb-d-FhHHW8tzql_AtqURAWMPAb7y9BfJU2Ik0KYjczYgC6axa3GT1AxXMVXjfgy95owhBqnLIGWgk99orCtA1Otf5ihV_KxMQX0-YYowFutkOtGWjhsn-r76vmE6PC3Rej5agRX0wOJjhzsvgFq4XLL_R",
//        "expiresIn": "3600",
//        "localId": "mIGdjSN6EJf4nD14CbypTxF8Yq92",
//        "isNewUser": false,
//        "phoneNumber": "+919999999999"
//    },
//    "operationType": "signIn"
// }