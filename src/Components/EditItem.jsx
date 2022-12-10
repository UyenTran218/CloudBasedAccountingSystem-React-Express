import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "../Components/AddItem.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";

function EditItem({ user }) {
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [note, setNote] = useState("");
  const [quater, setQuater] = useState("");
  const [entryDate, setEntryDate] = useState();
  const [amount, setAmount] = useState();
  const [name, setName] = useState("");

  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  const options = [
    "Income",
    "Expenses",
    "Cost of goods",
    "Liabilities",
    "Capital",
  ];

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
    axios
      .get(`http://localhost:3002/api/getTransaction/${id}`)
      .then(function (response) {
        setData(response.data[0]);
        //setName(data.Name);
      });

    // axios
    //   .get(`http://localhost:3002/api/getReceipt/${id}`)
    //   .then(function (response) {
    //     setReceipt(response);
    //   });

    if (categories === "Income") {
      const list = ["Main", "Other"];
      setSubCategories(list);
    } else if (categories === "Expenses") {
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
      setSubCategories(list);
    } else if (categories === "Cost of goods") {
      const list = ["Fingerlings", "Feed", "Probiotics", "Other"];
      setSubCategories(list);
    } else if (categories === "Assets") {
      const list = [
        "Land",
        "Building",
        "Equipment",
        "Transportation",
        "Accounts Receivable",
        "Cash",
        "Others",
      ];
      setSubCategories(list);
    } else if (categories === "Liabilities") {
      const list = ["Accounts Payable", "Others"];
      setSubCategories(list);
    } else if (categories === "Capital") {
      const list = ["Initial", "Injected"];
      setSubCategories(list);
    }
  }, [categories, id]);

  const navigate = useNavigate();
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
            Transaction #{id}
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

      formData.append("Name", document.querySelector("#Name").value);
      formData.append("Amount", document.querySelector("#Amount").value);
      formData.append("Note", document.querySelector("#Note").value);
      formData.append("Date", document.querySelector("#Date").value);
      formData.append("Quater", document.querySelector("#Quater").value);

      formData.append(
        "CategoryID",
        document.querySelector("#CategoryID").value
      );
      formData.append(
        "Subcategory",
        document.querySelector("#Subcategory").value
      );
      formData.append("UserID", 5);
      formData.append("ReceiptId", id);
      try {
        axios(`http://localhost:3002/api/updateTransaction/${id}`, {
          method: "POST",
          data: formData,
        });
        handleDialog("", false);
      } catch (error) {
        alert(error);
      }
      const payloadLog = {
        Description: `Transaction ${id} updated by ${user.signInUserSession.idToken.payload.email}`,
        id: 5,
      };
      try {
        axios(`http://localhost:3002/api/log/`, {
          method: "POST",
          data: payloadLog,
        });
      } catch (error) {
        alert(error);
      }

      await navigate("/searchItem");
    }
    handleDialog("", false);
  };

  function getItemDate() {
    const date = new Date(data.DateOfEntry);
    const myDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return myDate;
  }

  return (
    <>
      <NavBar />

      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <br />
          <br />

          <h5>Please fill out the form below to update transaction details</h5>
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
                onChange={(e) => setCategories(e.target.value)}
              >
                <option>{data.Category}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
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
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>{data.SubCategory}</option>
                {subCategories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <br />

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
                  defaultValue={data.Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-2" style={{ textAlign: "left" }}>
                <label htmlFor="Date">Date of Transaction</label>
              </div>
              <div className="col-4">
                <input
                  style={{ fontSize: 14 }}
                  type="text"
                  className="form-control"
                  id="Date"
                  name="Date"
                  defaultValue={data.DateOfEntry}
                  onFocus={(e) => (e.target.type = "date")}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-1" style={{ textAlign: "left" }}>
                <label htmlFor="Amount">Amount($)</label>
              </div>
              <div className="col-4">
                <input
                  style={{ fontSize: 14 }}
                  type="number"
                  min="1"
                  className="form-control"
                  id="Amount"
                  name="Amount"
                  defaultValue={data.Amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="col-2" style={{ textAlign: "left" }}>
                <label htmlFor="Quater">Quarter</label>
              </div>
              <div className="col-4">
                <select
                  style={{
                    minHeight: 30,
                    height: 35,
                    paddingTop: 0,
                    paddingBottom: 0,
                    borderRadius: "0.375rem",
                  }}
                  className="custom-select"
                  id="Quater"
                  name="Quater"
                  onChange={(e) => setQuater(e.target.value)}
                >
                  <option>{data.Quater}</option>
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
                  name="Note"
                  defaultValue={data.Note}
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
                  {...register("file")}
                />
                {/* <img src={`data:image/png;base64,${receipt}`} alt="Text Alt" /> */}
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

export default withAuthenticator(EditItem);