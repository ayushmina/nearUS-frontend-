import React, { Component, useState,useEffect } from "react"
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import img1 from "../../components/assets/img/canvas-close.png"
import img from "../../components/assets/img/canvas-close.png"
import data from "../../usaState.json";
import city from "../../usaCitys.json";
import Creatable from "react-select/async-creatable"
const FormPost = () => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [businessName,setBusinessName]=useState("");
const [salary,setSalary]=useState("");
const [information,setInformation]=useState("");
const [number,setNumber]=useState("");
const [selectedOption, setSelectedOption] = useState("");
const [state, setStates] = useState("Mississippi");
const [stateOption, setStateOption] = useState([]);
const [arrycity,setarr]=useState([]);

useEffect(()=>{
  setStateOption(optionMaker(data.data));
},[])
const handleChange = (newValue, actionMeta) => {
  console.group('Value Changed');
  console.log(newValue);
  console.log(`action: ${actionMeta.action}`);
  console.groupEnd();
};
const handleInputChange = (inputValue, actionMeta) => {
  console.group('Input Changed');
  console.log(inputValue);
  console.log(`action: ${actionMeta.action}`);
  console.groupEnd();
};
const optionMaker=(arr)=>{
  let data=[];
  console.log(arr)
  arr.map((e)=>{
    data.push({
      value:e,
      lebel:e
    })
  })
  console.log(data,"arr");
  return data;
}

const sendform=()=>{
   let dataToSend={
      name,email,businessName,salary,information,number
   }
   console.log(dataToSend);
}

const changeHandler=(e)=>{
   console.log("e:",e.target.value)
   setStates(e.target.value);
}

const newdata=data.data;
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
              <select class="form-select" onChange={e=>changeHandler(e)} >

                <option selected >State</option>
                {newdata.map((o,index) => (
               <option key={o} value={o}>{o}</option>
               ))}
              </select>
            </div>
          </div>
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
            { stateOption.length > 0 ? 
            <CreatableSelect
            isClearable
           onChange={handleChange}
           onInputChange={handleInputChange}
           options={stateOption}
           
      />:""
            }
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
              <button type="button" class="btn active">
                Per Hour
              </button>
              <button type="button" class="btn">
                Per Month
              </button>
              <button type="button" class="btn">
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
