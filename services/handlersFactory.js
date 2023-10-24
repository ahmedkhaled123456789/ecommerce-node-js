const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({ msg: "no document for this id" });
      return next(new ApiError(`no document for this ${id}`, 404));
    }
    document.remove();

    res.status(204).send();
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      // res.status(404).json({ msg: "no document for this id" });
      return next(new ApiError("no document for this id", 404));
    }

    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (model,populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
// 1) Build query
let query = model.findById(id);
if (populationOpt) {
  query = query.populate(populationOpt);
}

// 2) Execute query
const document = await query; 
   if (!document) {
      // res.status(404).json({ msg: "no document for this id" });
      return next(new ApiError("no document for this id", 404));
    }
    res.status(200).json({ data: document });
  });
exports.getAll = (Model,modelName='') =>
  asyncHandler(async (req, res, next) => {
    let filter ={};
    if(req.filterObj){
      filter= req.filterObj
    }
    // const documentCounts = await Model.countDocuments();
    const apiFeature = new ApiFeatures(Model.find(filter), req.query)
      .sort()
      .filter()
      // .paginate(documentCounts)
      .search(modelName)
      .limitFields();
    // execute  query
    const { mongooseQuery, pagination } = apiFeature;
    const document = await mongooseQuery;
    res.status(200).json({ results: document.length, pagination, data: document });
  });
