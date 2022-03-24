import React, { useState, Component } from "react";
import Header from "../topheader";
import PostJob from "../postJobs";
import Search from "../search";
import Login from "../login";
import Abc from "../foter/";
import FormPost from "../formjobs";
import SlidingPane from "../slider";

const Home = () => {

  const [login, setLoginn] = useState(false);
  const [verify, setVerify] = useState(false);


  const setLogin = () => {
    console.log("yxzas")
    setLoginn(true);
  }
  const off = () => {
    // this.setState({login:false,verify:false})
    setLoginn(false);
    setVerify(false);
  }
 const setVerif = () => {
    // this.setState({verify:true});
    setVerify(true);
  }
  const backToLogin = () => {
    setLoginn(true);

  }
 
  return (
    <>
    <section class="main-banner-wrap">
    <Header setLogin = {setLogin}></Header>
    <Login ></Login>
    <FormPost></FormPost>

    {/* <SlidingPane
    direction="right"
    width={700}
    state={login}
    heading="Login as Employer"
    setState={off}
    
    >
      <Login
    setVerify = {setVerif}
   />
   </SlidingPane> */}
    
    <Search/>
    
 </section>
 <section class="search-result-wrp">

 <PostJob></PostJob> 
 </section>
 <Abc></Abc>

</>
);
}

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       login:false,
//       verify:false,
//       PostJob:false,

//     };
//   }
//   setLogin(){
//     console.log("yxzas")
//     this.setState({login:true})
//   }
//   off(){
//     this.setState({login:false,verify:false})
//   }
//   setVerify(){
//     this.setState({verify:true});
//   }
//   backToLogin(){
//     this.setState({login:true,verify:false});
//     }
//   componentDidMount() {  

   
//   }

//   render() {
//     // 
//     return (
//         <>
//         <section class="main-banner-wrap">
//         <Header setLogin = {this.setLogin}></Header>
//         <FormPost></FormPost>
//         <SlidingPane
//         direction="right"
//         Element={
//           <Login
//           setVerify = {this.setVerify}
//           ></Login>
//         }
//         width={400}
//         state={this.state.login}
//         heading="Filters"
//         setState={this.off}
        
//         ></SlidingPane>
//         <Login setVerify={this.setVerify}></Login>
//         <Search/>
        
//      </section>
//      <section class="search-result-wrp">
//      <PostJob></PostJob>
     
     
//      </section>
//      <Abc></Abc>
    
//     </>
//     );
//   }
// }

export default Home;
