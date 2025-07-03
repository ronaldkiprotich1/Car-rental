"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservationController = exports.updateReservationController = exports.getAllReservationsController = exports.getReservationController = exports.createReservationController = void 0;
const reservation_service_1 = require("../reservation/reservation.service");
// Create a new reservation
const createReservationController = async (req, res) => {
    try {
        const reservation = req.body;
        const newReservation = await (0, reservation_service_1.createReservationService)(reservation);
        res.status(201).json(newReservation);
    }
    catch (error) {
        console.error("Create Reservation Error:", error);
        res.status(500).json({ message: "Failed to create reservation" });
    }
};
exports.createReservationController = createReservationController;
// Get one reservation by ID
const getReservationController = async (req, res) => {
    try {
        const reservationID = parseInt(req.params.id);
        const reservation = await (0, reservation_service_1.getReservationService)(reservationID);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    }
    catch (error) {
        console.error("Get Reservation Error:", error);
        res.status(500).json({ message: "Failed to retrieve reservation" });
    }
};
exports.getReservationController = getReservationController;
// Get all reservations
const getAllReservationsController = async (_req, res) => {
    try {
        const reservations = await (0, reservation_service_1.getAllReservationsService)();
        res.status(200).json(reservations);
    }
    catch (error) {
        console.error("Get All Reservations Error:", error);
        res.status(500).json({ message: "Failed to retrieve reservations" });
    }
};
exports.getAllReservationsController = getAllReservationsController;
// Update reservation
const updateReservationController = async (req, res) => {
    try {
        const reservationID = parseInt(req.params.id);
        const updateData = req.body;
        const updatedReservation = await (0, reservation_service_1.updateReservationService)(reservationID, updateData);
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found or not updated" });
        }
        res.status(200).json(updatedReservation);
    }
    catch (error) {
        console.error("Update Reservation Error:", error);
        res.status(500).json({ message: "Failed to update reservation" });
    }
};
exports.updateReservationController = updateReservationController;
// Delete reservation
const deleteReservationController = async (req, res) => {
    try {
        const reservationID = parseInt(req.params.id);
        const deletedReservation = await (0, reservation_service_1.deleteReservationService)(reservationID);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found or already deleted" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    }
    catch (error) {
        console.error("Delete Reservation Error:", error);
        res.status(500).json({ message: "Failed to delete reservation" });
    }
};
exports.deleteReservationController = deleteReservationController;
