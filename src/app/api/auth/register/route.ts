import { NextResponse } from "next/server";
import User from "../../../_models/User"; // Corrected import path
import { connectDb } from "../../../_utils/db"; // Corrected import path
import { registerSchema } from "../../../_validators/userValidator"; // Import validation schema

export async function POST(req: Request) {
  await connectDb(); // Establish the database connection

  const body = await req.json();

  // Validate the request body
  const { error } = registerSchema.validate(body);
  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }

  const { email, password, phoneNumber, firstName, lastName, role } = body;

  try {
    await User.create({
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      role,
    });
    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
