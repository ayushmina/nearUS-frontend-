import React, { useState, Component,useEffect } from "react";
import TopDashBoradheader from "../topdashboard";
import DashPost from "../dashPost";
import Abc from "../foter/";
import FormPost from "../formjobs";
import SlidingPane from "../slider";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase";
import {useNavigate} from 'react-router-dom'
const Dashborad = () => {
 
  const  [user,setUser]= useState("");
  const [post,setPost] = useState(false);
  const history=useNavigate(); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
  
    return () => {
      unsubscribe();
      if(user){
        history("/home");
      }
    };
  }, []);
  const off = () => {  
    setPost(false)
  }
  
  const showPost=()=>{
    setPost(true);
    console.log("hello setPost ")
  }
  
  return (
    <>
   <section class="main-banner-wrap logged-user">
    <TopDashBoradheader showPost={showPost} ></TopDashBoradheader>
    <SlidingPane
    direction="right"
    state={post}
    setState={off}
    >
      <FormPost/>
   </SlidingPane>
 </section>
 <DashPost></DashPost>
 <Abc></Abc>

</>
);
}

// class Dashborad extends Component {
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

export default Dashborad;
