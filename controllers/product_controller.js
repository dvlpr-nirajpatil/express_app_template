const Product = require("../models/product");
const mongoose = require("mongoose");
const response = require("../utils/response");
const logger = require("../utils/logger");

module.exports.addProduct = async function (req, res) {
  const {
    title,
    description,
    category,
    condition,
    value,
    owner,
    barterPreferences,
    images,
    location,
  } = req.body;

  if (
    (!title || !description || !category || !condition || !images,
    !value || !owner || !barterPreferences || !location)
  ) {
    return response(res, 400, "All fields are required");
  }

  try {
    const product = new Product({
      title,
      description,
      category,
      images,
      condition,
      value,
      owner,
      barterPreferences,
      location,
    });
    await product.save();
    return response(res, 201, "Product added successfully", product);
  } catch (e) {
    logger.error(e);
    return response(res, 400, null, null, e);
  }
};

module.exports.getProduct = async function (req, res) {
  const { id } = req.params;

  if (!id) {
    return response(res, 400, "id is required");
  }

  try {
    const product = await Product.findById(id);

    return response(res, 201, "Product found successfully", product);
  } catch (e) {
    logger.error(e);
    return response(res, 400, null, null, e);
  }
};

module.exports.updateProduct = async function (req, res) {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return response(res, 400, "id is required");
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response(res, 400, "Invalid product id");
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates }, // Apply updates
      { new: true, runValidators: true }
    );

    if (!product) {
      return response(res, 404, "Product Not Found");
    }

    return response(res, 201, "Product updated successfully", product);
  } catch (e) {
    logger.error(e);
    return response(res, 500, null, null, e);
  }
};

module.exports.getProducts = async function (req, res) {
  try {
    const product = await Product.find();

    if (!product) {
      return response(res, 404, "Product Not Found");
    }

    return response(res, 200, "Product fetched succesfully", product);
  } catch (e) {
    logger.error(e);
    return response(res, 500, null, null, e);
  }
};
