const express = require("express");
const sqlite = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");

// middleware
app.use(express.json());
app.use(bodyParser.json());

// DB Connection
const db = new sqlite.Database(
  "./dua_main.sqlite",
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(err.message);
    else {
      console.log("Connected to the SQLite database");
    }
  }
);

app.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// dua
app.get("/dua", (req, res) => {
  const sql = "SELECT * FROM dua";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// get query data by cat_id
app.get("/duas", (req, res) => {
  const catId = req.query.cat_id;
  db.all("SELECT * FROM dua WHERE cat_id = ?", [catId], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

// sub Categories
app.get("/sub_category", (req, res) => {
  const sql = "SELECT * FROM sub_category";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// sub Categories
app.get("/sub_category/:id", (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const sql ="SELECT * FROM sub_category WHERE subcat_id = ? ";
  db.all(sql, [categoryId], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
