const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 3002;
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// const setReceiptID = (ReceiptId1) => {
//   ReceiptId = ReceiptId1;
// };
// Route to get Users
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get Transaction with Category Income Amount
app.post("/api/getTransaction/IncomeAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS Income FROM Transaction WHERE Category ='Income' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Expenses Amount
app.post("/api/getTransaction/ExpensesAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS ExpenseTotal FROM Transaction WHERE Category = 'Expenses' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Assets Amount
app.post("/api/getTransaction/AssetsAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS Assets FROM Transaction WHERE Category ='Assets' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Expense SubCategory Amount
app.post("/api/getTransaction/sub", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SubCategory, Amount FROM Transaction WHERE Category ='Expenses' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
// Route to get Transaction with Income SubCategory Amount
app.post("/api/getTransaction/sub1", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SubCategory, Amount FROM Transaction WHERE Category ='Income' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Assets SubCategory Amount
app.post("/api/getTransaction/sub5", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SubCategory, Amount FROM Transaction WHERE Category ='Assets' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Liabilities SubCategory Amount
app.post("/api/getTransaction/sub6", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SubCategory, Amount FROM Transaction WHERE Category ='Liabilities' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Income Amount According to month
app.post("/api/getTransaction/sub3", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT month(DateOfEntry) as Month,sum(Amount) as Amount from Transaction where Category='Income' AND DateEntered between ? and ? GROUP BY MONTH(DateOfEntry) ORDER BY MONTH(DateOfEntry) ASC",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Expenses Amount According to month
app.post("/api/getTransaction/sub4", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT month(DateOfEntry) as Month,sum(Amount) as Amount from Transaction where Category='Expenses' AND DateEntered between ? and ? GROUP BY MONTH(DateOfEntry) ORDER BY MONTH(DateOfEntry) ASC",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Cost Of Good Amount
app.post("/api/getTransaction/CostAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS CostOfGood FROM Transaction WHERE Category ='Cost of goods' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Liabilities Amount
app.post("/api/getTransaction/LiabilitiesAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS Liabilities FROM Transaction WHERE Category ='Liabilities' AND DateEntered between ? and ? ",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Total Amount
app.post("/api/getTransaction/Amount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS Total FROM Transaction WHERE DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Capital Amount
app.post("/api/getTransaction/CapitalAmount", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT SUM(Amount) AS Capital FROM Transaction WHERE Category ='Capital' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to Update Transaction
app.post("/api/updateTransaction/:id", async (req, res) => {
  const id = req.params.id;
  const UserID = req.body.UserID;
  const Name = req.body.Name;
  const CategoryID = req.body.CategoryID;
  const SubCategory = req.body.Subcategory;
  const DateOfEntry = req.body.Date;
  const ReceiptId = req.body.ReceiptId;
  const Amount = req.body.Amount;
  const Note = req.body.Note;
  const Quater = req.body.Quater;

  if (req.files != null) {
    const file = req.files.file;
    db.query(
      "UPDATE Receipt SET Date = ?, Name = ?, Attachment =? WHERE ID = ?",
      [DateOfEntry, file.name, file.data, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }

        res.send(result);
      }
    );
  }
  db.query(
    "UPDATE Transaction SET UserID = ?, Name = ?, Category = ?, SubCategory = ?, DateOfEntry = ?, ReceiptId = ?, Amount = ?, Note = ?, Quater = ? WHERE TransactionID = ?",
    [
      UserID,
      Name,
      CategoryID,
      SubCategory,
      DateOfEntry,
      ReceiptId,
      Amount,
      Note,
      Quater,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to Update Users
app.put("/api/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Role = req.body.Role;
  db.query(
    "UPDATE Users SET Name = ?, Email = ?, Role = ? WHERE UserID = ?",
    Name,
    Email,
    Role,
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get one User
app.get("/api/getUserFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Users WHERE UserID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the User
app.post("/api/createUser", (req, res) => {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Role = req.body.Role;

  db.query(
    "INSERT INTO Users (Name,Email,Role) VALUES (?,?,?)",
    [Name, Email, Role],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
      console.log(result);
    }
  );
});

// Route to delete the User
app.delete("/api/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM Users WHERE UserID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to delete a Transaction
app.delete("/api/deleteTransaction/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM Transaction WHERE TransactionID = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Delete Receipt
app.delete("/api/deleteReceipt/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM Receipt WHERE ID = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get the Transaction for the Home Page
app.get("/api/getTableTransaction", (req, res) => {
  db.query(
    "SELECT * FROM Transaction ORDER BY DateEntered DESC LIMIT 100",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get the Transactions sorted by date entered
app.get("/api/getTransaction", (req, res) => {
  db.query(
    "SELECT * FROM Transaction ORDER BY DateEntered DESC LIMIT 100",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get the Transactions sorted by id
app.get("/api/getTransactionSortedID", (req, res) => {
  db.query(
    "SELECT * FROM Transaction ORDER BY TransactionID DESC LIMIT 100",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
// Route to get the Transactions sorted by category
app.get("/api/getTransactionSortedCate", (req, res) => {
  db.query(
    "SELECT * FROM Transaction ORDER BY Category DESC LIMIT 100",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get the Transaction Report
app.post("/api/getTransactionR", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get Transaction with Category Expenses
app.post("/api/getTransaction/Expenses", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE Category = 'Expenses' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category CostOfGood
app.post("/api/getTransaction/Costgood", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE Category ='Cost of goods' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Liabilities
app.post("/api/getTransaction/Liabilities", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE Category ='Liabilities' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Capital
app.post("/api/getTransaction/Capital", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE Category ='Capital' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Assets
app.post("/api/getTransaction/Assets", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;

  db.query(
    "SELECT * FROM Transaction WHERE Category = 'Assets' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get Transaction with Category Income
app.post("/api/getTransaction/Income", (req, res) => {
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  db.query(
    "SELECT * FROM Transaction WHERE Category ='Income' AND DateEntered between ? and ?",
    [d1, d2],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Route to get a single Transaction
app.get("/api/getTransaction/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Transaction WHERE TransactionID = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//Route to get a single Receipt
app.get("/api/getReceipt/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT Attachment FROM Receipt WHERE ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Route to create Transaction
app.post("/api/createTransaction", async (req, res) => {
  const ID = req.body.TransactionID;
  const UserID = req.body.UserID;
  const CategoryID = req.body.CategoryID;
  const Category2 = req.body.Subcategory;
  const DateOfEntry = req.body.Date;
  const Name = req.body.Name;

  const Amount = req.body.Amount;
  const file = req.files.file;
  const Quater = req.body.Quater;
  const Note = req.body.Note;
  db.query(
    "INSERT INTO Receipt(ID,Date,Name,Attachment) VALUES (?,?,?,?)",
    [ID, DateOfEntry, file.name, file.data],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(result);
        db.query(
          "INSERT INTO Transaction (TransactionID,UserID,Name,Category,SubCategory,DateOfEntry,Amount,Note,ReceiptId,Quater) VALUES (?,?,?,?,?,?,?,?,?,?)",
          [
            ID,
            UserID,
            Name,
            CategoryID,
            Category2,
            DateOfEntry,
            Amount,
            Note,
            ID,
            Quater,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
});

// Route to create a log
app.post("/api/log", (req, res) => {
  const UserID = req.body.id;
  //const UserID = db.query("SELECT UserID FROM Users WHERE Name = ?", Name);
  const Description = req.body.Description;
  db.query(
    "INSERT INTO Logs (Description,UserID) VALUES (?,?)",
    [Description, UserID],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
      console.log(result);
    }
  );
});

//Get activity log
app.get("/api/getLogs", (req, res) => {
  db.query("SELECT * FROM Logs ORDER BY DateTime Desc", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//Get receipt image
app.get("/api/getReceipt/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT Attachment FROM Receipt where ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    //const imgdata = Buffer.from(result, "base64");

    res.send(result);
  });
});
//Add receipt
app.post("/api/addReceipt", (req, res) => {
  const ID = req.body.TransactionID;
  const DateOfEntry = req.body.Date;
  const file = req.files.file;

  db.query(
    "INSERT INTO Receipt(ID,Date,Name,Attachment) VALUES (?,?,?,?)",
    [ID, DateOfEntry, file.name, file.data],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      console.log(result);
    }
  );
});
//Update Receipt file
app.post("/api/updateReceipt/:id", (req, res) => {
  const id = req.params.id;
  //const DateOfEntry = req.body.Date;
  const file = req.files.file;
  //const Name = req.body.Name;
  db.query(
    "UPDATE Receipt SET Name = ?, Attachment = ? WHERE ID = ?",
    [file.name, file.data, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
