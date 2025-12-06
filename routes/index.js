// routes/index.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Landing page
router.get("/", (req, res) => {
  res.render("index", { title: "Downtown Donuts" });
});

// Menu page
router.get("/menu", (req, res) => {
  // For prototype, using placeholder menu data (could be loaded from DB or a JSON file)
  const menu = [
    { name: "Classic Glazed", desc: "Soft, buttery, glazed to perfection.", price: "$1.50" },
    { name: "Chocolate Sprinkle", desc: "Rich chocolate with rainbow sprinkles.", price: "$1.75" },
    { name: "Maple Bacon", desc: "Sweet maple glaze with crisp bacon.", price: "$2.25" },
    { name: "Cappuccino", desc: "Espresso + steamed milk, perfect crema.", price: "$3.25" }
  ];
  res.render("menu", { title: "Menu", menu });
});

// About page
router.get("/about", (req, res) => {
  const timeline = [
    { year: 1992, event: "Downtown Donuts opens its doors." },
    { year: 2005, event: "Expanded menu and introduced specialty coffees." },
    { year: 2018, event: "Moved into renovated location on 3rd Ave." }
  ];
  res.render("about", { title: "About", timeline });
});

// Comments page - list comments
router.get("/comments", async (req, res, next) => {
  try {
    const rows = await db.query("SELECT id, name, message, created_at FROM comments ORDER BY created_at DESC");
    res.render("comments", { title: "Customer Comments", comments: rows });
  } catch (err) {
    next(err);
  }
});

// Post a new comment
router.post("/comments", async (req, res, next) => {
  try {
    const name = (req.body.name || "Anonymous").trim();
    const message = (req.body.message || "").trim();

    if (!message) {
      // simple validation: redirect back with no insert if empty
      return res.redirect("/comments");
    }

    await db.query("INSERT INTO comments (name, message) VALUES (?, ?)", [name, message]);
    res.redirect("/comments");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
