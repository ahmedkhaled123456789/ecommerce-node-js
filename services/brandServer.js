// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require("sharp");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleWares/uploadImageMiddleWares");

const ApiError = require("../utils/apiError");
const brandModel = require("../models/bransModels");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brands-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${fileName}`);
  req.body.image = fileName;
  console.log(req.body.image);
  next();
});

exports.getBrands = factory.getAll(brandModel);

exports.getBrand = factory.getOne(brandModel);

exports.createBrand = factory.createOne(brandModel);

exports.updateBrand = factory.updateOne(brandModel);

exports.deleteBrand = factory.deleteOne(brandModel);

// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//   const { _id } = req.params;

//   const brand = await brandModel.findByIdAndDelete(_id);
//   if (!brand) {
//     // res.status(404).json({ msg: "no brand for this id" });
//     return next(new ApiError("no brand for this id", 404));
//   }
//   res.status(204).send();
// });
