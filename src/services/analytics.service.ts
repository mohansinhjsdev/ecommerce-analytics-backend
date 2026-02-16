import { redis } from "../config/redis";
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

export const getCategoryWiseSales = async () => {
  const result = await Order.aggregate([
    // Step 1: Unwind products array
    { $unwind: "$products" },

    // Step 2: Lookup product collection
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },

    // Step 3: Unwind productDetails
    { $unwind: "$productDetails" },

    // Step 4: Group by category
    {
      $group: {
        _id: "$productDetails.category",

        totalRevenue: {
          $sum: {
            $multiply: ["$products.quantity", "$products.priceAtPurchase"],
          },
        },

        totalQuantitySold: {
          $sum: "$products.quantity",
        },
      },
    },

    // Step 5: Format output
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalRevenue: 1,
        totalQuantitySold: 1,
      },
    },
  ]);

  return result;
};

interface MonthlyRevenueQuery {
  from?: string | undefined;
  to?: string | undefined;
}

export const getMonthlyRevenue = async (query: MonthlyRevenueQuery) => {
  // Redis
  // 1.create Unique cache key
  const cacheKey = `monthlyRevenue:${query.from ?? "all"}:${query.to ?? "all"}`;

  //2.checked Redis first
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log("Serving Monthly Revenue from Redis");
    return JSON.parse(cachedData);
  }

  console.log("Fetching Monthly Revenue from MongoDB");

  const matchStage: any = {};

  if (query.from || query.to) {
    matchStage.createdAt = {};

    if (query.from) {
      matchStage.createdAt.$gte = new Date(query.from);
    }

    if (query.to) {
      matchStage.createdAt.$lte = new Date(query.to);
    }
  }

  const pipeline: any[] = [];

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  pipeline.push(
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalRevenue: 1,
      },
    },
  );

  const result = await Order.aggregate(pipeline);

  //3.store result in Redis with TTL (60 seconds)
  await redis.set(cacheKey, JSON.stringify(result), "EX", 60);

  return result;
};
