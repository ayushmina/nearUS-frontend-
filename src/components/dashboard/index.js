import React, { useState, Component,useEffect } from "react";
import TopDashBoradheader from "../topdashboard";
import DashPost from "../dashPost";
import Abc from "../foter/";
import FormPost from "../formjobs";
import SlidingPane from "../slider";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase";
import {useNavigate} from 'react-router-dom'
import postActions from "../../actions/postActions";
import { async } from "@firebase/util";
import Agent from "../../actions/superAgent";
const Dashborad = (props) => {
 
  const  [user,setUser]= useState(null);
  const [post,setPost] = useState(false);
  const [postList,setList]=useState([]); 
  const history=useNavigate(); 
  useEffect(() => {
    let token =Agent.getToken();
    fetchPost();
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
  
      unsubscribe();
      console.log(props)
      if(!token){
        console.log("yeh ky ho rhs hai ")
        history("/");
  }
  }, []);
  useEffect(() => {
    

  },[]);

  const fetchPost= async()=>{
     await postActions.myPost((err,res)=>{
      if(err){

      }else{
        setList(res.data);

      }
    })
  }
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
 {postList.length> 0 ? postList.map((e)=>{
   <DashPost data={e} ></DashPost>
 }):"hello"}
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
