import React, { useState, Component, useEffect } from "react";
import Header from "../topheader";
import Login from "../login";
import Abc from "../foter/";
import FormPost from "../formjobs";
import SlidingPane from "../slider";
import Varify from "../verifyOtp";
import postActions from "../../actions/postActions";
import { onAuthStateChanged } from "firebase/auth";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import video from "../assets/img/bg-video.mp4";
import { auth } from "../../firebase";
// import Accordion from "react-bootstrap/Accordion";
import callIcon from "../../components/assets/img/call-icon.png";
import searchIcon from "../../components/assets/img/search-icon.png";
import img from "../../components/assets/img/icon-result-purple.png";
import img1 from "../../components/assets/img/location-icon.png";
import img2 from "../../components/assets/img/watch-icon.png";
import img3 from "../../components/assets/img/gcap-icon.png";
import img4 from "../../components/assets/img/mail-icon.png";
import img5 from "../../components/assets/img/dollar-icon.png";
import img6 from "../../components/assets/img/icon-result-purple.png";
import img7 from "../../components/assets/img/call-icon.png";

const Home = (props) => {
  const [login, setLoginn] = useState(false);
  const [verify, setVerify] = useState(false);
  const [result, setResult] = useState({});
  const [post, setPost] = useState(false);
  const [user, setUser] = useState("");
  const [dataToSend, setDataToSend] = useState({});
  const [phone, setPhone] = useState("");
  const [list, setList] = useState([]);
  const [text, searchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [hoverStateEmail, setHoverStateEmail] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalStateOtp, setModalStateOtp] = useState(false);




  const [openedId, setOpenedId] = useState(0);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      // unsubscribe();
    };
  }, []);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const searchResult = async () => {
    setLoading(true);
    await postActions.Search(text, (err, res) => {
      if (err) {
      } else {
        setList(res.data);
        scrollToTop();
        setLoading(false);
      }
    });
  };

  const setLogin = () => {
    setLoginn(true);
  };
  const off = () => {
    setLoginn(false);
    setVerify(false);
    setPost(false);
  };
  const setVerif = () => {
    setVerify(true);
    console.log("hello setVerify ");
  };
  const backToLogin = () => {
    setLoginn(true);
    setVerify(false);
    console.log("hello setVerify ");
  };
  const showPost = () => {
    setPost(true);
    console.log("hello setPost ");
  };
  const setResul = (data, dataToSend) => {
    console.log(dataToSend, "data is here ");
    setPhone(dataToSend.phone);
    setDataToSend(dataToSend);
    setResult(data);
    setVerify(true);
  };

  return (
    <>
      <section class="main-banner-wrap">
        <div class="banner-bg-video">
          <video autoPlay muted loop id="myVideo" preload="auto">
            <source src={video} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div class="overlay-above-content">
          <Header setLogin={setLogin} showPost={showPost} user={user}></Header>
          <section class="main-banner-wrap">
            <div class="main-wrp-content">
              <div class="container">
                <div class="row">
                  <div class="col-lg-5 m-auto">
                    <h1>Find & Hire Locals For your work</h1>
                    <p>
                      Work with the best workers from your neighbourhood on our
                      secure flexible and easy to use platform.
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="main-search-wrp">
                      {/* <form action=""> */}
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search by Zip Code, City or State"
                          onChange={(e) => {
                            searchText(e.target.value);
                          }}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              searchResult();
                            }
                          }}
                        />
                        <button
                          class="btn"
                          type="button"
                          onClick={searchResult}
                          disabled={text.length > 0 ? false : true}
                        >
                          {!loading ? <img src={searchIcon} alt="" /> : ""}
                        </button>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <SlidingPane direction="right" state={login} setState={off}>
          <Login setResult={setResul} user={user} />
        </SlidingPane>
        <SlidingPane direction="right" state={post} setState={off}>
          <FormPost />
        </SlidingPane>
        <SlidingPane direction="right" state={verify} setState={backToLogin}>
          <Varify
            backToLogin={backToLogin}
            result={result}
            dataToSend={dataToSend}
          />
        </SlidingPane>
      </section>
      {list && list.length > 0 ? (
        <>
          <section class="search-result-wrp homepage">
            <>
              <section class="">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="common-head">
                        <h2>
                          Search <span>Results</span> for "{text}"
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div class="search-accordian">
                    <div class="accordion" id="accordionExample">
                      <div class="row">
                        <Accordion >
                          {list.map((job, index) => {
                            return (
                              <>  <div className="col-lg-6">
                                   <AccordionItem key={job._id}>
                                <AccordionItemHeading>
                                  <AccordionItemButton>
                                    <div class="search-acc-header">
                                      <div class="search-acc-icon">
                                        <img src={img6} alt="" />
                                      </div>
                                      <div class="search-acc-header-content">
                                        <h3>{job.jobType}</h3>
                                        <p>{job.businessName}</p>
                                        <div>
                                          <ul>
                                            <li>
                                              <div className="search-acc-header-text">
                                                <img src={img1} alt="" />
                                                <h6>
                                                  {job.city}, {job.state}
                                                </h6>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="search-acc-header-text">
                                                <img src={img5} alt="" />
                                                <h6>
                                                  {kFormatter(job.salary)}/
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
                                  </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                  <div class="accordion-body">
                                    <p>{job.comment}</p>
                                  </div>
                                  <div class="acc-contact-details">
                                    <ul>
                                      <li onMouseOver={() => setHoverState(true)} onMouseOut={() => setHoverState(false)}>
                                        {!hoverState ? (
                                          <a href="javascript:;">
                                            <img src={img7} alt="" />
                                              +1 xxxx-xxx-xxx
                                          </a>
                                        ) : (
                                            <button
                                              className="btn"
                                              type="button"
                                              onClick={() => setModalState(true)}
                                            >
                                              Click to reveal info
                                            </button>
                                          )}
                                      </li>
                                      <li onMouseOver={() => setHoverStateEmail(true)} onMouseOut={() => setHoverStateEmail(false)}>
                                        {!hoverStateEmail ? (<a href="javascript:;">
                                          <img src={img4} alt="" />
                                            xxxxxx@mail.com
                                        </a>) : (<button className="btn" type="button" onClick={() => setModalState(true)}>
                                          Click to reveal info
                                        </button>)}
                                      </li>
                                    </ul>
                                  </div>
                                </AccordionItemPanel>
                              </AccordionItem>
                             </div>
                                {/* <div class="col-lg-6">
                              <Accordion accordionId={index} open={openedId} handleClick={()=>setOpenedId(index)}>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header
                                    eventKey="0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <div class="search-acc-header">
                                      <div class="search-acc-icon">
                                        <img src={img6} alt="" />
                                      </div>
                                      <div class="search-acc-header-content">
                                        <h3>{job.jobType}</h3>
                                        <p>{job.businessName}</p>
                                        <div>
                                          <ul>
                                            <li>
                                              <div className="search-acc-header-text">
                                                <img src={img1} alt="" />
                                                <h6>
                                                  {job.city}, {job.state}
                                                </h6>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="search-acc-header-text">
                                                <img src={img5} alt="" />
                                                <h6>
                                                  {kFormatter(job.salary)}/
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
                                      <ul>
                                        <li onMouseOver={()=>setHoverState(true)} onMouseOut={()=>setHoverState(false)}>
                                          {!hoverState ? (
                                            <a href="javascript:;">
                                              <img src={img7} alt="" />
                                              +1 xxxx-xxx-xxx
                                            </a>
                                          ) : (
                                            <button
                                              className="btn"
                                              type="button"
                                            >
                                              Click to reveal info
                                            </button>
                                          )}
                                        </li>
                                        <li>
                                          <a href="javascript:;">
                                            <img src={img4} alt="" />
                                            xxxxxx@mail.com
                                          </a>
                                          <button className="btn" type="button">
                                            Click to reveal info
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>*/}
                              </>
                            );
                          })}
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </section>
          <Abc></Abc>
        </>
      ) : (
          ""
        )}
      <Modal
        isOpen={modalState}
        className="p-0 product-modal-nb otp-wrp modal-lg modal-dialog-centered"
      >
        <ModalBody>
          <div class="">
            <p class="h4 title">Enter your <br />Phone Number</p>
            <small class="text-muted">We need your phone number for your verification!</small>
            <div class="mt-3">
              <input type="text" class="form-control" id="phone-number" placeholder="Phone Number" />
            </div>
            <div class="mt-3 send-buttons">
              <button type="button" class="btn btn-primary w-100" onClick={() => {  setModalStateOtp(true); setModalState(false) }}>Send OTP</button>
              <button type="button" class="btn btn-outline-primary w-100 mt-3" onClick={() => setModalState(false)}>Cancel</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalStateOtp}
        className="p-0 product-modal-nb modal-lg modal-dialog-centered"
      >
        <ModalBody>
          {/* <div class="modal-body"> */}
            <p class="h4 title">Verify OTP</p>
            <small class="text-muted">We have sent an OTP to your Phone Number.
            </small><br />
            <small>+1 4864-864-864</small>
            {/* <a href="" class="">update Number</a> */}
            <div class="mt-3">
              <div class="otp-filling">
                <input type="text" class="form-control" style={{ marginLeft: "0 !important" }} />
                <input type="text" class="form-control" />
                <input type="text" class="form-control" />
                <input type="text" class="form-control" />
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="row  send-buttons">
              {/* <div class="col-lg-6 mt-4"><button type="button" class="btn btn-light border border-info text-info ">Resend OTP</button></div> */}
              <div class="col-lg-6 mt-4"><button type="button" class="btn btn-primary ">Verify</button></div>
              <div class="col-lg-6 mt-4"><button type="button" class="btn btn-primary" onClick={() => setModalStateOtp(false)}>Cancel</button></div>
            </div>
          {/* </div> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
