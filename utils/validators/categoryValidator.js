const { check,body} = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleWare = require("../../middleWares/validatorMiddleWare");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalied category id"),
  validatorMiddleWare,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required").custom((val, {req}) =>{
      req.body.slug= slugify(val)
      return true
    })
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleWare,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body('name').custom((val, {req}) =>{
    req.body.slug= slugify(val)
    return true
  }),
   validatorMiddleWare,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleWare,
];
