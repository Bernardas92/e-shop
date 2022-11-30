import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("db connected"))
.catch((err) => console.log("DB ERROR => ", err));

//middlewares
app.use(morgan("dev"));
app.use(express.json());

// router middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Serveris pasileides portu: ${port}`);
});



