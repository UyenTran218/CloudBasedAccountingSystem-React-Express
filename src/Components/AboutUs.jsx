import React, { Component } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

function AboutUs() {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="Container">
        <div className="row">
          <div className="text-center">
            <div className="Heading">
              <h4>If you face any issues</h4>
            </div>
          </div>
          <div className="text-center">
            <p>Contact: admin@birkentech.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AboutUs;
