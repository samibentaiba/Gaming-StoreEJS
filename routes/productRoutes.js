// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth");

// Route to display all products (admin)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop/shop", { products });
  } catch (err) {
    req.flash("error_msg", "Error fetching products");
    res.redirect("/products");
  }
});

// Route to add a new product (admin)
router.get("/new", ensureAdmin, (req, res) => {
  res.render("admin/insert-product");
});

// Route to save a new product (admin)
router.post("/new", ensureAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    req.flash("success_msg", "Product added successfully");
    res.redirect("/products");
  } catch (err) {
    req.flash("error_msg", "Error adding product");
    res.redirect("/products/new");
  }
});

module.exports = router;
