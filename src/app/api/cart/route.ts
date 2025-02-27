import Cart from "../../_models/Cart"; // Adjust the import path as necessary
import { NextResponse } from "next/server";
import { connectDb } from "../../_utils/db";

export async function GET(req: any) {
  await connectDb(); // Establish the database connection
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const cartItems = await Cart.find({ user_id: userId }).populate(
      "product_id"
    );
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: any) {
  await connectDb(); // Establish the database connection

  const { userId, productId } = await req.json();

  try {
    const newItem = await Cart.create({
      user_id: userId,
      product_id: productId,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
