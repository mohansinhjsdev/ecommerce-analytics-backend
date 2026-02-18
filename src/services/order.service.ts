import mongoose from "mongoose";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { invalidateMonthlyRevenueCache } from "./analyticsCache.service";

export const createOrder = async (data: {
  products: { productId: string; quantity: number }[];
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let totalAmount = 0;
    const orderProducts: {
      productId: mongoose.Types.ObjectId;
      quantity: number;
      priceAtPurchase: number;
    }[] = [];
    for (const item of data.products) {
      //validate object id
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        throw new Error("Invalid product ID");
      }

      //fetch product
      const product = await Product.findOne({
        _id: item.productId,
        isActive: true,
      }).session(session);
      if (!product) {
        throw new Error("Product not found");
      }

      //check stock
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      //calucate stock
      totalAmount += product.price * item.quantity;

      //store snapshot
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });

      //debug stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    console.log("Order Products Snapshot:", orderProducts);

    //create order
    // const order = await Order.create(
    //   [
    //     {
    //       products: orderProducts,
    //       totalAmount,
    //     },
    //   ],
    //   { session },
    // );
    const order = new Order({
      products: orderProducts,
      totalAmount,
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    // cache invalidate
    await invalidateMonthlyRevenueCache();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
