require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const fileUpload = require("express-fileupload");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
app.use(express.json({ extended: false, limit: "50mb" }));

// API Swagger documentation
var options = {
  customCss: `
    .swagger-ui .topbar { display: none }
    `,
};
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

module.exports = app;
