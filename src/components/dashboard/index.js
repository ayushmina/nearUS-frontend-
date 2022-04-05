import React, { useState, Component, useEffect } from "react";
import TopDashBoradheader from "../topdashboard";
import Abc from "../foter/";
import EditFormPost from "../editformjobs";
import SlidingPane from "../slider";
import { useNavigate } from "react-router-dom";
import postActions from "../../actions/postActions";
import img from "../../components/assets/img/search-icon.png";
import Accordion from "react-bootstrap/Accordion";
import img1 from "../../components/assets/img/location-icon.png";
import img2 from "../../components/assets/img/watch-icon.png";
import img3 from "../../components/assets/img/gcap-icon.png";
import img4 from "../../components/assets/img/edit-icon.png";
import img5 from "../../components/assets/img/delete-icon.png";
import purple from "../../components/assets/img/icon-result-purple.png";
import blue from "../../components/assets/img/icon-result-blue.png";
import pink from "../../components/assets/img/icon-result-pink.png";
import green from "../../components/assets/img/icon-result-green.png";
import orange from "../../components/assets/img/icon-result-orange.png";

import img7 from "../../components/assets/img/dollar-icon.png";
import img8 from "../../components/assets/img/repost-icon.png";
import Agent from "../../actions/superAgent";
import noJObs from "../../components/assets/img/no-job-artwork.png";
import FormPost from "../formjobs";
import Loader from "../loader";

import Banks from "../../components/assets/industry/bank.png";
import building from "../../components/assets/industry/building.png";
import Hotel from "../../components/assets/industry/hotel.png";
import Restaurants from "../../components/assets/industry/restaurant.png";
import GasStationLiqourstore from "../../components/assets/industry/gas-station.png";
import Gaming from "../../components/assets/industry/Gaming.png";
import Retail from "../../components/assets/industry/Retail.png";
import HealthcareServices from "../../components/assets/industry/Healthcare.png";
import RealEstate from "../../components/assets/industry/Real Estate.png";
import MediaTelecom from "../../components/assets/industry/MediaandTelecom.png";
import Construction from "../../components/assets/industry/construction.png";
import Insurance from "../../components/assets/industry/health-insurance.png";
import Energy from "../../components/assets/industry/Energy.png";
import Warehouse from "../../components/assets/industry/warehouse.png";
import TransportationLogistics from "../../components/assets/industry/Transportation.png";
import Farminglandscaping from "../../components/assets/industry/Farrming.png";
import Other from "../../components/assets/industry/Other.png";

// ../../components/assets/img/no-job-artwork.png
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import convertRegion from "../../usaStatesAbbrevations";

