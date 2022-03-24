import React, { Component } from "react";
import img1 from "../../components/assets/img/canvas-close.png" ;
import img from "../../components/assets/img/canvas-close.png"

class FormPost extends Component {
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
       <div class="offcanvas offcanvas-end common-offcanvas" tabindex="-1" id="offcanvasPostjob"
            aria-labelledby="offcanvasPostjobLabel">
            <div class="canvas-wrp">
               <div class="offcanvas-header">
                  <img class="canvas-close" data-bs-dismiss="offcanvas" src={img} className="img img-fluid"
                     alt="" />
               </div>
               <div class="offcanvas-body">
                  <div class="post-job-content">
                     <h3>Post a <span>Job</span></h3>
                     <div class="mb-3">
                        <h4>Personal Details</h4>
                        <div class="row">
                           <div class="col-lg-6">
                              <div class="">
                                 <input type="text" class="form-control" placeholder="Contact Name" />
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <input type="text" class="form-control" placeholder="Phone Number" />
                              </div>
                           </div>
                           <div class="col-lg-12">
                              <div class="">
                                 <input type="email" class="form-control" placeholder="Email Address" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="mb-3">
                        <h4>Business Details</h4>
                        <div class="row">
                           <div class="col-lg-6">
                              <div class="">
                                 <input type="text" class="form-control" placeholder="Business Name" />
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <select class="form-select">
                                    <option selected>State</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <select class="form-select">
                                    <option selected>City</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <input type="text" class="form-control" placeholder="Zip Code" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="mb-3">
                        <h4>Additional Info</h4>
                        <div class="row">
                           <div class="col-lg-6">
                              <div class="">
                                 <select class="form-select">
                                    <option selected>Experience</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <select class="form-select">
                                    <option selected>Job Trype</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="">
                                 <input type="text" class="form-control" placeholder="Salary" />
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="per-ul">
                                 <button type="button" class="btn active">Per Hour</button>
                                 <button type="button" class="btn">Per Month</button>
                                 <button type="button" class="btn">Per Mile</button>
                              </div>
                           </div>
                           <div class="col-lg-12">
                              <div>
                                 <textarea class="form-control" name="" id="" cols="30" rows="4" placeholder="Additional Information"></textarea>
                              </div>
                           </div>
                           <div class="col-lg-12">
                              <button class="btn post-main-btn" type="button">Post Job</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    </>
    );
  }
}

export default FormPost;
