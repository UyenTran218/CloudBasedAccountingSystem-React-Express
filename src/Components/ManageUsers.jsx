import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Heading, withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";

function ManageUsers({ user }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((data) => {
      setUserList(data);
    });
  });

  return user.signInUserSession.idToken.payload?.["cognito:groups"]?.includes(
    "admin"
  ) ? (
    <>
      <NavBar />
      <div>
        <br />

        <div className="row">
          <span>User Accounts</span>
        </div>
        <br />
        <div className="tota">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>

            <tbody>
              {userList.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.UserID}</th>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <div className="row">
          <Link to="/log">
            <button style={{ backgroundColor: "success" }}>
              View Activity Log
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <NavBar />
      <Heading level={3}>Contact your admin for permission</Heading>
    </>
  );
}

export default withAuthenticator(ManageUsers);