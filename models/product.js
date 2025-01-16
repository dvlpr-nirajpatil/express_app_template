const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    images: {
      type: [String],
      validate: {
        validator: (array) => array.length > 0 && array.length <= 5,
        message: "You must provide at least 1 image and no more than 5",
      },
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: {
        values: ["New", "Used", "Like New"],
        message: "Condition must be one of: New, Used, Like New",
      },
    },
    value: {
      type: Number,
      required: [true, "Value is required"],
      min: [0, "Value must be a positive number"],
    },
    owner: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner ID is required"],
      },
      name: {
        type: String,
      },
    },
    barterPreferences: {
      preferredItems: {
        type: [String],
        validate: {
          validator: (array) => array.length <= 10,
          message: "You can specify up to 10 preferred items only",
        },
      },
      negotiable: {
        type: Boolean,
        default: false,
      },
    },
    location: {
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      country: { type: String, required: [true, "Country is required"] },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "Latitude is required"],
          min: [-90, "Latitude must be between -90 and 90"],
          max: [90, "Latitude must be between -90 and 90"],
        },
        lng: {
          type: Number,
          required: [true, "Longitude is required"],
          min: [-180, "Longitude must be between -180 and 180"],
          max: [180, "Longitude must be between -180 and 180"],
        },
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
