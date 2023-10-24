const { check,body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleWare = require("../../middleWares/validatorMiddleWare");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invalied Brand id"),
  validatorMiddleWare,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required").custom((val, {req}) =>{
      req.body.slug= slugify(val)
      return true
    })
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleWare,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  body('name').custom((val, {req}) =>{
    req.body.slug= slugify(val)
    return true
  }),
   validatorMiddleWare,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format"),
  validatorMiddleWare,
];
