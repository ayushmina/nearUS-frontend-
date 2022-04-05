import React, { Component, useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import img1 from "../../components/assets/img/canvas-close.png";
import img from "../../components/assets/img/canvas-close.png";
import data from "../../usaState.json";
import city from "../../usaCitys.json";
import options from "../../options";
import postActions from "../../actions/postActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const EditFormPost = (props) => {
  const [name, setName] = useState(props.postData.contactName);
  const [email, setEmail] = useState(props.postData.emailAddress);
  const [businessName, setBusinessName] = useState(props.postData.businessName);
  const [salary, setSalary] = useState(props.postData.salary);
  const [information, setInformation] = useState(props.postData.comment);
  const [number, setNumber] = useState(props.postData.phoneNumber);
  const [selectedOption, setSelectedOption] = useState("");
  const [state, setStates] = useState(props.postData.state);
  const [stateOption, setStateOption] = useState([]);
  const [arrycity, setarr] = useState([]);
  const [cityName, setCityName] = useState(props.postData.city);
  const [experience, setExperience] = useState(props.postData.experience);
  const [jobType, setJobType] = useState(props.postData.jobType);
  const [pinCode, setPinCode] = useState(props.postData.zipcode);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedState,setSelectedState]=useState();
  const [industry,setIndustry]=useState(props.postData.industry);
  const [jobTitle,setJobTitle]=useState(props.postData.jobTitle);

  const temp = [
    {
      value: "llll",
      label: "llll",
    },
  ];
  const [perSaly, setPerSaly] = useState(props.postData.salaryPer==="Annum"? 3: props.postData.salaryPer==="Hour" ? 1 : 2);
  useEffect(() => {
    setStateOption(optionMaker(data.data));
    setSelectedState({
        value: state,
        label: state,
    });
    getCityArry();

  }, []);
  useEffect(() => {
    if (state != "") {
      getCityArry();
    }
  }, [state]);
  useEffect(() => {
  }, [cityName]);
  const getCityArry = () => {
    if (city[state] == null) {
      setarr([]);
      return;
    }
    let data = optionMaker(city[state]);
    setarr(data);
  };
  const handleChange = (newValue, actionMeta) => {
    setStates(newValue.label);
    setIsDisabled(false);
  };
  const handleChange1 = (newValue, actionMeta) => {
    setCityName(newValue.label);
  };
  const handleChange2 = (newValue, actionMeta) => {
    setExperience(newValue.label);
  };
  const handleChange3 = (newValue, actionMeta) => {
    setJobType(newValue.label);
  };

  const optionMaker = (arr) => {
    let data = [];
    arr.map((e) => {
      data.push({
        value: e,
        label: e,
      });
    });
    return data;
  };

  const sendform = () => {
    props.setLoading(true);
    let temp = "";
    if (perSaly == 1) {
      temp = "Hour";
    } else if (perSaly == 2) {
      temp = "Month";
    } else if (perSaly == 3) {
      temp = "Mile";
    }
    if (
      !name &&
      !email &&
      !businessName &&
      !salary &&
      !jobType &&
      !pinCode &&
      !cityName &&
      !experience &&
      !information &&
      !number &&
      !state
    ) {
      props.setLoading(false);
      return false;
    }
    let dataToSend = {
      industry:industry,
      contactName: name,
      emailAddress: email,
      businessName: businessName,
      salary: salary,
      comment: information,
      phoneNumber: number,
      experience: experience,
      jobType: jobType,
      salaryPer: temp,
      state: state,
      city: cityName,
      zipcode: pinCode,
    //   id:props.postData.id,
    };

    postActions.editPost(dataToSend,props.postData.id, (err, res) => {
      if (err) {
        //  showw error
        console.log(err, "here is erro form send");
      } else {
        props.setLoading(false);
        props.setPost(false);
        props.fetchPost();
        props.toastCall();
      }
    });
  };

  return (
    <div class="post-job-content">
            <ToastContainer />
      <h3>
        Edit <span>Job</span>
      </h3>
      <div class="mb-3">
      {/* <h4>Title</h4> */}

      <div class="row">
        <div class="col-lg-12">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
                required
              />
              {/* <span style={{"color":"red"}}>*</span> */}
            </div>
          </div>
          </div>
      </div>
      <div class="mb-3">
        <h4>Personal Details</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Contact Name"
                value={name}
                onChange={(e) => {
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
                value={number}
                placeholder="Phone Number"
                maxlength="10"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
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
                value={email}
                onChange={(e) => {
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
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              {stateOption.length > 0 ? (
                <Select
                  placeholder="State"
                  isClearable
                  onChange={handleChange}
                  classNamePrefix="my-className-prefix"
                  defaultValue={{label:state,value:state}}
                  options={stateOption}
                />
              ) : (
                <Select
                  placeholder="State"
                  isClearable
                  onChange={handleChange}
                  defaultValue={{label:state,value:state}}
                  classNamePrefix="my-className-prefix"
                  options={temp}
                />
              )}
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              {arrycity.length > 0 ? (
                <CreatableSelect
                  placeholder="City..."
                  isClearable
                  isDisabled={isDisabled}
                  classNamePrefix="my-className-prefix"
                  defaultValue={{label:cityName,value:cityName}}
                  onChange={handleChange1}
                  options={arrycity}
                />
              ) : (
                <CreatableSelect
                  placeholder="City..."
                  classNamePrefix="my-className-prefix"
                  isClearable
                  isDisabled={isDisabled}
                  onChange={handleChange1}
                  defaultValue={{label:cityName,value:cityName}}
                  options={[]}
                />
              )}
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Zip Code"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                maxlength="5"
                value={pinCode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>Additional Info</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
      
                 <select class="form-select" value={experience}  onChange={(e)=>{
                                 setExperience(e.target.value)
                                    }} >
                                    <option selected={true} disabled={true}>Experience</option>
                                    {options.experience.map((e)=>{
                                     return <option value={e.value}>{e.label}</option>
                                    })}
                                 </select>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              {/* <CreatableSelect
                placeholder="Job type"
                classNamePrefix="my-className-prefix"
                isClearable
                onChange={handleChange3}
                options={options.jobType}
                defaultValue={{label:jobType,value:jobType}}
              /> */}

                        <select class="form-select" value={jobType}  onChange={(e)=>{
                                 setJobType(e.target.value)
                                    }} >
                                    <option selected={true} disabled={true}>Job type</option>
                                    {options.jobType.map((e)=>{
                                     return <option value={e.value}>{e.label}</option>
                                    })}
                                 </select>

            </div>
          </div>
          <div class="col-lg-12">
            
            <div class="">
                                 <select class="form-select" value={industry}  onChange={(e)=>{
                                 setIndustry(e.target.value)
                                    }} >
                                    <option selected={true} disabled={true}>Industry</option>
                                    {options.industry.map((e)=>{
                                     return <option value={e.value}>{e.label}</option>
                                    })}
                                 </select>
        
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                value={salary}
                placeholder="Salary"
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
            </div>
          </div>
     
          <div class="col-lg-6">
            <div class="per-ul">
              <button
                type="button"
                name="per Hour"
                class={`btn ${perSaly === 1 ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPerSaly(1);
                }}
              >
                Per Hour
              </button>
              <button
                type="button"
                name="Per Month"
                class={`btn ${perSaly === 2 ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPerSaly(2);
                }}
              >
                Per Month
              </button>
              <button
                type="button"
                name="per Annum"
                class={`btn ${perSaly === 3 ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPerSaly(3);
                }}
              >
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
                placeholder="Additional Information"
                value={information}
                onChange={(e) => {
                  setInformation(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <button
              class="btn post-main-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                sendform();
              }}
            >
              Edit Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFormPost;

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
