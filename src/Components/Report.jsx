import React from "react";
import { useState, useEffect } from "react";
import "../Components/Report.css";
import Axios from "axios";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { CSVLink } from "react-csv";
import { Chart } from "react-google-charts";
import { PdfDocument1 } from "./PDF2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Heading, withAuthenticator } from "@aws-amplify/ui-react";

function calculateProfit(Income, Expenses) {
  let inc = Income[0]?.Income;
  let exp = Expenses[0]?.ExpenseTotal;
  let profit1 = ((inc - exp) / (inc + exp)) * 100;
  return profit1.toFixed(2);
}

function subCatCal1(subCat1) {
  let Main = 0;
  let List = 0;
  let List1 = [];
  // eslint-disable-next-line array-callback-return
  subCat1?.map((item) => {
    if (item.SubCategory === "Main") {
      Main = Main + item.Amount;
    } else if (item.SubCategory === "List") {
      List = List + item.Amount;
    }
  });
  List1.push(Main);
  List1.push(List);
  return List1;
}
function subCatCalLiabilities(subCat1) {
  let AccountsPayable = 0;
  let Others = 0;
  let List1 = [];
  // eslint-disable-next-line array-callback-return
  subCat1?.map((item) => {
    if (item.SubCategory === "Accounts Payable") {
      AccountsPayable = AccountsPayable + item.Amount;
    } else if (item.SubCategory === "Others") {
      Others = Others + item.Amount;
    }
  });
  let Total = AccountsPayable + Others;
  List1.push(AccountsPayable);
  List1.push(Others);
  List1.push(Total);
  return List1;
}

function subCatCalAssests(subCat) {
  let Land = 0;
  let Building = 0;
  let Equipment = 0;
  let Transportation = 0;
  let AccountsReceivable = 0;
  let Cash = 0;
  let Others = 0;
  let list = [];
  // eslint-disable-next-line array-callback-return
  subCat?.map((item) => {
    if (item.SubCategory === "Land") {
      Land = Land + item.Amount;
    } else if (item.SubCategory === "Building") {
      Building = Building + item.Amount;
    } else if (item.SubCategory === "Equipment") {
      Equipment = Equipment + item.Amount;
    } else if (item.SubCategory === "Transportation") {
      Transportation = Transportation + item.Amount;
    } else if (item.SubCategory === "Accounts Receivable") {
      AccountsReceivable = AccountsReceivable + item.Amount;
    } else if (item.SubCategory === "Cash") {
      Cash = Cash + item.Amount;
    } else if (item.SubCategory === "Others") {
      Others = Others + item.Amount;
    }
  });
  let Total =
    Land +
    Building +
    Equipment +
    Transportation +
    AccountsReceivable +
    Cash +
    Others;
  list.push(Land);
  list.push(Building);
  list.push(Equipment);
  list.push(Transportation);
  list.push(AccountsReceivable);
  list.push(Cash);
  list.push(Others);
  list.push(Total);
  return list;
}

function subCatCal(subCat) {
  let Rent = 0;
  let Electricity = 0;
  let Gas = 0;
  let Water = 0;
  let Transport = 0;
  let Advertising = 0;
  let Supplies = 0;
  let Wages = 0;
  let Construction = 0;
  let Telephone = 0;
  let Other = 0;
  let list = [];
  // eslint-disable-next-line array-callback-return
  subCat?.map((item) => {
    if (item.SubCategory === "Rent") {
      Rent = Rent + item.Amount;
    } else if (item.SubCategory === "Electricity") {
      Electricity = Electricity + item.Amount;
    } else if (item.SubCategory === "Gas") {
      Gas = Gas + item.Amount;
    } else if (item.SubCategory === "Water") {
      Water = Water + item.Amount;
    } else if (item.SubCategory === "Transport") {
      Transport = Transport + item.Amount;
    } else if (item.SubCategory === "Advertising") {
      Advertising = Advertising + item.Amount;
    } else if (item.SubCategory === "Electricity") {
      Electricity = Electricity + item.Amount;
    } else if (item.SubCategory === "Supplies") {
      Supplies = Supplies + item.Amount;
    } else if (item.SubCategory === "Wages") {
      Wages = Wages + item.Amount;
    } else if (item.SubCategory === "Construction") {
      Construction = Construction + item.Amount;
    } else if (item.SubCategory === "Telephone") {
      Telephone = Telephone + item.Amount;
    } else if (item.SubCategory === "Other") {
      Other = Other + item.Amount;
    }
  });
  list.push(Rent);
  list.push(Electricity);
  list.push(Gas);
  list.push(Water);
  list.push(Transport);
  list.push(Advertising);
  list.push(Supplies);
  list.push(Wages);
  list.push(Construction);
  list.push(Telephone);
  list.push(Other);
  return list;
}

