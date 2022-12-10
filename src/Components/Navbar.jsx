import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

//function to signOut the current sign up user

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
function NavBar() {
  return (
    <React.Fragment>
      <Navbar bg="black" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home" color="White">
            Birkentech
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" color="White">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/addItem" color="White">
              Add Item
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutUs" color="White">
              Help
            </Nav.Link>
            <Nav.Link as={Link} to="/report" color="White">
              Report
            </Nav.Link>
            <Nav.Link as={Link} to="/manageUser" color="White">
              Logs
            </Nav.Link>
            <button
              style={{
                backgroundColor: "black",
                marginLeft: "100px",
                color: "white",
              }}
              onClick={signOut}
            >
              Sign Out
            </button>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}
export default NavBar;
