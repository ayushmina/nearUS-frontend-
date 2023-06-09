import React, { useState, Component, useEffect } from "react"
import Header from "../topheader"
import Login from "../login"
import Abc from "../foter/"
import FormPost from "../formjobs"
import OtpInput from "react-otp-input"
import SlidingPane from "../slider"
import Varify from "../verifyOtp"
import postActions from "../../actions/postActions"
import PhoneInput from "react-phone-input-2"
import Loader from "../loader"
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"

import Cookies from "universal-cookie"
import "react-accessible-accordion/dist/fancy-example.css"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "../../firebase"
import { ToastContainer, toast } from "react-toastify"
import Geocode from "react-geocode"
import searchIcon from "../../components/assets/img/search-icon.png"
import img1 from "../../components/assets/img/location-icon.png"
import img2 from "../../components/assets/img/watch-icon.png"
import img3 from "../../components/assets/img/gcap-icon.png"
import img4 from "../../components/assets/img/mail-icon.png"
import img5 from "../../components/assets/img/dollar-icon.png"
import img6 from "../../components/assets/img/Group 306.png"
import img7 from "../../components/assets/img/call-icon.png"
import img8 from "../../components/assets/img/Iconmaterial-date-range.png"

import Agent from "../../actions/superAgent"
import convertRegion from "../../usaStatesAbbrevations"
import options from "../../options"

import Banks from "../../components/assets/industry/bank.png"
import building from "../../components/assets/industry/building.png"
import Hotel from "../../components/assets/industry/hotel.png"
import Restaurants from "../../components/assets/industry/restaurant.png"
import GasStationLiqourstore from "../../components/assets/industry/gas-station.png"
import Gaming from "../../components/assets/industry/Gaming.png"
import Retail from "../../components/assets/industry/Retail.png"
import HealthcareServices from "../../components/assets/industry/Healthcare.png"
import RealEstate from "../../components/assets/industry/Real Estate.png"
import MediaTelecom from "../../components/assets/industry/MediaandTelecom.png"
import Construction from "../../components/assets/industry/construction.png"
import Insurance from "../../components/assets/industry/health-insurance.png"
import Energy from "../../components/assets/industry/Energy.png"
import Warehouse from "../../components/assets/industry/warehouse.png"
import TransportationLogistics from "../../components/assets/industry/Transportation.png"
import Farminglandscaping from "../../components/assets/industry/Farrming.png"
import Other from "../../components/assets/industry/Other.png"
import moment from "moment"
import UpdatedCitiesJson from "../../usaCities"

Geocode.setApiKey("AIzaSyDvU4wxDQqhEtFcrKWCYfDHNIRiZYGZ6kg")

