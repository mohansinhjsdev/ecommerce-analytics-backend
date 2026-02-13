import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import analyticsRoutes from "./routes/analytics.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/analytics", analyticsRoutes);

export default app;
