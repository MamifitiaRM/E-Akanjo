import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";

import connectDb from "./db/db.js";
import connectToCloudinary from "./db/cloudinary.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.listen(PORT, () => {
  connectDb();
  connectToCloudinary();
  console.log("Le server est en marche sur http://localhost:" + PORT);
});
