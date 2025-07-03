"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const booking_route_1 = require("./bookings/booking.route");
const maintenance_route_1 = require("./maintenance/maintenance.route");
const payment_route_1 = require("./payment/payment.route");
const reservation_route_1 = require("./reservation/reservation.route");
const customer_route_1 = require("./customer/customer.route");
const location_route_1 = require("./location/location.route");
const insurance_route_1 = require("./insurance/insurance.route");
const car_route_1 = require("./car/car.route");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
dotenv_1.default.config();
const initializeApp = () => {
    const app = (0, express_1.default)();
    // ✅ Updated CORS configuration
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173", // frontend dev URL
        credentials: true, // allows cookies & authorization headers
    }));
    // Middleware
    app.use(express_1.default.json());
    // Health check
    app.get("/", (req, res) => {
        res.send("hello");
    });
    app.get("/health", (req, res) => {
        res.status(200).send("Server is healthy");
    });
    // Register routes
    (0, maintenance_route_1.maintenance)(app);
    (0, booking_route_1.booking)(app);
    (0, payment_route_1.payment)(app);
    (0, reservation_route_1.reservation)(app);
    (0, customer_route_1.customer)(app);
    (0, location_route_1.location)(app);
    (0, insurance_route_1.insurance)(app);
    (0, car_route_1.car)(app);
    (0, auth_router_1.default)(app); // Auth routes
    return app;
};
const app = initializeApp();
exports.default = app;