const Dashborad = (props) => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [postList, setList] = useState([]);
  const [postData, setPostData] = useState({
    contactName: "",
    emailAddress: "",
    businessName: "",
    salary: "",
    comment: "",
    phoneNumber: "",
    experience: "",
    jobType: "",
    salaryPer: "",
    state: "",
    city: "",
    zipcode: "",
  });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  // Updating phase
  useEffect(() => {
    fetchPost();
  }, [searchText]);

  const history = useNavigate();
  useEffect(() => {
    let token = Agent.getToken();
    fetchPost();
    if (!token) {
      history("/");
    }
  }, []);
  useEffect(() => { }, []);

  const fetchPost = async () => {
    // props.setLoading(false)
    await postActions.myPost(searchText, (err, res) => {
      if (err) {
      } else {
        setList(res.data);
      }
    });
  };

  const off = () => {
    setEditPost(false);
    setPost(false);
  };
  const setLoading1 = (e) => {
    console.log(e);
    setLoading(e);
  }
  const editJob = (job) => {
    // console.log(industry,"here is indu")
    setPostData({
      contactName: job.contactName,
      emailAddress: job.emailAddress,
      businessName: job.businessName,
      salary: job.salary,
      comment: job.comment,
      phoneNumber: job.phoneNumber,
      experience: job.experience,
      jobType: job.jobType,
      salaryPer: job.salaryPer,
      state: job.state,
      city: job.city,
      zipcode: job.zipcode,
      id: job._id,
      industry:job.industry,
      jobTitle:job.jobTitle
    });
    setEditPost(true);
  };

  const toastCall = () => {
    toast.success("New job added");
  };
  const toastCallEdit = () => {
    toast.success("Job updated");
  };


  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const showPost = () => {
    setPost(true);
    console.log("hello setPost ");
  };

  const setSearchTextInput = (e) => {
    setSearchText(e.target.value);
    // fetchPost();
  };
  const deletePost = (job) => {
    postActions.deletePost(job._id, (err, res) => {
      if (err) {
        //  showw error
        console.log(err, "here is error in delete");
      } else {
        fetchPost();
        toast.error("Job removed");
      }
    });
  };
  const repost = (job) => {
    postActions.repost(job._id, (err, res) => {
      if (err) {
        //  showw error
        console.log(err, "here is erro in repost");
      } else {
        fetchPost();
        toast.success("Job reposted");
      }
    });
  };
  return (
    <>
      <ToastContainer />
      <section class="main-banner-wrap logged-user">
        <TopDashBoradheader showPost={showPost} setLoading={setLoading1}></TopDashBoradheader>
        <SlidingPane direction="right" state={editPost} setState={off}>
          <EditFormPost
            postState={editPost}
            setPost={setEditPost}
            fetchPost={fetchPost}
            toastCall={toastCallEdit}
            postData={postData}
            setLoading={setLoading1}
          />
        </SlidingPane>
        <SlidingPane direction="right" state={post} setState={off}>
          <FormPost
            postState={post}
            setPost={setPost}
            fetchPost={fetchPost}
            toastCall={toastCall}
            setLoading={setLoading1}
          />
        </SlidingPane>
      </section>
      <section class="search-result-wrp">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="common-head">
                <h2>
                  Your Posted <span>Jobs</span>
                </h2>
              </div>
            </div>
            {postList.length < 0 && searchText.length < 0 ? (
              ""
            ) : (
                <div class="col-lg-6">
                  <div class="search-wrp">
                    <input
                      type="text"
                      placeholder="Search your jobs by name"
                      class="form-control"
                      value={searchText}
                      onChange={setSearchTextInput}
                    />
                    <img src={img} class="img img-fluid" alt="" />
                  </div>
                </div>
              )}
          </div>
          <div class="search-accordian">
            <div class="accordion" id="accordionExample">
              <div class="row">
                {postList.length > 0 ? (
                  postList.map((job, index) => {
                    let stateAbbr = convertRegion.convertRegion(job.state, 2);
                    console.log("stateAbbr", stateAbbr);
                    let randomNum = Math.floor(Math.random() * (5 - 1 + 1) + 1);
                    let industry = job.industry == "Restaurants" ? Restaurants : job.industry == "Banks" ? Banks : job.industry == "Hotel" ? Hotel : job.industry == "GasStationLiqourstore" ? GasStationLiqourstore : job.industry == "Gaming" ? Gaming : job.industry ==  "Retail" ? Retail : job.industry == "HealthcareServices"? HealthcareServices:job.industry == "RealEstate"? RealEstate:job.industry == "MediaTelecom"?  MediaTelecom:job.industry == "Construction" ? Construction:job.industry=="Insurance"? Insurance:job.industry =="Energy"?Energy:job.industry == "Warehouse"? Warehouse:job.industry == "TransportationLogistics"? TransportationLogistics:job.industry =="Farminglandscaping"?Farminglandscaping:Other;
                    return (
                      <div class="col-lg-6">
                        <Accordion defaultActiveKey="1">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              eventKey="0"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <div class="search-acc-header">
                                <div class="search-acc-icon">
                                  <img src={industry} alt="" />
                                  {/* <img src={randomNum === 1  ?  pink : randomNum === 2 ? green : randomNum === 3 ? blue : randomNum === 4 ?  purple : orange } alt="" /> */}
                                </div>
                                <div class="search-acc-header-content">
                                  <h3>{job.jobTitle}</h3>
                                  <p>{job.businessName}  ({job.jobType})</p>
                                  <div>
                                    <ul>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img1} alt="" />
                                          <h6>
                                            {job.city}, {stateAbbr}
                                          </h6>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img7} alt="" />
                                          <h6>
                                            {kFormatter(job.salary)}{"/"}
                                            {job.salaryPer}
                                          </h6>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img2} alt="" />
                                          <h6>{job.jobType}</h6>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img3} alt="" />
                                          <h6>{job.experience} Years</h6>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="accordion-body">
                                <p>{job.comment}</p>
                              </div>
                              <div class="acc-contact-details">
                                <ul class="">
                                  <li class="border-0">
                                    <button
                                      class="btn"
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        editJob(job);
                                      }}
                                    >
                                      <img src={img4} alt="" />
                                      Edit
                                    </button>
                                  </li>
                                  <li class="border-0">
                                    <button
                                      class="btn"
                                      type="button"
                                      onClick={() => {
                                        deletePost(job);
                                      }}
                                    >
                                      <img src={img5} alt="" />
                                      Delete
                                    </button>
                                  </li>
                                  <li class="border-0">
                                    <button
                                      class="btn"
                                      type="button"
                                      onClick={() => {
                                        repost(job);
                                      }}
                                    >
                                      <img src={img8} alt="" />
                                      Repost
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    );
                  })
                ) : (
                    <>
                      {" "}
                      <section class="search-result-wrp">
                        <div class="container">
                          {/* <div class="common-head">
                        <h2>Your Posted <span>Jobs</span></h2>
                     </div> */}
                          <div class="no-post-wrp">
                            <img src={noJObs} class="img img-fluid" alt="" />
                            <h4>No Jobs Found</h4>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        {loading ? <Loader></Loader> : ""}
      </section>
      ;<Abc></Abc>
    </>
  );
};

export default Dashborad;
