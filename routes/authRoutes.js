// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
);

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    req.flash("success_msg", "Registration successful! Please login");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", "Registration failed");
    res.redirect("/auth/register");
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
