"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booking = void 0;
const booking_controller_1 = require("./booking.controller");
const booking = (app) => {
    // Create a new booking
    app.route("/booking").post(async (req, res, next) => {
        try {
            await (0, booking_controller_1.createBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get all bookings
    app.route("/bookings").get(async (req, res, next) => {
        try {
            await (0, booking_controller_1.getAllBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Get one booking by ID
    app.route("/booking/:id").get(async (req, res, next) => {
        try {
            await (0, booking_controller_1.getOneBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Update booking by ID
    app.route("/booking/:id").put(async (req, res, next) => {
        try {
            await (0, booking_controller_1.updateBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    // Delete booking by ID
    app.route("/booking/:id").delete(async (req, res, next) => {
        try {
            await (0, booking_controller_1.deleteBookingController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.booking = booking;
