import { NextApiRequest, NextApiResponse } from 'next';

// src/app/api/business/index.ts
import Business from '@/app/_models/Business';
import { businessSchemaValidator } from '@/app/_validators/userValidator';

const getBusinesses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const businesses = await Business.find().exec();
    return res.status(200).json({ message: 'Businesses retrieved successfully', businesses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createBusiness = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { error } = businessSchemaValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation failed', error });
    }

    const business = new Business(req.body);
    await business.save();

    return res.status(201).json({ message: 'Business created successfully', business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getBusinesses(req, res);
    case 'POST':
      return createBusiness(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}