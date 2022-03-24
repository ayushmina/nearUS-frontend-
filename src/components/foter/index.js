import React, { Component } from "react";
import img1 from "../../components/assets/img/call-icon.png" ;
import img from "../../components/assets/img/mail-icon.png";

class Abc extends Component {
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
    <footer class="footer-wrp">
         <div class="container">
            <div class="row">
               <div class="col-lg-6">
                  <div class="footer-logo">
                     <img src="./img/white-logo.png" class="img img-fluid" alt=""/>
                  </div>
               </div>
               <div class="col-lg-3">
                  <div>
                     <h3>Company</h3>
                     <ul>
                        <li><a href="javascript:;">Terms of Use</a></li>
                        <li><a href="javascript:;">About Us</a></li>
                     </ul>
                  </div>
               </div>
               <div class="col-lg-3">
                  <div>
                     <h3>Contact us at</h3>
                     <ul>
                        <li><a href="javascript:;"><img src={img1} alt=""/>+1 6454-646-315</a></li>
                        <li><a href="javascript:;"><img src={img} alt=""/>info@nearus.com</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      <section class="footer-copyrights">
         <div class="container">
            <div class="row">
               <div class="col-lg-12">
                  <p>Copyright © 2022 all rights reserved NearUs</p>
               </div>
            </div>
         </div>
      </section>
    </>
    );
  }
}

export default Abc;
