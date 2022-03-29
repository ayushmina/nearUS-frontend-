import React, { Component, useEffect, useState } from "react"
import img1 from "../../components/assets/img/login-artwork.png" ;
import OtpInput from 'react-otp-input';
import Cookies from 'universal-cookie';
import loginAction from "../../actions/login.action";
const Verify = (props) => {
  let cookie = new Cookies();

  var [otp, setOtp] = useState("")

  useEffect(() => {
     console.log(props.result,"here is props.result in vvvvi")
  }, [])
  const verifyOtp = async (e) => {
    e.preventDefault()
    console.log(otp,"here is otp")
    if (otp === "" || otp === null) return
    try {
     let data= await props.result.confirm(otp)
      console.log("verify otp",data)
      let {phoneNumber}=props.dataToSend;

      let dataToSend={
        phoneNumber:phoneNumber,
        firebaseUID:data.user.uid
      }
      loginAction.login(dataToSend,(err,res)=>{
        if(err){
          console.log(res,"here is ")
        }else{
          
          console.log(res,"here is ")
        }
      });
      cookie.set("token",data._tokenResponse.idToken);
      // window.location.reload(); 
    } catch (err) {
      console.log("verify eroor", err)
    }
  }
 const handleOtpChange=(e) => {
   setOtp(e);
   console.log(otp);
 
 }
  //
  return (
    <div class="post-job-content">
      <h3 class="mb-0">
        Verify <span>OTP</span>
      </h3>
      <p>
        We have sent an OTP to your Phone Number. <br /> <b>{props.dataToSend.phone}</b>{" "}
        <a href="javascript:;">Update Number</a>{" "}
      </p>
      <div class="mt-5">
        <div class="row">
          <div class="col-lg-12">
          <div className="input-group otp-input">
                        
                        <OtpInput
                          value={otp}
                          onChange={handleOtpChange}
                          numInputs={6}
                          separator={<span> </span>}
                        />
                      </div>
          </div>
          <div class="col-lg-12">
            <div class="otp-btn-ul">
              <a href="#">
                <button class="btn post-main-btn" type="button" onClick={(e)=>{
                  e.preventDefault();
                  window.location.reload();
                }}>
                  Start Again
                </button>
              </a>
              <a href="posted-jobs.html">
                <button class="btn post-main-btn" type="button" onClick={(e)=>{
                   verifyOtp(e);
                }}>
                  Verify
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="login-artwork">
        <img src={img1} class="img img-fluid" alt="" />
      </div>
    </div>
  )
}

export default Verify

