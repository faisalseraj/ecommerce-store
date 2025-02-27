import mongoose, { Document, Model } from 'mongoose';

export interface Review {
    userId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt?: Date;
}

export interface Variant {
    name: string; // e.g., "Color"
    options: string[]; // e.g., ["Red", "Blue"]
}

export interface ProductSchema extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: string[];
    stock: number;
    isInStock: boolean;
    sku: string;
    variants: Variant[];
    ratings: number;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
    isFeatured: boolean;
    tags: string[];
    weight?: number;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
}

const productSchema = new mongoose.Schema<ProductSchema>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        images: { type: [String], required: true },
        stock: { type: Number, required: true, default: 0 },
        isInStock: { type: Boolean, default: true },
        sku: { type: String, required: true, unique: true },
        variants: [
            {
                name: { type: String, required: true },
                options: { type: [String], required: true },
            },
        ],
        ratings: { type: Number, default: 0 },
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                rating: { type: Number, required: true },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        isFeatured: { type: Boolean, default: false },
        tags: { type: [String] },
        weight: { type: Number },
        dimensions: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number },
        },
    },
    {
        timestamps: true, // Automatically handle createdAt and updatedAt fields
    }
);

// Prevent Overwriting Model
const Product: Model<ProductSchema> = mongoose.models.Product || mongoose.model<ProductSchema>('Product', productSchema);

export default Product;