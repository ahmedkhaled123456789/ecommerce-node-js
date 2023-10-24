const ApiError = require("../utils/apiError");

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
const handleJwtInvalidSignature = () =>
  new ApiError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
  new ApiError('Expired token, please login again..', 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-use-before-define
    sendErrorForDev(err, res);
  } else {
    if(err.name === 'JsonWebTokenError') err=handleJwtInvalidSignature();
    if(err.name === 'TokenExpiredError') err=handleJwtExpired();

    // eslint-disable-next-line no-use-before-define
    sendErrorForProd(err, res);
  }
};


module.exports = globalError;
