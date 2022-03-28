import React, { Component, useEffect, useState } from "react"
import img from "../../components/assets/img/login-artwork.png"
import img1 from "../../components/assets/img/canvas-close.png"
import OtpInput from 'react-otp-input';
const Verify = (props) => {
  
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
      window.location.reload(); 
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
        We have sent an OTP to your Phone Number. <br /> <b>{props.phone}</b>{" "}
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
                <button class="btn post-main-btn" type="button">
                  Resend OTP
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
