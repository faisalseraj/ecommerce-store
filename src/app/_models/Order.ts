import mongoose, { Document, Model } from 'mongoose';

import { IUser } from './User';
import { ProductSchema } from './Product';

interface OrderItem {
    productId: mongoose.Schema.Types.ObjectId; // Reference to Product
    quantity: number;
}

interface ConfirmedOrderItem {
    productId: ProductSchema
    quantity: number;
}

export interface OrderSchema extends Document {
    userId: mongoose.Schema.Types.ObjectId; // Reference to User
    items: OrderItem[];
    totalAmount: number;
    shippingDetails: {
        fullName: string;
        phoneNumber: string;
        email: string;
        address: string;
    };
    createdAt: Date;
}


export interface IConfirmedOrder {
    userId: IUser
    items: ConfirmedOrderItem[];
    totalAmount: number;
    shippingDetails: {
        fullName: string;
        phoneNumber: string;
        email: string;
        address: string;
    };
    createdAt: Date;
}

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }],
        totalAmount: { type: Number, required: true },
        shippingDetails: {
            fullName: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
        },
    },
    { timestamps: true }
);

const Order: Model<OrderSchema> = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;