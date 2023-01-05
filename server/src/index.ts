import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";
import swaggerDocs from "./utils/swagger";
import checkDbConnect from "./utils/checkDbConnect";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 1234;

const corsConfig = {
  credentials: true,
  origin: true,
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

swaggerDocs(app);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api`);
  checkDbConnect();
});
