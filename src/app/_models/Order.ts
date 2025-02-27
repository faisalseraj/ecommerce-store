import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;