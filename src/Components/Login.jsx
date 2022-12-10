import React from "react";
import "../Components/Login.css";
import Axios from "axios";

import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

import NavBar from "./Navbar";
import Footer from "./Footer";

import { useEffect } from "react";
import SearchTransaction from "./SearchTransaction";

function Login({ user }) {
  useEffect(() => {
    Axios.get("http://localhost:3002/api/getTransaction").then((data) => {});
  });

  //get user group
  const userGroup = user.signInUserSession.idToken.payload?.["cognito:groups"];

  //display different views to each user group
  if (userGroup?.includes("manager")) {
    return (
      <div>
        <NavBar />
        <div className="row">
          <div className="col-4">
            <h4 className="m-2">Welcome Manager!</h4>
            <br />
          </div>
        </div>

        <div className="form">
          <div className="row">
            <div>
              <Link to="/report">
                <button className="success">Report</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div>
              <Link to="/searchItem">
                <button className="success">Search Transactions</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  if (userGroup?.includes("admin")) {
    return (
      <div>
        <SearchTransaction />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <br />
      <h5>Welcome staff</h5>
      <br />
      <div className="form">
        <Link to="/addItem">
          <button className="success">Add New Transaction</button>
        </Link>
      </div>
      <Footer className="form" />
    </div>
  );
}
export default withAuthenticator(Login);
