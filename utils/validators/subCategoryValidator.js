const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleWare = require("../../middleWares/validatorMiddleWare");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalied SubCategory id"),
  validatorMiddleWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required").custom((val, {req}) =>{
      req.body.slug= slugify(val)
      return true
    })
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name"),
    check('category').notEmpty().withMessage('subCategory must be belong to category').isMongoId().withMessage("Invalid SubCategory id format"),
validatorMiddleWare,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  body('name').custom((val, {req}) =>{
    req.body.slug= slugify(val)
    return true
  }),
   validatorMiddleWare,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleWare,
];
