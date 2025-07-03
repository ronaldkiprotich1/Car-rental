import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Correct imports from source files
// import { booking } from "./bookings/booking.route";
// import { maintenance } from "./maintenance/maintenance.route";
// import { payment } from "./payment/payment.route";
// import { reservation } from "./reservation/reservation.route";
// import { customer } from "./customer/customer.route";
// import { car } from "./car/car.route";
// import { insurance } from "./insurance/insurance.route";
// import { location } from "./location/location.route";
// import { user } from "./auth/auth.router"; // Assuming you have auth routes

dotenv.config();

const initializeApp = () => {
  const app = express();

  // CORS configuration
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

  // Middleware
  app.use(express.json());

  // Health check
  app.get("/", (req, res) => {
    res.send("hello");
  });

  app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
  });

  // // Register routes
  // maintenance(app);
  // booking(app);
  // payment(app);
  // reservation(app);
  // customer(app); // Fixed - using customer route handler
  // location(app);
  // insurance(app);
  // car(app);
  // user(app); // Fixed - using auth routes

  return app;
};

const app = initializeApp();
export default app;