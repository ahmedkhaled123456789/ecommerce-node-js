const path= require('path')
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");

const couponRoutes=require("./routes")
 


const ApiError = require("./utils/apiError");
const globalError = require("./middleWares/globalError");

// connect with db
dbConnection();
//  express app
const app = express();

//  middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node : ${process.env.NODE_ENV}`);
}

// mount routes

couponRoutes(app);
// create error and send it to handling error
app.all("*", (req, res, next) => {
  // const err = new Error(`can't find this route ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});

//  Global error handling middleware
app.use(globalError);
// listen
const PORT = process.env.PORT || 8000;

const sever = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
// Handle Errors Rejections Outside Express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection error ${err.name} ${err.message}`);
  sever.close(() => {
    console.log("server shutting down");
    process.exit(1);
  });
});
