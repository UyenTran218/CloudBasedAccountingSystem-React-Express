import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Auth } from "@aws-amplify/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "../Components/AddItem.css";
import axios from "axios";
import Dialog from "./Dialog";
import { useForm } from "react-hook-form";

function AddItem({ user }) {
  const [subOption, setSubOption] = useState([]);
  const [option, setOption] = useState("");

  const [note, setNote] = useState("");
  const [quater, setQuater] = useState("");
  const [entryDate, setEntryDate] = useState();
  const [amount, setAmount] = useState();
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState();
  //const [receipt, setReceipt] = useState([]);
  const [transID, setTransID] = useState();
  const [userName, setUser] = useState("");
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    item: "",
  });
  const handleDialog = (message, isLoading, item) => {
    setDialog({
      message,
      isLoading,
      item,
    });
  };
  useEffect(() => {
    Auth.currentUserInfo().then((response) =>
      setUser(response.attributes.email)
    );
  }, []);
  console.log(userName);

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (option === "Income") {
      const list = ["Main", "List"];
      setSubOption(list);
    } else if (option === "Expenses") {
      const list = [
        "Rent",
        "Electricity",
        "Gas",
        "Water",
        "Transport",
        "Advertising",
        "Supplies",
        "Wages",
        "Construction",
        "Telephone",
        "Other",
      ];
      setSubOption(list);
    } else if (option === "Cost of goods") {
      const list = ["Fingerlings", "Feed", "Probiotics", "Other"];
      setSubOption(list);
    } else if (option === "Assets") {
      const list = [
        "Land",
        "Building",
        "Equipment",
        "Transportation",
        "Accounts Receivable",
        "Cash",
        "Others",
      ];
      setSubOption(list);
    } else if (option === "Liabilities") {
      const list = ["Accounts Payable", "Others"];
      setSubOption(list);
    } else if (option === "Capital") {
      const list = ["Initial", "Injected"];
      setSubOption(list);
    }
    console.log();
  }, [option]);
  const formData = new FormData();
  const [receiptFile, setReceipt] = useState();
  let fileName = "";
  const onSubmit = (e) => {
    if (document.getElementById("receipt").files.length > 0) {
      //formData.append("file", e.file[0]);
      console.log(e.file);
      setReceipt(e.file[0]);
      fileName = e.file[0].name;
    }
    handleDialog(
      "Are you sure you want to update details as below?",
      true,
      <div style={{}}>
        <div className="row" style={{ backgroundColor: "#c0bebe" }}>
          <label style={{ color: "black", fontWeight: "bold" }}>
            Transaction #{transID}
          </label>
        </div>
        <br />
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>Name:</label>{" "}
          {document.querySelector("#Name").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>
            Category:
          </label>{" "}
          {document.querySelector("#CategoryID").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>
            Sub Category:
          </label>{" "}
          {document.querySelector("#Subcategory").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>
            Date of Entry:
          </label>{" "}
          {document.querySelector("#Date").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>Amount:</label>{" "}
          {document.querySelector("#Amount").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>Quarter:</label>{" "}
          {document.querySelector("#Quater").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>Note:</label>{" "}
          {document.querySelector("#Note").value}
        </p>
        <p>
          <label style={{ color: "black", fontWeight: "bold" }}>
            Receipt File:
          </label>{" "}
          {fileName}
        </p>
      </div>
    );
  };
  const areSureToEdit = async (choose) => {
    if (choose) {
      if (document.getElementById("receipt").files.length > 0) {
        formData.append("file", receiptFile);
      }

      formData.append("Name", name);
      formData.append("Amount", amount);
      formData.append("Note", note);
      formData.append("Date", entryDate);
      formData.append("Quater", quater);
      formData.append("TransactionID", transID);
      formData.append("CategoryID", option);
      formData.append("Subcategory", subCategory);
      formData.append("UserID", userName);

      const desc = `Transaction ${transID} added by ${user.signInUserSession.idToken.payload.email}`;

      try {
        axios(`http://localhost:3002/api/createTransaction`, {
          method: "POST",
          data: formData,
        });
        handleDialog("", false);
      } catch (error) {
        alert(error);
      }
      const payloadLog = await {
        Description: desc,
        id: userName,
      };
      try {
        axios(`http://localhost:3002/api/log/`, {
          method: "POST",
          data: payloadLog,
        });
      } catch (error) {
        alert(error);
      } finally {
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      }
    }
    handleDialog("", false);
  };

  return (
    <>
      <NavBar />
      <div className="container" style={{ width: "100%" }}>
        <br />
        <br />

        <h5>Please fill out the form below to add new transaction</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <br />
          <div>
            <div className="input-group mb-3 row">
              <div className="input-group-prepend col-1">
                <label htmlFor="CategoryID">Category</label>
              </div>
              <select
                style={{
                  minHeight: 30,
                  height: 37,
                  marginLeft: 4,
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderRadius: "0.375rem",
                }}
                className="custom-select col-4"
                id="CategoryID"
                name="CategoryID"
                onClick={(e) => setOption(e.target.value)}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
                <option value="Cost of goods">Cost of goods</option>
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Capital">Capital</option>
              </select>
              <div
                className="input-group-prepend col-2"
                style={{ textAlign: "left" }}
              >
                <label htmlFor="Subcategory"> Sub Category</label>
              </div>
              <select
                style={{
                  minHeight: 30,
                  height: 37,
                  marginLeft: 4,
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderRadius: "0.375rem",
                }}
                className="custom-select col-4"
                id="Subcategory"
                name="Subcategory"
                onClick={(e) => setSubCategory(e.target.value)}
              >
                {subOption.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-1" style={{ textAlign: "left" }}>
              <label style={{ fontSize: 14 }} htmlFor="TransactionID">
                ID
              </label>
            </div>
            <div className="col-4">
              <input
                style={{ fontSize: 14 }}
                type="text"
                className="form-control"
                id="TransactionID"
                name="TransactionID"
                placeholder="Please enter the Transaction ID"
                required
                onChange={(e) => setTransID(e.target.value)}
              />
            </div>

            <div style={{ textAlign: "left" }} className="col-2">
              <label htmlFor="Description"></label>
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row">
            <div className="col-1" style={{ textAlign: "left" }}>
              <label htmlFor="Name">Name</label>
            </div>
            <div className="col-4">
              <input
                style={{ fontSize: 14 }}
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                placeholder="Enter Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-2" style={{ textAlign: "left" }}>
              <label htmlFor="Date">Date of Transaction</label>
            </div>
            <div className="col-4">
              <input
                style={{ fontSize: 14 }}
                type="date"
                className="form-control"
                id="Date"
                name="Date"
                placeholder="Enter Date"
                required
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-1" style={{ textAlign: "left" }}>
              <label htmlFor="Amount">Amount</label>
            </div>
            <div className="col-4">
              <input
                style={{ fontSize: 14 }}
                type="number"
                min="1"
                className="form-control"
                id="Amount"
                name="Amount"
                placeholder="Enter Amount"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="col-2" style={{ textAlign: "left" }}>
              <label htmlFor="Quater">Quarter</label>
            </div>
            <div className="col-4">
              <select
                onChange={(e) => setQuater(e.target.value)}
                className="custom-select"
                id="Quater"
                name="Quater"
              >
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-1" style={{ textAlign: "left" }}>
              <label htmlFor="Note">Note</label>
            </div>
            <div className="col-4">
              <input
                style={{ fontSize: 14 }}
                type="text"
                className="form-control"
                id="Note"
                rows="4"
                name="Note"
                onChange={(e) => setNote(e.target.value)}
              ></input>
            </div>

            <div className="col-2" style={{ textAlign: "left" }}>
              <label htmlFor="receipt">Upload Receipt</label>
            </div>
            <div className="col-4" style={{ textAlign: "left" }}>
              <input
                name="receipt"
                id="receipt"
                type="file"
                required
                {...register("file")}
              />
            </div>
          </div>
          <br />
          <br />

          <div className="row">
            <div className="col-1"></div>
            <div className="col-4"></div>
            <div className="col-2"></div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <button style={{ width: 70 }} type="submit">
                Submit
              </button>
            </div>
          </div>

          {dialog.isLoading && (
            <Dialog
              item={dialog.item}
              onDialog={areSureToEdit}
              message={dialog.message}
            />
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default withAuthenticator(AddItem);
