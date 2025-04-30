import mongoose, { Schema, Document } from 'mongoose';

interface IOrderedItem {
  menuItemId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  phoneNumber: string;
  items: IOrderedItem[];
  totalPrice: number;
}

const OrderSchema: Schema = new Schema(
  {
    phoneNumber: { type: String, required: true },
    items: [
      {
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
