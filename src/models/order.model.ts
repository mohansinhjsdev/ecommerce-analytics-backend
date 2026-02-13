import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  products: {
    productId: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

orderSchema.index({ createdAt: 1 }); //index for analytics

export const Order = model<IOrder>("Order", orderSchema);
