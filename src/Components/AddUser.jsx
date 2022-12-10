import {
  Button,
  Flex,
  Heading,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { API } from "aws-amplify";
import NavBar from "./Navbar";
import Footer from "./Footer";

function AddUser({ user }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const username = e.target.username.value;
    const email = e.target.email.value;
    const role = e.target.role.value;

    try {
      await API.post("", "/api/createUser", {
        body: {
          username,
          email,
          role,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsButtonDisabled(false);
    }
  };

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
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Last Log in</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>kuyen218@gmail.com</td>
                <td>Accountant</td>
                <td>12:05:23 06/10/2022</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>ttk.uyen218@gmail.com</td>
                <td>Manager</td>
                <td>12:05:23 06/10/2022</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />

        <Footer />
      </div>
    </>
  ) : (
    <Heading level={3}>Contact your admin for permission</Heading>
  );
}

export default withAuthenticator(AddUser, { hideSignUp: true });