const passport = require("passport");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    errors: [],
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  res.render("auth/register", {
    title: "Register",
    errors: [],
  });
};

exports.postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/register", {
      title: "Register",
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error during registration");
    res.redirect("/auth/register");
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "You are logged out");
    res.redirect("/auth/login");
  });
};
