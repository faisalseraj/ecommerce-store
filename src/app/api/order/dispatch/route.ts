import { NextResponse } from "next/server";
import Order from "../../../_models/Order"; // Adjust the import path as necessary
import { connectDb } from "../../../_utils/db";

export async function POST(req: any) {
  await connectDb(); // Establish the database connection

  const { userId, address, email, phone } = await req.json();

  try {
    const newOrder = await Order.create({
      user_id: userId,
      address,
      email,
      phone,
    });
    return NextResponse.json(
      { message: "Order placed successfully!", order: newOrder },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
