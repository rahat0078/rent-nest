import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import { authRoute } from "./modules/auth/auth.routes";
import { propertiesRoute } from "./modules/properties/properties.route";
import { landlordRoute } from "./modules/landlord/landlord.routes";
import { rentRequestRoute } from "./modules/rentalRequest/rentRequest.routes";
import { paymentRoute } from "./modules/payment/payment.route";
import { adminRoute } from "./modules/admin/admin.routes";
import { categoryRoute } from "./modules/category/category.routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Rent Nest");
});

app.use("/api/auth", authRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/landlord", landlordRoute);
app.use("/api/rentals", rentRequestRoute);
app.use("/api/payment/rentals", paymentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);


app.use(notFound);
app.use(globalErrorHandler);

export default app;
