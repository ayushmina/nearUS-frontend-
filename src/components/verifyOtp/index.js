import React, { Component, useEffect, useState } from "react";
import img1 from "../../components/assets/img/login-artwork.png";
import {   RecaptchaVerifier, signInWithPhoneNumber,} from "firebase/auth";
import OtpInput from "react-otp-input";
import Cookies from "universal-cookie";
import loginAction from "../../actions/login.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Verify = (props) => {
  const history = useNavigate();
  let recaptchaWrapperRef ;
  let cookie = new Cookies();
  var [otp, setOtp] = useState("");
  const [result,setResult]=useState(props.result);
  const [flag,setFlag]=useState(true);


  useEffect(() => {
    setResult(props.result);
  }, []);
  const resentOtp= async ()=>{
    setFlag(false);
    if (recaptchaWrapperRef) {
       recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
     }
    props.setLoading(true);
    
    const number = "+" + props.dataToSend.phoneNumber;
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
          setResult(result);
          toast("OTP Sent Successfully")
          props.setLoading(false);
        }).catch((error) => {
          props.setLoading(false);
          toast("Auth/invalid-phone-number")
          document.getElementById("hellllll").innerHTML = "<div id='recaptcha'></div>";
          recaptchaVerifier.clear();
         console.log(error,"here is eroor");
        });

 }

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) return;
    try {
      props.setLoading(true);
      console.log(result,"here is result")
      let data =await result.confirm(otp);
      console.log(data,"data is here ")
      let { phoneNumber } = props.dataToSend;
      let dataToSend = {
        phoneNumber: phoneNumber,
        firebaseUID: data.user.uid,
      };
      loginAction.login(dataToSend, (err, res) => {
        if (err) {
          props.setLoading(false);
          document.getElementById("hellllll").innerHTML = "<div id='recaptcha'></div>";
          console.log("here is otp error", res);
        } else {
          props.setLoading(false);
          cookie.set("x-access-token-ns", data._tokenResponse.idToken);
          toast("OTP match successful")
          history("/dashboard");
        }
      });
    } catch (err) {
      document.getElementById("hellllll").innerHTML = "<div id='recaptcha'></div>";
      props.setLoading(false);
      toast("Incorrect OTP",err);
      console.log("verify eroor", err);
    }
  };
  const handleOtpChange = (e) => {
    setOtp(e);
  };
  return (
    <div class="post-job-content">
      <ToastContainer />

      <h3 class="mb-0">
        Verify <span>OTP</span>
      </h3>
      <p>
        We have sent an OTP to your Phone Number. <br />{" "}
        <b>{props.dataToSend.phone}</b>
         {/* <a href="javascript:;">Update Number</a>{" "} */}
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
            {flag?
              <a href="#">
                <button
                  class="btn post-main-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    resentOtp();
                    // window.location.reload();
                  }}
                >
                  Resend OTP
                </button>
              </a>
          :""}
              <a href="posted-jobs.html">
                <button
                  class="btn post-main-btn"
                  type="button"
                  onClick={(e) => {
                    verifyOtp(e);
                  }}
                >
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
      <div id="hellllll" ref={ref => recaptchaWrapperRef = ref}>
                <div id="recaptcha-container"></div>
             </div>
    </div>
  );
};

export default Verify;