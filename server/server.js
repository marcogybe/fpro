import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"
import connectDB from "./config/db.js"
import userModel from "./models/userModel.js";
import vouchersRouter from "./routes/voucherRoute.js"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", async (req, res) => {
  const numUsers = await userModel.estimatedDocumentCount();
  res.json(numUsers);
});

// Routes
app.use("/api/user", userRouter)
app.use("/api/vouchers", vouchersRouter)

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(`Error Message: ${err.message}`);
});

// Connecting MongoDB
connectDB()


app.listen(PORT, () => console.log(`app is listening at port ${PORT}.`));
