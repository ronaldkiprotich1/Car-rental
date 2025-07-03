"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.getAllBookingController = exports.getOneBookingController = exports.createBookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBookingController = async (req, res) => {
    try {
        const booking = req.body;
        const newBooking = await (0, booking_service_1.createBookingService)(booking);
        if (!newBooking) {
            return res.status(400).json({ message: "Failed to create booking" });
        }
        res.status(201).json(newBooking);
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createBookingController = createBookingController;
const getOneBookingController = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const booking = await (0, booking_service_1.getOneBookingService)(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    }
    catch (error) {
        console.error("Error getting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOneBookingController = getOneBookingController;
const getAllBookingController = async (_req, res) => {
    try {
        const bookings = await (0, booking_service_1.getAllBookingService)();
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error("Error getting all bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllBookingController = getAllBookingController;
const updateBookingController = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const updatedBooking = await (0, booking_service_1.updateBookingService)(bookingId, req.body);
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found or not updated" });
        }
        res.status(200).json(updatedBooking);
    }
    catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const deleted = await (0, booking_service_1.deleteBookingService)(bookingId);
        if (!deleted) {
            return res.status(404).json({ message: "Booking not found or already deleted" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteBookingController = deleteBookingController;
