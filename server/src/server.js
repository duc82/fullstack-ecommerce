const express = require("express");
const cors = require("cors");
const cookiePaser = require("cookie-parser");
const indexRoute = require("./routes/index.route");
const startServer = require("./startServer");
const errorHandlingMiddleware = require("./middlewares/errorHandling.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const path = require("path");

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_CLIENT,
  })
);

// Cookie
app.use(cookiePaser());

// Serve static files
// http://localhost:5000/images/[file_name].[png|jpg|jpeg|webp|svg]
app.use("/images", express.static(path.join(__dirname, "views")));

// Routes
app.use(indexRoute);

// Not found
app.use(notFoundMiddleware);

// Error handling
app.use(errorHandlingMiddleware);

// Start server: port, connect and sync db
startServer(app);