// {
//   "user": {
//       "uid": "hn1K4Cy7dgV0owz9pzQ1Uo1UqhJ2",
//       "emailVerified": false,
//       "isAnonymous": false,
//       "phoneNumber": "+918949208418",
//       "providerData": [
//           {
//               "providerId": "phone",
//               "uid": "+918949208418",
//               "displayName": null,
//               "email": null,
//               "phoneNumber": "+918949208418",
//               "photoURL": null
//           }
//       ],
//       "stsTokenManager": {
//           "refreshToken": "AIwUaOmpDlhUV8CRSAu01YUVxb49IBqmolay1RaAP0TKOBW1sIXFTC0bLzC7Ugdp3NO1SwJ7EPVcHQcRDVw11rY3IN2YTHxGFghY0w3rMplrqvYFS-ietzavsjVQiqDCkuEOPDShAXXNO3S53MGXLA22uZPtkq7uXsIDphBGzw8zc615l0ype9B49yzoMZyj_2quLXASgqC1",
//           "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhcnVzLTlhY2NlIiwiYXVkIjoibmVhcnVzLTlhY2NlIiwiYXV0aF90aW1lIjoxNjQ4NDY1OTU5LCJ1c2VyX2lkIjoiaG4xSzRDeTdkZ1Ywb3d6OXB6UTFVbzFVcWhKMiIsInN1YiI6ImhuMUs0Q3k3ZGdWMG93ejlwelExVW8xVXFoSjIiLCJpYXQiOjE2NDg0NjU5NTksImV4cCI6MTY0ODQ2OTU1OSwicGhvbmVfbnVtYmVyIjoiKzkxODk0OTIwODQxOCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODk0OTIwODQxOCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.AlGNTRfwzPvbZqHNY2tD7-1-la0NepKRG36wwIGO5oLhbsrRV4FcjSmrC0_RZg4cVZYGTVCedv5Cm4ohVX3kjzvIIkbwhj49VEaAkVV_whsZCsVS8MIsbrbkoqlTTX6XHMSzgfBrBgEo_j4_Mph9qfQjfq3S8n-bicHImS6to7nJeK-rIXxRE3r59hZMv3wywXfzIkLWhHGQ2ksiWKKjVWru0Sb6RkI5MkatiA0b2NeXaent_38SaoUfpNlKWdx7cT_ymTYKSmVm_ALpg_JhbjE1QMgzURM0ew6k05XgZSonOvGnMJtOW5QHLs5ZVQ2venz3rOQ6w1OS9lHtxdGUVA",
//           "expirationTime": 1648469559679
//       },
//       "createdAt": "1648193087127",
//       "lastLoginAt": "1648465959140",
//       "apiKey": "AIzaSyBnW-JxS_ObTxL13cqVEcouFgaxErwrvlc",
//       "appName": "[DEFAULT]"
//   },
//   "providerId": "phone",
//   "_tokenResponse": {
//       "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIwNmExMTkxNThlOGIyODIxNzE0MThhNjdkZWE4Mzc0MGI1ZWU3N2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmVhcnVzLTlhY2NlIiwiYXVkIjoibmVhcnVzLTlhY2NlIiwiYXV0aF90aW1lIjoxNjQ4NDY1OTU5LCJ1c2VyX2lkIjoiaG4xSzRDeTdkZ1Ywb3d6OXB6UTFVbzFVcWhKMiIsInN1YiI6ImhuMUs0Q3k3ZGdWMG93ejlwelExVW8xVXFoSjIiLCJpYXQiOjE2NDg0NjU5NTksImV4cCI6MTY0ODQ2OTU1OSwicGhvbmVfbnVtYmVyIjoiKzkxODk0OTIwODQxOCIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODk0OTIwODQxOCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.AlGNTRfwzPvbZqHNY2tD7-1-la0NepKRG36wwIGO5oLhbsrRV4FcjSmrC0_RZg4cVZYGTVCedv5Cm4ohVX3kjzvIIkbwhj49VEaAkVV_whsZCsVS8MIsbrbkoqlTTX6XHMSzgfBrBgEo_j4_Mph9qfQjfq3S8n-bicHImS6to7nJeK-rIXxRE3r59hZMv3wywXfzIkLWhHGQ2ksiWKKjVWru0Sb6RkI5MkatiA0b2NeXaent_38SaoUfpNlKWdx7cT_ymTYKSmVm_ALpg_JhbjE1QMgzURM0ew6k05XgZSonOvGnMJtOW5QHLs5ZVQ2venz3rOQ6w1OS9lHtxdGUVA",
//       "refreshToken": "AIwUaOmpDlhUV8CRSAu01YUVxb49IBqmolay1RaAP0TKOBW1sIXFTC0bLzC7Ugdp3NO1SwJ7EPVcHQcRDVw11rY3IN2YTHxGFghY0w3rMplrqvYFS-ietzavsjVQiqDCkuEOPDShAXXNO3S53MGXLA22uZPtkq7uXsIDphBGzw8zc615l0ype9B49yzoMZyj_2quLXASgqC1",
//       "expiresIn": "3600",
//       "localId": "hn1K4Cy7dgV0owz9pzQ1Uo1UqhJ2",
//       "isNewUser": false,
//       "phoneNumber": "+918949208418"
//   },
//   "operationType": "signIn"
// }