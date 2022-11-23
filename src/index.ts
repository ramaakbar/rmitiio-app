import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import responseLogger from "./middleware/responseLogger";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 1234;

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(responseLogger);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});