import { NextApiRequest, NextApiResponse } from "next";

// src/app/api/business/[id].ts
import Business from "@/app/_models/Business";
import { businessSchemaValidator } from "@/app/_validators/userValidator";

const getBusiness = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const business = await Business.findById(id).exec();
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    return res
      .status(200)
      .json({ message: "Business retrieved successfully", business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBusiness = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const business = await Business.findById(id).exec();
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const { error } = businessSchemaValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation failed", error });
    }

    Object.assign(business, req.body);
    await business.save();

    return res
      .status(200)
      .json({ message: "Business updated successfully", business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBusiness = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const business = await Business.findByIdAndDelete(id).exec();
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    return res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getBusiness(req, res);
    case "PUT":
      return updateBusiness(req, res);
    case "DELETE":
      return deleteBusiness(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
