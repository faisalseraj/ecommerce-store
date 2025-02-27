import Joi from "joi";
import { NextResponse } from "next/server";
import Product from "../../_models/Product"; // Adjust the import path as necessary
import { connectDb } from "../../_utils/db";

// Define a Joi schema for validation
const productSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  stock: Joi.number().optional().default(0),
  isInStock: Joi.boolean().optional().default(true),
  sku: Joi.string().optional(),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        options: Joi.array().items(Joi.string()).required(),
      })
    )
    .optional(),
  ratings: Joi.number().optional().default(0),
  reviews: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().optional(), // Adjust as needed
        rating: Joi.number().required(),
        comment: Joi.string().optional(),
        createdAt: Joi.date().default(Date.now),
      })
    )
    .optional(),
  isFeatured: Joi.boolean().optional().default(false),
  tags: Joi.array().items(Joi.string()).optional(),
  weight: Joi.number().optional(),
  dimensions: Joi.object({
    length: Joi.number().optional(),
    width: Joi.number().optional(),
    height: Joi.number().optional(),
  }).optional(),
});

// Handle GET request to fetch all products
export async function GET() {
  await connectDb(); // Establish the database connection

  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Handle POST request to create a new product
export async function POST(req: Request) {
  await connectDb(); // Establish the database connection

  const productData = await req.json();

  // Validate incoming product data
  const { error } = productSchema.validate(productData);
  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }
  console.log(productData, "productData");
  try {
    const newProduct = await Product.create(productData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
