 // eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require("sharp");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const {uploadSingleImage}=require('../middleWares/uploadImageMiddleWares');
const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModels");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `catergory-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${fileName}`);
  req.body.image = fileName;
  console.log(req.body.image)
  next();
});

exports.getCaterories = factory.getAll(Category)


exports.getCategory = factory.getOne(Category);


exports.createCategory =factory.createOne(Category)

exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.deleteOne(Category);
