// routes/shopRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Route to display all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetching all products from the DB
    res.render("shop/shop", { products }); // Rendering 'shop/shop.ejs' with the products data
  } catch (err) {
    req.flash("error_msg", "Error fetching products");
    res.redirect("/"); // Redirecting to the home page if an error occurs
  }
});

// Route to display a single product's details
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetching the product by ID
    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/products"); // Redirect to the products page if the product is not found
    }
    res.render("shop/product", { product }); // Rendering the single product view
  } catch (err) {
    req.flash("error_msg", "Error fetching product details");
    res.redirect("/products"); // Redirecting to the products page if an error occurs
  }
});

module.exports = router;
