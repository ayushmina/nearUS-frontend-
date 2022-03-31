import React, { Component, useEffect, useState } from "react";
import img1 from "../../components/assets/img/login-artwork.png";
import OtpInput from "react-otp-input";
import Cookies from "universal-cookie";
import loginAction from "../../actions/login.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Verify = (props) => {
  const history = useNavigate();
  let cookie = new Cookies();
  var [otp, setOtp] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    console.log(props.result, "here is props.result in vvvvi");
  }, []);


  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp, "here is otp");
    if (otp === "" || otp === null) return;
    try {
      setIsloading(true);
      let data = await props.result.confirm(otp);
      console.log("verify otp", data);
      let { phoneNumber } = props.dataToSend;
      let dataToSend = {
        phoneNumber: phoneNumber,
        firebaseUID: data.user.uid,
      };
      loginAction.login(dataToSend, (err, res) => {
        if (err) {
          console.log("here is ottttttp error", res);
        } else {
          setIsloading(false);
          cookie.set("x-access-token-ns", data._tokenResponse.idToken);
          toast("otp match successful")
          history("/dashboard");
        }
      });
      // window.location.reload();
    } catch (err) {
      toast("Incorrect OTP",err);
      console.log("verify eroor", err);
    }
  };
  const handleOtpChange = (e) => {
    setOtp(e);
    console.log(otp);
  };
  //
  return (
    <div class="post-job-content">
      <ToastContainer />

      <h3 class="mb-0">
        Verify <span>OTP</span>
      </h3>
      <p>
        We have sent an OTP to your Phone Number. <br />{" "}
        <b>{props.dataToSend.phone}</b> <a href="javascript:;">Update Number</a>{" "}
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
                <button
                  class="btn post-main-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.reload();
                  }}
                >
                  Start Again
                </button>
              </a>
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
    </div>
  );
};

export default Verify;