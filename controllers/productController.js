const Product = require("../models/Product");
const { validationResult } = require("express-validator");

exports.getAddProduct = (req, res) => {
  res.render("admin/insert-product", {
    title: "Add Product",
    errors: [],
  });
};

exports.postAddProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/insert-product", {
      title: "Add Product",
      errors: errors.array(),
    });
  }

  try {
    const { name, description, price, category, imageUrl } = req.body;
    await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
      createdBy: req.user._id,
    });

    req.flash("success_msg", "Product added successfully");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error adding product");
    res.redirect("/admin/add-product");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteById(req.params.id);
    req.flash("success_msg", "Product deleted successfully");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error deleting product");
    res.redirect("/shop");
  }
};

exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/shop");
    }
    res.render("admin/edit-product", {
      title: "Edit Product",
      product,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error loading product");
    res.redirect("/shop");
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/edit-product", {
      title: "Edit Product",
      product: req.body,
      errors: errors.array(),
    });
  }

  try {
    const { name, description, price, category, imageUrl } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
    });

    req.flash("success_msg", "Product updated successfully");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error updating product");
    res.redirect("/shop");
  }
};
