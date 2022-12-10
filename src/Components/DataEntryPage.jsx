import React from "react";
import NavBar from "./Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PdfDocument } from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function DataEntryPage(props) {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [show, setHide] = useState(false);
  const [image, setImage] = useState([]);
  console.log(id);

  //   function download(){
  //     axios({
  //         url:'http://localhost:3002/api/getTransaction/'+id,
  //         method:'GET',
  //         responseType: 'blob'
  // })
  // .then((response) => {
  //        const url = window.URL
  //        .createObjectURL(new Blob([response.data]));
  //               const link = document.createElement('a');
  //               console.log(response.data);
  //               link.href = url;
  //               link.setAttribute('download', 'image.jpg');
  //               document.body.appendChild(link);
  //               link.click();
  // })
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/getTransaction/${id}`, {})
      .then(function (response) {
        setHide(true);
        setData(response.data[0]);
      });
  }, [id]);

  return (
    <>
      <NavBar />

      <div className="container">
        <br />
        <br />

        <h5>Transaction Details</h5>
        <br />
        <br />
        <div className="row">
          <div className="col-5">
            <label for="TransactionID">Transaction ID</label>
          </div>
          <div className="col-5">
            <label id="TransactionID">{data.TransactionID}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="Category">Category</label>
          </div>
          <div className="col-5">
            <label id="Category">{data.Category}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="SubCategory">Sub Category</label>
          </div>
          <div className="col-5">
            <label id="SubCategory">{data.SubCategory}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="RecCreation">Date When Record Was Created:</label>
          </div>
          <div className="col-5">
            <label id="RecCreation">{data.DateEntered}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="TranDate">Transaction Date</label>
          </div>
          <div className="col-5">
            <label id="TranDate">{data.DateOfEntry}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="Amount">Amount</label>
          </div>
          <div className="col-5">
            <label id="Amount">{data.Amount}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="Note">Note</label>
          </div>
          <div className="col-5">
            <label id="Note">{data.Note}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <label for="Quater">Quater</label>
          </div>
          <div className="col-5">
            <label id="Quater">{data.Quater}</label>
          </div>
        </div>
        {/* <div className="row">
        <div className="col-6">
          <button onClick={download}>Download Receipt</button>
        </div>
      </div> */}
        <br />
        <br />

        {show && (
          <PDFDownloadLink
            document={<PdfDocument pdfData={data} />}
            fileName="Transaction.pdf"
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "#f2f2f2",
              border: "1px solid #4a4a4a",
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Pdf"
            }
          </PDFDownloadLink>
        )}
      </div>
    </>
  );
}

export default DataEntryPage;
