import Cart from "../../_models/Cart"; // Adjust the import path as necessary
import Joi from "joi";
import { NextResponse } from "next/server";
import { connectDb } from "../../_utils/db";

// Define the validation schema for adding to the cart
const cartSchema = Joi.object({
  userId: Joi.string().required(), // Ensure userId is present and is a string
  productId: Joi.string().required(), // Ensure productId is present and is a string
});

// Handle GET request
export async function GET(req: Request) {
  await connectDb(); // Establish the database connection

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    const cartItems = await Cart.find({ userId: userId }).populate("productId");
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Handle POST request
export async function POST(req: Request) {
  await connectDb(); // Establish the database connection

  const { userId, productId } = await req.json();

  // Validate input data
  const { error } = cartSchema.validate({ userId, productId });
  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    // Check if item already exists in the cart for the user
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // Item exists, update the quantity
      const updatedItem = await Cart.findByIdAndUpdate(
        existingItem._id,
        {
          quantity: existingItem.quantity + 1, // Increment quantity by 1
        },
        { new: true }
      ); // Return the updated document

      return NextResponse.json(updatedItem, { status: 200 }); // Return updated cart item
    }

    // If item does not exist, create a new entry
    const newItem = await Cart.create({
      userId,
      productId,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Handle DELETE request
export async function DELETE(req: Request) {
  await connectDb(); // Establish the database connection

  const { userId, productId } = await req.json();

  // Validate input data
  const { error } = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
  }).validate({ userId, productId });

  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    // Remove item from cart
    const removedItem = await Cart.findOneAndDelete({ userId, productId });
    if (!removedItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Item removed from cart" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
