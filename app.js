// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout"); // express-ejs-layouts default layout file name
app.use(expressLayouts);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/", indexRouter);

// 404
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
