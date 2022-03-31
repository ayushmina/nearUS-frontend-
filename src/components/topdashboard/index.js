import React, { useState, Component } from "react";
import img from "../../components/assets/img//NearUS-black.png";
import headerImg from "../../components/assets/img/blue-logo.png";

const TopDashBoradheader = (props) => {
  const showPost = () => {
    props.showPost();
  };

  return (
    <header>
      <nav class="navbar">
        <div class="container">
          <a href="/" class="navbar-brand">
            <img src={headerImg} class="img img-fluid" alt="" />
          </a>
          <div class="nav-buttons">
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasPostjob"
              class="btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                showPost();
              }}
            >
              Post a Job
            </button>
            <button class="btn logged-user-icon" type="button">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopDashBoradheader;