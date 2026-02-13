import { Order } from "../models/order.model";

export const getTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};
