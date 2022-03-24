import React, { Component } from "react";
import img from "../../components/assets/img/login-artwork.png" ;
import img1 from "../../components/assets/img/canvas-close.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {  

   
  }



  render() {
    // 
    return (
        <>
          <div class="canvas-wrp">
              <div class="offcanvas-header">
                 <img class="canvas-close" data-bs-dismiss="offcanvas" src={img1} className="img img-fluid"
                    alt="" />
              </div>
              <div class="offcanvas-body">
                 <div class="post-job-content">
                    <h3 class="mb-0">Verify  <span>OTP</span></h3>
                    <p>We have sent an OTP to your Phone Number. <br/> <b>+1 4864-864-864</b>   <a href="javascript:;">Update Number</a>                </p>
                    <div class="mt-5">
                       <div class="row">
                          <div class="col-lg-12">
                             <div class="otp-filling">
                                <input type="text" class="form-control"/>
                                <input type="text" class="form-control"/>
                                <input type="text" class="form-control"/>
                                <input type="text" class="form-control"/>
                                <input type="text" class="form-control"/>
                             </div>
                          </div>
                          <div class="col-lg-12">
                             <div class="otp-btn-ul">
                                <a href="#"><button class="btn post-main-btn" type="button">Resend OTP</button></a>
                                <a href="posted-jobs.html"><button class="btn post-main-btn" type="button">Verify</button></a>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="login-artwork">
                       <img src={img1} class="img img-fluid" alt="" /> 
                    </div>
                 </div>
              </div>
           </div>
        </>
    
    );
  }
}

export default Login;
