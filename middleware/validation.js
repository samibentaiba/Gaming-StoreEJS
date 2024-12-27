const { body } = require("express-validator");

exports.validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

exports.validateProduct = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters long"),
  body("description")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("imageUrl").trim().isURL().withMessage("Please enter a valid image URL"),
];
