require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const setupPassport = require("./config/passport"); // Corrected import

// Initialize app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
  }),
);

// Passport initialization
setupPassport(passport); // Corrected call
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global variables for EJS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/shop", require("./routes/shopRoutes"));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
