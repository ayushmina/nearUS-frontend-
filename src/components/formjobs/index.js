import React, { Component, useState,useEffect } from "react"
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import img1 from "../../components/assets/img/canvas-close.png"
import img from "../../components/assets/img/canvas-close.png"
import data from "../../usaState.json";
import city from "../../usaCitys.json";
import options from "../../options";
import postActions from "../../actions/postActions"
import Select from 'react-select';
const FormPost = () => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [businessName,setBusinessName]=useState("");
const [salary,setSalary]=useState("");
const [information,setInformation]=useState("");
const [number,setNumber]=useState("");
const [selectedOption, setSelectedOption] = useState("");
const [state, setStates] = useState("");
const [stateOption, setStateOption] = useState([]);
const [arrycity,setarr]=useState([]);
const [cityName,setCityName]=useState("");
const [experience,setExperience]=useState("");
const [job_type,setJobType]=useState("");
const [pinCode,setPinCode]=useState("");
const [isDisabled,setIsDisabled]=useState(true);
const temp=[
  {
    value:"ayuhs",
    label:"hello"
  }
]
const [perSaly,setPerSaly]=useState(1);
useEffect(()=>{
  setStateOption(optionMaker(data.data));
},[])
useEffect(()=>{
  console.log(state,"inside useeffect");
  if(state!=""){
  getCityArry();
  }
},[state])
useEffect(()=>{
  console.log(cityName,"inside cityName useeffect");



},[cityName])
const getCityArry=()=>{


    console.log(state,"herejhvscvhs");
    if(city[state]==null){
      setarr([]);
      return
    }
    let data=optionMaker(city[state]);
    setarr(data);
}
const handleChange = (newValue, actionMeta) => {
  console.log(newValue,"Value Changed");

  setStates(newValue.label);
  setIsDisabled(false);
};
const handleChange1 = (newValue, actionMeta) => {
  console.log(newValue,"Value Changed");
  setCityName(newValue.label);
};
const handleChange2 = (newValue, actionMeta) => {
  console.log(newValue,"Value Changed");
  setExperience(newValue.label);
};
const handleChange3 = (newValue, actionMeta) => {
  console.log(newValue,"Value Changed");
  setJobType(newValue.label);
};

const optionMaker=(arr)=>{
  let data=[];
  console.log(arr)
  arr.map((e)=>{
    data.push({
      value:e,
      label:e
    })
  })
  console.log(data,"arr");
  return data;
}

const sendform=()=>{
  let temp="";
  if(perSaly==1){
    temp="Per Hour"
  }else if(perSaly==2){
    temp="Per Month"
  }else if( perSaly==3){
    temp="Per Mile"
  }
  if(!name&&!email&&!businessName&&!salary&&!job_type&&!pinCode&&!cityName&&!experience&&!information&&!number&&!state){
  
    return false;
  }
   let dataToSend={
    contactName:name,
    emailAddress:email,
    businessName:businessName,
    salary:salary,
    comment:information,
    phoneNumber:number,
    experience:experience,
    jobType:job_type,
    salaryPer:temp,
    state:state,
    city:cityName,
    zipcode:pinCode
    
   }

   postActions.addPost(dataToSend,(err,res)=>{
     if(err){
      //  showw error 
      console.log(err,'here is erro form send');
     }else{
       console.log(res,"ok job post almost done   ")
     }
   })
   console.log(dataToSend);
}

// const changeHandler=(e)=>{
//    console.log("e:",e.target.value)
//    setStates(e.target.value);
// }

  return (
    <div class="post-job-content">
      <h3>
        Post a <span>Job</span>
      </h3>
      <div class="mb-3">
        <h4>Personal Details</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Contact Name"
                onChange={e=>{
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Phone Number"
                maxlength="10"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                  }
                }}
                
                onChange={e=>{
                  setNumber(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="">
              <input
                type="email"
                class="form-control"
                placeholder="Email Address"
                onChange={e=>{
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>Business Details</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Business Name"
                onChange={e=>{
                  setBusinessName(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
            { stateOption.length > 0 ? 
            <Select
            placeholder="State..."
            isClearable
           onChange={handleChange}
           options={stateOption} 
           />: <Select
           placeholder="State..."
           isClearable
          onChange={handleChange}
          options={temp}
          />
            }
           
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
            { arrycity.length > 0 ? 
            <CreatableSelect
            placeholder="City..."
            isClearable
            isDisabled={isDisabled}
           onChange={handleChange1}
           options={arrycity} 
           />: <CreatableSelect
           placeholder="City..."
           isClearable
           isDisabled={isDisabled}
          onChange={handleChange1}
          options={[]}
          />
            }
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input type="text" class="form-control" placeholder="Zip Code"
              
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
              }}
              maxlength="5"
              onChange={e=>{
                  setPinCode(e.target.value);
                }} />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>Additional Info</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
            <CreatableSelect
            placeholder="experinece..."
            isClearable
            onChange={handleChange2}
            options={options.experience} 
            />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
            <CreatableSelect
            placeholder="job type..."
            isClearable
           onChange={handleChange3}
           options={options.job_type} 
           />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input type="text" class="form-control" placeholder="Salary"  onChange={e=>{
                  setSalary(e.target.value);
                }} />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="per-ul">
              <button type="button"  name="per Hour" class={`btn ${perSaly===1?"active":""}`} onClick={(e)=>{
                e.preventDefault();
                setPerSaly(1)
              }}>
                Per Hour
              </button>
              <button type="button"  name="Per Month" class={`btn ${perSaly===2?"active":""}`} onClick={(e)=>{
                e.preventDefault();
                setPerSaly(2)
              }}>
                Per Month
              </button>
              <button type="button" name="per mile" class={`btn ${perSaly===3?"active":""}`} onClick={(e)=>{
                e.preventDefault();
                console.log(e);
                setPerSaly(3)
              }}>
                Per Mile
              </button>
            </div>
          </div>
          <div class="col-lg-12">
            <div>
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Additional Information"  onChange={e=>{
                  setInformation(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <button class="btn post-main-btn" type="button" onClick={e=>{
               e.preventDefault()
               sendform();
            }}>
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPost

{
  /* const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
      <select
        value={selectedOption}
        onChange={e => setSelectedOption(e.target.value)}>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select> */
}
