import axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";
import "../Components/SearchTransaction.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchTransaction() {
  //const [data, setData] = useState([]);

  const [transList, setTransList] = useState([]);

  const [q, setQ] = useState("");

  const [searchParam] = useState([
    "SubCategory",
    "Category",
    "Quater",
    "TransactionID",
  ]);
  const [filterParam, setFilterParam] = useState("All");

  useEffect(() => {
    axios({
      url: `http://localhost:3002/api/getTransaction`,
      method: "GET",
      dataResponse: "json",
      params: {
        per_page: 5,
      },
    }).then(
      (response) => {
        //console.log(response.data);
        setTransList(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const searchData = Object.values(transList);

  function search(items) {
    return items.filter((item) => {
      if (item.Category === filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam === "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search by keywords"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <div className="select">
            <select
              onClick={(e) => {
                setFilterParam(e.target.value);
              }}
              className="custom-select"
            >
              <option value="All">Filter By Category</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
              <option value="Cost of goods">Cost of goods</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
              <option value="Capital">Capital</option>
            </select>
          </div>
        </div>

        <div>
          <table className="table table-hover" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th scope="col">Transaction ID</th>
                <th scope="col">Category</th>
                <th scope="col">Sub-category</th>
                <th scope="col">Amount</th>
                <th scope="col">Quarter</th>
                <th scope="col">Entry Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {search(searchData).map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.TransactionID}</th>
                    <td>{item.Category}</td>
                    <td>{item.SubCategory}</td>
                    <td>{item.Amount}</td>
                    <td>{item.Quater}</td>
                    <td>{item.DateOfEntry}</td>
                    <td>
                      <Link to={`/EditItem/${item.TransactionID}`}>Edit</Link>
                    </td>
                    <td>
                      <Link to={`/DataEntryPage/${item.TransactionID}`}>
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchTransaction;