function Report({ user }) {
  const [choice, setChoice] = useState("");
  const [data, setData] = useState([]);
  const [show, setHide] = useState(true);
  const [Amount, setAmount] = useState([]);
  const [Expenses, setExpense] = useState([]);
  const [Income, setIncome] = useState([]);
  const [Assets, setAssets] = useState([]);
  const [costGood, setGood] = useState([]);
  const [Liabilities, setLiabilities] = useState([]);
  const [Capital, setCapital] = useState([]);
  const [SubCat, setSubCat] = useState([]);
  const [SubCat1, setSubCat1] = useState([]);
  const [show1, setHide1] = useState(false);
  const [incMon, setincMon] = useState([]);
  const [expMon, setexpMon] = useState([]);
  const [assetsSub, setAssetsSub] = useState([]);
  const [liabilitiesSub, setLiabilitiesSub] = useState([]);
  const [d1, setd1] = useState("0000-00-00");
  const [d2, setd2] = useState("4000-12-31");

  function setDate() {
    // setd1("0000-00-00");
    // setd2("4000-12-31");
    window.location.reload();
  }

  const onChangeDated1 = (e) => {
    //const newDate = new Date(e.target.value).format('YYYY-MM-DD');
    setd1(e.target.value);
    console.log(e.target.value); //value picked from date picker
  };
  const onChangeDated2 = (e) => {
    //const newDate = new Date(e.target.value).format('YYYY-MM-DD');
    setd2(e.target.value);
    console.log(e.target.value); //value picked from date picker
  };

  useEffect(() => {
    Axios.post(`http://localhost:3002/api/getTransaction/IncomeAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setIncome(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/ExpensesAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setExpense(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/AssetsAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setAssets(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/CostAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setGood(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/LiabilitiesAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setLiabilities(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/Amount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setAmount(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/CapitalAmount`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setCapital(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setSubCat(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub3`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setincMon(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub4`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setexpMon(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub5`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setAssetsSub(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub6`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setLiabilitiesSub(response.data);
      //console.log(response.data);
    });
    Axios.post(`http://localhost:3002/api/getTransaction/sub1`, {
      d1: d1,
      d2: d2,
    }).then(function (response) {
      setSubCat1(response.data);
      setHide1(true);
      //console.log(response.data);
    });
  }, [d1, d2]);

  const colors = [
    "#fc5203",
    "#fc1303",
    "#85645b",
    "#7d6e22",
    "#26ed6c",
    "#394dcc",
  ];
  let data2 = [
    ["Category", "Amount", { role: "style" }],
    ["Expenses", Expenses[0]?.ExpenseTotal, colors[0]],
    ["Income", Income[0]?.Income, colors[1]],
    ["Assets", Assets[0]?.Assets, colors[2]],
    ["Cost Of Goods", costGood[0]?.CostOfGood, colors[3]],
    ["Liabilities", Liabilities[0]?.Liabilities, colors[4]],
    ["Capital", Capital[0]?.Capital, colors[5]],
  ];

  useEffect(() => {
    if (choice === "Expenses") {
      Axios.post(`http://localhost:3002/api/getTransaction/Expenses`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "Cost of goods") {
      Axios.post(`http://localhost:3002/api/getTransaction/Costgood`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "Liabilities") {
      Axios.post(`http://localhost:3002/api/getTransaction/Liabilities`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "Capital") {
      Axios.post(`http://localhost:3002/api/getTransaction/Capital`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "Assets") {
      Axios.post(`http://localhost:3002/api/getTransaction/Assets`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "Income") {
      Axios.post(`http://localhost:3002/api/getTransaction/Income`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "All") {
      Axios.post(`http://localhost:3002/api/getTransactionR`, {
        d1: d1,
        d2: d2,
      }).then(function (response) {
        setHide(false);
        setData(response.data);
      });
    } else if (choice === "none") {
      setHide(true);
    }
  }, [choice, d1, d2]);

  let data3 = [
    ["Category", "Percent Per Category"],
    ["Expenses", Expenses[0]?.ExpenseTotal],
    ["Income", Income[0]?.Income],
    ["Assets", Assets[0]?.Assets],
    ["Cost Of Goods", costGood[0]?.CostOfGood],
    ["Liabilities", Liabilities[0]?.Liabilities],
    ["Capital", Capital[0]?.Capital],
  ];

  let list2 = subCatCal1(SubCat1);

  let list = subCatCal(SubCat);

  let listAss = subCatCalAssests(assetsSub);

  let listLia = subCatCalLiabilities(liabilitiesSub);

  let dataAL = [
    {
      Assets: "",
      Land: listAss[0],
      Building: listAss[1],
      Equipment: listAss[2],
      Transportation: listAss[3],
      "Accounts Receivable": listAss[4],
      Cash: listAss[5],
      Others: listAss[6],
      "Total Assets": listAss[7],
      Liabilities: "",
      "Accounts Payable": listLia[0],
      " Liabilities Others": listLia[1],
      "Total Liabilities": listLia[2],
    },
  ];

  let data4 = [
    ["Sub Category", "Percent"],
    ["Rent", list[0]],
    ["Electricity", list[1]],
    ["Gas", list[2]],
    ["Water", list[3]],
    ["Transport", list[4]],
    ["Advertising", list[5]],
    ["Supplies", list[6]],
    ["Wages", list[7]],
    ["Construction", list[8]],
    ["Telephone", list[9]],
    ["Other", list[10]],
  ];
  console.log(list);

  const options = {
    title: "Category Wise Amount",
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  const options2 = {
    title: "Category Wise Division",
    is3D: true,
  };

  const options3 = {
    title: "Sub Category Wise Division",
    is3D: true,
  };

  const data5I = incMon?.map((a) => [a.Month, a.Amount]);
  data5I?.unshift(["Month", "Amount"]);
  console.log(data5I);
  const data5E = expMon?.map((a) => [a.Month, a.Amount]);
  data5E?.unshift(["Month", "Amount"]);
  console.log(data5E);
  const optionsI = {
    chart: {
      title: "Income According to Months",
      subtitle: "in (AUD)",
      hAxis: { title: "Month" },
    },
  };

  const optionsE = {
    chart: {
      title: "Expense According to Months",
      subtitle: "in (AUD)",
      hAxis: { title: "Month" },
    },
  };

  let data5 = [
    {
      Income: "",
      "Main SubCategory": list2[0],
      List: list2[1],
      "Total Income": Income[0]?.Income,
      Expense: "",
      Rent: list[0],
      Electricity: list[1],
      Gas: list[2],
      Water: list[3],
      Transport: list[4],
      Advertising: list[5],
      Supplies: list[6],
      Wages: list[7],
      Construction: list[8],
      Telephone: list[9],
      Other: list[10],
      "Total Expense": Expenses[0]?.ExpenseTotal,
      "Total Profit": Income[0]?.Income - Expenses[0]?.ExpenseTotal,
    },
  ];

  let CashFlow = [
    {
      Assets: Assets[0]?.Assets,
      Cost_Of_Good: costGood[0]?.CostOfGood,
      Capital: Capital[0]?.Capital,
      Total: Assets[0]?.Assets + costGood[0]?.CostOfGood + Capital[0]?.Capital,
    },
  ];

  return user.signInUserSession.idToken.payload?.["cognito:groups"]?.includes(
    "admin"
  ) ? (
    <>
      <NavBar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <label
              style={{
                minHeight: 30,
                height: 32,
                fontWeight: "bold",
              }}
            >
              Please select the category to export to CSV
            </label>
          </div>
          <div className="col-sm">
            <select
              className="custom-select"
              onClick={(e) => setChoice(e.target.value)}
              style={{
                minHeight: 30,
                height: 32,
                marginLeft: 4,
                paddingTop: 0,
                paddingBottom: 0,
                borderRadius: "0.375rem",
                textAlign: "center",
                width: "60%",
              }}
            >
              <option value="none">None</option>
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
              <option value="Cost of goods">Cost of goods</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
              <option value="Capital">Capital</option>
            </select>
          </div>

          <div className="col-sm">
            <CSVLink
              data={data}
              filename={"Transaction-Details.csv"}
              className="btn btn-outline-secondary btn-sm"
              style={{ width: "60%" }}
            >
              {show ? "Select Category" : "Download"}
            </CSVLink>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-sm" style={{ fontWeight: "bold" }}>
            From Date
          </div>
          <div className="col-sm" style={{ fontWeight: "bold" }}>
            To Date
          </div>
          <div className="col-sm"></div>
        </div>

        <div className="row">
          <div className="col-sm">
            <input
              type="date"
              id="d1"
              className="form-control"
              onChange={onChangeDated1}
              placeholder="From"
              style={{ fontSize: 14, width: "60%" }}
            />
          </div>
          <div
            className="col-sm
            "
          >
            <input
              type="date"
              id="d2"
              className="form-control"
              onChange={onChangeDated2}
              placeholder="To"
              style={{ fontSize: 14, width: "60%" }}
            />
          </div>
          <div className="col-sm">
            <button
              onClick={setDate}
              className="form-control btn btn-outline-secondary btn-sm"
              style={{ width: "60%" }}
            >
              {" "}
              Show All Transaction
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />

        <table className="table table-hover" style={{ width: "95%" }}>
          <thead>
            <tr>
              <th>Profit Loss Statement</th>
              <th>Export Balance Sheet Report</th>
              <th>Export Cash Flow Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "center" }}>
              <th style={{ textAlign: "left" }}>
                {" "}
                <CSVLink
                  data={data5}
                  filename={"ProfitLoss.csv"}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {show1 ? "Download CSV" : "Choose Category and Wait"}
                </CSVLink>
                <label style={{ width: 5 }}></label>
                {show1 && (
                  <PDFDownloadLink
                    document={
                      <PdfDocument1
                        list2={list2}
                        Income={Income}
                        list={list}
                        Expenses={Expenses}
                      />
                    }
                    fileName="Transaction.pdf"
                    className="btn btn-outline-secondary btn-sm"
                    style={{ textAlign: "right" }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                )}
              </th>
              <td style={{ textAlign: "left" }}>
                {" "}
                <CSVLink
                  data={dataAL}
                  filename={"BalanceLoss.csv"}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {show1 ? "Download CSV" : "Choose Category and Wait"}
                </CSVLink>
              </td>
              <td style={{ textAlign: "left" }}>
                <CSVLink
                  data={CashFlow}
                  filename={"CashFlow.csv"}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {show1 ? "Download CSV" : "Choose Category and Wait"}
                </CSVLink>
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        <div className="row">
          <div className="col-8 border border-dark">
            <Chart
              chartType="ColumnChart"
              width="100"
              height="500px"
              options={options}
              data={data2}
            />
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            <div>
              <label
                style={{
                  width: "60%",
                  padding: 5,
                  backgroundColor: "#c3cad0",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Profit
              </label>
              <label
                className="border border-secondary"
                style={{ width: "60%", padding: 5, textAlign: "center" }}
              >
                {calculateProfit(Income, Expenses).toString()}%
              </label>
            </div>
            <br />
            <br />
            <br />
            <div>
              <label
                style={{
                  width: "60%",
                  backgroundColor: "#c3cad0",
                  fontWeight: "bold",
                  minHeight: 30,
                  padding: 5,
                  textAlign: "center",
                }}
              >
                Total Profit Amount
              </label>
              <label
                className="border border-secondary"
                style={{ width: "60%", padding: 5, textAlign: "center" }}
              >
                {/* ${Amount[0]?.Total} */}$
                {Income[0]?.Income - Expenses[0]?.ExpenseTotal}
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-secondary">
            <Chart
              chartType="PieChart"
              data={data3}
              options={options2}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-secondary">
            <Chart
              chartType="PieChart"
              data={data4}
              options={options3}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-secondary">
            <Chart
              chartType="Line"
              data={data5I}
              options={optionsI}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 border border-secondary">
            <Chart
              chartType="Line"
              data={data5E}
              options={optionsE}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <>
      <NavBar />
      <br />
      <Heading level={3}>Unauthorized Access!</Heading>
      <Footer />
    </>
  );
}

export default withAuthenticator(Report);
