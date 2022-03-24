import React, { Component } from "react";
import img1 from "../../components/assets/img/call-icon.png" ;
import img from "../../components/assets/img/search-icon.png";
class Search extends Component {
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
        <section class="main-banner-wrap">
        <div class="main-wrp-content">
           <div class="container">
              <div class="row">
                 <div class="col-lg-5 m-auto">
                    <h1>Find & Hire Locals For your work</h1>
                    <p>Work with the best workers from your neighbourhood on our secure flexible and easy to use platform.
                    </p>
                 </div>
              </div>
              <div class="row">
                 <div class="col-lg-12">
                    <div class="main-search-wrp">
                       <form action="">
                          <div>
                             <input type="text" class="form-control" placeholder="Search by Zip Code, City or State" />
                             <button class="btn" type="button"><img src={img} alt=""/></button>
                          </div>
                       </form>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </section>
    
    );
  }
}

export default Search;
