const Product = require("../models/Product");

console.log("you are in the shoupRoutes ");
exports.getIndex = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop/index", {
      title: "Home",
      products: products.slice(0, 3), // Show only 3 featured products
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.getShop = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop/shop", {
      title: "Shop",
      products,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.render("404");
    }
    res.render("shop/product", {
      title: product.name,
      product,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

// Add to cart functionality (if implemented)
exports.addToCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error_msg", "Product not found");
      return res.redirect("/shop");
    }

    // Add to cart logic here (if cart functionality is implemented)
    req.flash("success_msg", "Added to cart");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error adding to cart");
    res.redirect("/shop");
  }
};
