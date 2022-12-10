import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

import { Heading, withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
//Use react-bootstrap-table for adding pagination
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

function Log({ user }) {
  const [logData, setLogData] = useState([]);

  //Get log data from the database
  useEffect(() => {
    const getData = async () => {
      await Axios.get("http://localhost:3002/api/getLogs").then((data) => {
        setLogData(data);
      });
    };

    getData().catch(console.error);
  }, []);

  //only admin can view logs
  return user.signInUserSession.idToken.payload?.["cognito:groups"]?.includes(
    "admin"
  ) ? (
    <>
      <NavBar />
      <br />

      <div>
        <br />

        <div className="container">
          <br />
          <div className="row">
            <h5>Activity Log</h5>
          </div>
          <br />

          <BootstrapTable data={logData.data} pagination>
            <TableHeaderColumn dataField="LogId" isKey>
              ID
            </TableHeaderColumn>

            <TableHeaderColumn dataField="DateTime">Date</TableHeaderColumn>
            <TableHeaderColumn dataField="Description">
              Description
            </TableHeaderColumn>
          </BootstrapTable>
        </div>

        <br />

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

export default withAuthenticator(Log);
