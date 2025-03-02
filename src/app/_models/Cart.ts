import mongoose from "mongoose";

// Define the Cart Schema
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Renamed for consistency
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Updated to match naming convention
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` fields
);

// Create the model
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema); // Preventing overwrite error by checking the existing model

export default Cart;
