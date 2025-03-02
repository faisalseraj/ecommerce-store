import Order, { OrderSchema } from "@/app/_models/Order";

import Cart from "@/app/_models/Cart";
import { NextResponse } from "next/server";
import Product from "@/app/_models/Product";
import { billingTemplate } from "@/app/_templates/billing_template";
import { connectDb } from "@/app/_utils/db";
import sendEmailViaBrevo from "@/app/_utils/sendEmailViaBrevo";

const Joi = require("joi");

const orderSchema = Joi.object().keys({
  userId: Joi.string()
    .required()
    .regex(/^[a-f\d]{24}$/i),
  items: Joi.array()
    .items(
      Joi.object().keys({
        productId: Joi.string()
          .required()
          .regex(/^[a-f\d]{24}$/i),
        quantity: Joi.number().integer().required().min(1),
      })
    )
    .required(),
  totalAmount: Joi.number(),
  shippingDetails: Joi.object()
    .keys({
      fullName: Joi.string().required().trim().min(2).max(50),
      phoneNumber: Joi.string().required().trim().min(5).max(20),
      email: Joi.string().required().email(),
      address: Joi.string().required().trim().min(5).max(100),
    })
    .required(),
});

const validateOrder = (order: OrderSchema) => {
  return orderSchema.validate(order);
};

export async function POST(req: Request) {
  await connectDb(); // Connect to the database

  const orderData = (await req.json()) as OrderSchema;
  const result = validateOrder(orderData);
  if (result.error) {
    return NextResponse.json(
      { error: JSON.stringify(result.error.details) },
      { status: 400 }
    );
  }
  try {
    let totalAmount = 0;
    // Check stock levels first
    for (const item of orderData.items) {
      const product = await Product.findById(item.productId);
      totalAmount = totalAmount + (product?.price as number) * item.quantity;
      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product?.name}` },
          { status: 400 }
        );
      }
    }

    // Proceed to create the order
    const newOrder = await Order.create({ ...orderData, totalAmount });

    // Update stock levels
    for (const item of orderData.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }
    // Clear the cart for the user
    const userId = orderData.userId;
    const confirmedOrder = await Order.findById(newOrder._id).populate({
      path: "items.productId",
      model: "Product",
    }).lean();

    // await Cart.deleteMany({ userId });
    await sendEmailViaBrevo({
      content: billingTemplate(confirmedOrder as any),
      subject: "Order placed successfully",
      to: [
        {
          email: orderData.shippingDetails.email,
          name: orderData.shippingDetails.fullName,
        },
      ],
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
