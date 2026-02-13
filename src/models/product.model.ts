import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim:true,
  },
  category: {
    type: String,
    required: true,
    index:true,
  },
  price: {
    type: Number,
    required: true,
    min:0,
  },
  stock: {
    type: Number,
    required: true,
    min:0,
  },
  imageUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

export const Product = model<IProduct>("Product", productSchema);