const Home = (props) => {
  const [login, setLoginn] = useState(false)
  const [verify, setVerify] = useState(false)
  const [initialRender, setInitialRender] = useState(true)
  const [result, setResult] = useState({})
  const [post, setPost] = useState(false)
  const [user, setUser] = useState("")
  const [dataToSend, setDataToSend] = useState({})
  const [phone, setPhone] = useState("")
  const [phone1, setPhone1] = useState("")
  const [list, setList] = useState([])
  const [text, searchText] = useState("")
  const [loading, setLoading] = useState(false)
  const [hoverState, setHoverState] = useState(false)
  const [hoverStateEmail, setHoverStateEmail] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [modalStateOtp, setModalStateOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [guest, setGuest] = useState("")
  const [searchTextFromServer, setSearchTextFromServer] = useState("")
  const [openedId, setOpenedId] = useState(0)
  const [stateCitySuggestions, setStateCitySuggestions] = useState([])
  const [flag, setFlag] = useState(false)
  const [newCityOption, setnewCityOption] = useState([])
  const [newStateOption, setnewStateOption] = useState([])

  let cookie = new Cookies()
  let recaptchaWrapperRef
  const makejson = () => {
    const tempArry = []
    const stateName = []
    const cityarry = []
    let tempState = []

    UpdatedCitiesJson.forEach((element) => {
      if (!tempArry.includes(element.city)) {
        tempArry.push(element.city)
        cityarry.push({ city: element.city, state: element.state })
      }
      if (!tempState.includes(element.state)) {
        tempState.push(element.state)
        stateName.push(element.state)
      }
    })

    tempArry.sort()
    // console.log(cityName,'nh')
    setnewCityOption(cityarry)
    setnewStateOption(stateName)
  }
  useEffect(() => {
    window.scrollTo({
      top: -100000,
      behavior: "smooth",
    })

    makejson()
    // const root = document.getElementsByTagName("body")[0];
    // root.classList.add("overflow-hide");
  }, [])
  useEffect(() => {
    locationFunction()
    let token = Agent.getToken()
    let tokenGuest = Agent.getTokenGuest()

    setUser(token)
    setGuest(tokenGuest)
  }, [openedId])
  const handleOtpChange = (e) => {
    setOtp(e)
  }
  const SendOtpInModal = async (e) => {
    e.preventDefault()
    if (phone1.length < 10) {
      toast("Phone Number Invalid")
      return false
    }
    //  isloading true
    setLoading(true)
    //  console.log(phone1,'phone is here ')

    const number = "+" + phone1
    if (recaptchaWrapperRef) {
      recaptchaWrapperRef.innerHTML = `<div id="recaptcha-container"></div>`
    }
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    )
    let result = {}
    signInWithPhoneNumber(auth, number, recaptchaVerifier)
      .then((confirmationResult) => {
        confirmationResult = confirmationResult
        result = confirmationResult
        toast("OTP sent")
        setResult(result)
        setLoading(false)
        setModalStateOtp(true)
        setModalState(false)
      })
      .catch((error) => {
        setLoading(false)
        toast("Phone Number Invalid")
        document.getElementById("hellllll").innerHTML =
          "<div id='recaptcha'></div>"
        recaptchaVerifier.clear()
        console.log(error, "here is eroor")
      })
  }
  const startAgain = () => {
    setLoginn(false)
    setVerify(false)
    // window.location.reload();
  }
  const OnVerify = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (otp === "" || otp === null) return
    try {
      let data = await result.confirm(otp)
      cookie.set("x-access-token-gt", data._tokenResponse.idToken)
      toast("correct OTP")

      setGuest(data._tokenResponse.idToken)
      setLoading(false)
      setModalStateOtp(false)
      setModalState(false)
      setOtp("")
      searchResult(text)
    } catch (err) {
      toast("Incorrect OTP", err)
      setLoading(false)
    }
  }
  const locationFunction = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            let city, state
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name
                    break
                  //   state = response.results[0].address_components[i].long_name;
                  //   break;
                }
              }
            }
            searchText(city)
            setLoading(false)
            // searchResult(city);
          },
          (error) => {
            console.error(error)
          }
        )
      },
      (error) => {
        console.log("error in get location", error)
      }
    )
  }

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    })
  }

  const searchResult = async (search) => {
    setInitialRender(false)
    if (search) {
      setLoading(true)
      await postActions.Search(search, (err, res) => {
        if (err) {
          console.log("error:", err)
        } else {
          const root = document.getElementsByTagName("body")[0]

          root.classList.remove("overflow-hide")
          setList(res.data)

          setStateCitySuggestions([])
          setLoading(false)
          setSearchTextFromServer(res.text)
          setFlag(true)
          setInitialRender(false)
          scrollToTop()
        }
      })
    }
  }

  const setLogin = () => {
    setLoginn(true)
  }
  const off = () => {
    setLoginn(false)
    setVerify(false)
    setPost(false)
  }
  const setVerif = () => {
    setVerify(true)
  }
  const showPost = () => {
    setPost(true)
  }
  const setResul = (data, dataToSend) => {
    setPhone(dataToSend.phone)
    setDataToSend(dataToSend)
    setResult(data)
    setVerify(true)
  }
  const setLoading1 = (e) => {
    setLoading(e)
  }
  const searchSuggestions = (text) => {
    if (text.length > 0 && newCityOption.length > 0) {
      let suggestions = []

      newCityOption.map((stateValue) => {
        if (stateValue.city.toLowerCase().includes(text.toLowerCase())) {
          suggestions.push({
            label: stateValue.city + "," + stateValue.state,
            value: stateValue.city,
          })
        }
      })

      newStateOption.map((stateValue) => {
        if (stateValue.toLowerCase().includes(text.toLowerCase()))
          suggestions.push({ label: stateValue + ", USA", value: stateValue })
      })
      //   for (const property in options.city) {
      //    options.city[property].map((stateValue)=>{
      //       if(stateValue.toLowerCase().includes(text.toLowerCase())) suggestions.push({label:stateValue,value:property})
      //     })
      //  }

      setStateCitySuggestions(suggestions)
    } else {
      setStateCitySuggestions([])
    }
  }

  // console.log("newCityOption:",newCityOption);

  return (
    <>
      <section class="main-banner-wrap">
        {loading ? <Loader></Loader> : ""}
        <ToastContainer></ToastContainer>
        <div class="banner-bg-video">
          {/* <video autoPlay muted loop id="myVideo" preload="auto">
            <source src={video} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video> */}
          {/* <img src={MaskGroup5} ></img> */}
        </div>
        <div class="overlay-above-content">
          <Header setLogin={setLogin} showPost={showPost} user={user}></Header>
          <section class="main-banner-wrap">
            <div class="main-wrp-content">
              <div class="container">
                <div class="row">
                  <div class="col-lg-5 m-auto">
                    <h1>Find your local job now</h1>
                    <p>
                      Work with the best workers from your neighbourhood on our
                      secure flexible and easy to use platform.
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div
                      class={
                        stateCitySuggestions.length > 0
                          ? "main-search-wrp main-search-drp-open"
                          : "main-search-wrp"
                      }
                    >
                      {/* <form action=""> */}
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Search by Zip Code, City or State"
                          value={text}
                          onChange={(e) => {
                            e.preventDefault()
                            searchText(e.target.value)
                            searchSuggestions(e.target.value)
                          }}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              searchResult(event.target.value)
                            }
                          }}
                        />

                        <button
                          class="btn"
                          type="button"
                          onClick={() => searchResult(text)}
                          disabled={text.length > 0 ? false : true}
                        >
                          <img src={searchIcon} alt="" />
                        </button>
                      </div>
                      <div
                        class={
                          stateCitySuggestions.length > 0
                            ? "search-nav-drp"
                            : "search-nav-drp d-none"
                        }
                      >
                        <ul>
                          {stateCitySuggestions.map((citi) => {
                            return (
                              <li
                                onClick={() => {
                                  searchText(citi.value)
                                  //  searchResult(citi.label)
                                  setStateCitySuggestions([])
                                }}
                              >
                                {citi.label}
                              </li>
                            )
                          })}
                        </ul>
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
          <Login setResult={setResul} user={user} setLoading={setLoading1} />
        </SlidingPane>
        <SlidingPane direction="right" state={post} setState={off}>
          <FormPost setLoading={setLoading1} />
        </SlidingPane>
        <SlidingPane direction="right" state={verify} setState={startAgain}>
          <Varify
            result={result}
            setLoading={setLoading1}
            dataToSend={dataToSend}
          />
        </SlidingPane>
      </section>
      {!initialRender ? (
        <>
          {" "}
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
                              Search <span>Results</span> for "
                              {searchTextFromServer}"
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="search-accordian">
                        <div class="accordion" id="accordionExample">
                          <div class="row">
                            <Accordion>
                              {list.map((job, index) => {
                                let stateAbbr = convertRegion.convertRegion(
                                  job.state,
                                  2
                                )
                                var eventdate = moment(job.created_at)
                                var todaysdate = moment()
                                let daysgoes = todaysdate.diff(
                                  eventdate,
                                  "days"
                                )
                                if (daysgoes > 30) daysgoes = "30+"
                                let industry =
                                  job.industry == "Restaurants"
                                    ? Restaurants
                                    : job.industry == "Banks"
                                    ? Banks
                                    : job.industry == "Hotel"
                                    ? Hotel
                                    : job.industry == "GasStationLiqourstore"
                                    ? GasStationLiqourstore
                                    : job.industry == "Gaming"
                                    ? Gaming
                                    : job.industry == "Retail"
                                    ? Retail
                                    : job.industry == "HealthcareServices"
                                    ? HealthcareServices
                                    : job.industry == "RealEstate"
                                    ? RealEstate
                                    : job.industry == "MediaTelecom"
                                    ? MediaTelecom
                                    : job.industry == "Construction"
                                    ? Construction
                                    : job.industry == "Insurance"
                                    ? Insurance
                                    : job.industry == "Energy"
                                    ? Energy
                                    : job.industry == "Warehouse"
                                    ? Warehouse
                                    : job.industry == "TransportationLogistics"
                                    ? TransportationLogistics
                                    : job.industry == "Farminglandscaping"
                                    ? Farminglandscaping
                                    : Other
                                return (
                                  <>
                                    {" "}
                                    <div className="col-lg-6">
                                      <AccordionItem key={job._id}>
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            <div class="search-acc-header">
                                              <div class="search-acc-icon">
                                                <img src={industry} alt="" />
                                                {/* <img src={randomNum === 1  ?  pink : randomNum === 2 ? green : randomNum === 3 ? blue : randomNum === 4 ?  purple : orange } alt="" /> */}
                                              </div>
                                              <div class="search-acc-header-content">
                                                <h3>{job.jobTitle}</h3>
                                                <p>{job.businessName}</p>
                                                <div>
                                                  <ul>
                                                    <li>
                                                      <div className="search-acc-header-text">
                                                        <img
                                                          src={img1}
                                                          alt=""
                                                        />
                                                        <h6>
                                                          {job.city},{" "}
                                                          {stateAbbr}
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="search-acc-header-text">
                                                        <img
                                                          src={img5}
                                                          alt=""
                                                        />
                                                        <h6>
                                                          {kFormatter(
                                                            job.salary
                                                          )}
                                                          /{job.salaryPer}
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="search-acc-header-text">
                                                        <img
                                                          src={img2}
                                                          alt=""
                                                        />
                                                        <h6>{job.jobType}</h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="search-acc-header-text">
                                                        <img
                                                          src={img3}
                                                          alt=""
                                                        />
                                                        <h6>
                                                          {job.experience} Years
                                                        </h6>
                                                      </div>
                                                    </li>
                                                    <li>
                                                      <div className="search-acc-header-text">
                                                        <img
                                                          src={img8}
                                                          alt=""
                                                        />
                                                        <h6>
                                                          {daysgoes} Days ago
                                                        </h6>
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
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: job.comment,
                                              }}
                                            ></p>
                                          </div>
                                          <div class="acc-contact-details">
                                            <ul>
                                              <li
                                                onMouseOver={() =>
                                                  !guest
                                                    ? setHoverState(true)
                                                    : ""
                                                }
                                                onMouseOut={() =>
                                                  setHoverState(false)
                                                }
                                              >
                                                {!hoverState ? (
                                                  <a
                                                    href={`tel:${job.phoneNumber}`}
                                                  >
                                                    <img src={img7} alt="" />
                                                    {guest
                                                      ? job.phoneNumber
                                                      : "+1 xxxx-xxx-xxx"}
                                                  </a>
                                                ) : (
                                                  <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() =>
                                                      setModalState(true)
                                                    }
                                                  >
                                                    Click to reveal info
                                                  </button>
                                                )}
                                              </li>
                                              <li
                                                onMouseOver={() =>
                                                  !guest
                                                    ? setHoverStateEmail(true)
                                                    : ""
                                                }
                                                onMouseOut={() =>
                                                  setHoverStateEmail(false)
                                                }
                                              >
                                                {!hoverStateEmail ? (
                                                  <a
                                                    href={`mailto:${job.emailAddress}`}
                                                  >
                                                    <img src={img4} alt="" />
                                                    {guest
                                                      ? job.emailAddress
                                                      : "xxxxxx@mail.com"}
                                                  </a>
                                                ) : (
                                                  <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() =>
                                                      setModalState(true)
                                                    }
                                                  >
                                                    Click to reveal info
                                                  </button>
                                                )}
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
                                )
                              })}
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </section>
            </>
          ) : (
            <>
              <section class="search-result-wrp homepage">
                <>
                  <section class="">
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="common-head">
                            <h2>
                              Search <span>Results</span> for "
                              {searchTextFromServer}"
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div class="search-accordian">
                        <div class="container">
                          <div class="no-post-wrp">
                            <img src={img6} class="img img-fluid" alt="" />
                            <h4>
                              Err! Currently no jobs found in this area, Please
                              try after sometime.
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </section>
            </>
          )}
          <Abc></Abc>{" "}
        </>
      ) : null}

      <Modal
        isOpen={modalState}
        className="p-0 product-modal-nb otp-wrp modal-lg modal-dialog-centered"
      >
        <ModalBody>
          <div class="">
            <p class="h4 title">
              Enter your <br />
              Phone Number
            </p>
            <small class="text-muted">
              We need your phone number for your verification!
            </small>
            <div class="mt-3">
              {/* <input type="text" class="form-control" id="phone-number" placeholder="Phone Number"  onChange={(e) => {
                      setPhone1(e.target.value);}}
                      maxlength="10"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    /> */}
              <PhoneInput
                country="us"
                class="form-control changephone"
                value={phone1}
                onChange={(phoneNumber) => setPhone1(phoneNumber)}
                style={{ display: "flex", flex: 1 }}
                alwaysDefaultMask={false}
              />
            </div>
            <div class="mt-3 send-buttons">
              <button
                type="button"
                class="btn btn-primary w-100"
                onClick={(e) => {
                  SendOtpInModal(e)
                }}
              >
                Send OTP
              </button>
              <button
                type="button"
                class="btn btn-light border border-info text-info w-100 mt-3"
                onClick={() => setModalState(false)}
              >
                Cancel
              </button>
            </div>
            <div id="hellllll" ref={(ref) => (recaptchaWrapperRef = ref)}>
              <div id="recaptcha-container"></div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalStateOtp}
        className="p-0 product-modal-nb modal-lg modal-dialog-centered"
      >
        <ModalBody className="p-5">
          {/* <div class="modal-body"> */}
          <p class="h4 title">Verify OTP</p>
          <small class="text-muted">
            We have sent an OTP to your Phone Number.
          </small>
          <br />
          <small>+{phone1}</small>
          {/* <a href="" class="">update Number</a> */}
          <div class="mt-3">
            <div class="otp-filling">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                separator={<span> </span>}
              />
            </div>
          </div>
          <div class="row  send-buttons">
            {/* <div class="col-lg-6 mt-4"><button type="button" class="btn btn-light border border-info text-info ">Resend OTP</button></div> */}
            <div class="col-lg-6 mt-4">
              <button
                type="button"
                class="btn btn-primary w-100"
                onClick={(e) => {
                  OnVerify(e)
                }}
              >
                Verify
              </button>
            </div>
            <div class="col-lg-6 mt-4">
              <button
                type="button"
                class="btn btn-primary w-100"
                onClick={() => setModalStateOtp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>
    </>
  )
}

export default Home
