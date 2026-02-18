import { redis } from "../config/redis";

export const invalidateMonthlyRevenueCache = async () => {
  const keys = await redis.keys("monthlyRevenue:*");

  if (keys.length > 0) {
    await redis.del(keys);
    console.log("Invalidated Monthly Revenue cache:", keys);
  }
};
