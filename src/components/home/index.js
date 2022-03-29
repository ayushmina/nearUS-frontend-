import React, { useState, Component,useEffect } from "react";
import Header from "../topheader";
import PostJob from "../postJobs";
import Search from "../search";
import Login from "../login";
import Abc from "../foter/";
import FormPost from "../formjobs";
import SlidingPane from "../slider";
import Varify from "../verifyOtp";
import {onAuthStateChanged} from "firebase/auth";
import video from "../assets/img/bg-video.mp4"
import { auth } from "../../firebase";
const Home = (props) => {
  console.log(props.user,"user inside home page")
  const [login, setLoginn] = useState(false);
  const [verify, setVerify] = useState(false);
  const [result,setResult] =useState({});
  const [post,setPost] = useState(false);
  const  [user,setUser]= useState("");
  const [dataToSend,setDataToSend]=useState({});
  const [phone,setPhone]=useState("");

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const setLogin = () => {
    console.log("yxzas")
    setLoginn(true);
  }
  const off = () => {
    // this.setState({login:false,verify:false})
    setLoginn(false);
    setVerify(false);
    setPost(false)
  }
 const setVerif = () => {
    // this.setState({verify:true});
    setVerify(true);
    console.log("hello setVerify ")
  }
  const backToLogin = () => {
    setLoginn(true);
    setVerify(false)
    console.log("hello setVerify ")
  }
  const showPost=()=>{
    setPost(true);
    console.log("hello setPost ")
  }
  const setResul=(data,dataToSend)=>{
    console.log(dataToSend,"data is here ")
    setPhone(dataToSend.phone);
    setDataToSend(dataToSend)
    setResult(data);
    setVerify(true)
  } 
 
  return (
    <>
    <section class="main-banner-wrap">
    <div class="banner-bg-video">
            <video autoPlay muted loop id="myVideo" preload="auto">
               <source src={video} type="video/mp4"/>
               Your browser does not support HTML5 video.
             </video>
         </div>
         <div class="overlay-above-content">
    <Header setLogin = {setLogin} showPost={showPost} user={user}></Header>  
    <Search/>
    </div>  
    <SlidingPane
    direction="right"
    state={login}
    // heading="Login as Employer"
    setState={off}
    >
     <Login
      setResult = {setResul}
      user={user}
     />
   </SlidingPane>
   <SlidingPane
    direction="right"
    state={post}
    setState={off}
    >
      <FormPost/>
   </SlidingPane>
   <SlidingPane
    direction="right"
    state={verify}
    setState={backToLogin}
    >
      <Varify backToLogin={backToLogin} result={result} dataToSend={dataToSend} />
   
   </SlidingPane>
   =
    
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
