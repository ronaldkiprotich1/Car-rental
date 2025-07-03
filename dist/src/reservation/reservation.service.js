"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservationService = exports.updateReservationService = exports.getAllReservationsService = exports.getReservationService = exports.createReservationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new reservation
const createReservationService = async (reservation) => {
    try {
        const newReservation = await db_1.default.insert(schema_1.ReservationTable).values(reservation).returning();
        return newReservation[0];
    }
    catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
};
exports.createReservationService = createReservationService;
// Get a reservation by ID
const getReservationService = async (reservationID) => {
    try {
        return await db_1.default.query.ReservationTable.findFirst({
            columns: {
                reservationID: true,
                customerID: true,
                carID: true,
                reservationDate: true,
                pickupDate: true,
                returnDate: true
            },
            where: (0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, reservationID)
        });
    }
    catch (error) {
        console.error("Error fetching reservation:", error);
        throw error;
    }
};
exports.getReservationService = getReservationService;
// Get all reservations
const getAllReservationsService = async () => {
    try {
        return await db_1.default.query.ReservationTable.findMany({
            columns: {
                reservationID: true,
                customerID: true,
                carID: true,
                reservationDate: true,
                pickupDate: true,
                returnDate: true
            }
        });
    }
    catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
};
exports.getAllReservationsService = getAllReservationsService;
// Update a reservation
const updateReservationService = async (reservationID, data) => {
    try {
        const updated = await db_1.default.update(schema_1.ReservationTable)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, reservationID))
            .returning();
        return updated[0];
    }
    catch (error) {
        console.error("Error updating reservation:", error);
        throw error;
    }
};
exports.updateReservationService = updateReservationService;
// Delete a reservation
const deleteReservationService = async (reservationID) => {
    try {
        const deleted = await db_1.default.delete(schema_1.ReservationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.ReservationTable.reservationID, reservationID))
            .returning();
        return deleted[0];
    }
    catch (error) {
        console.error("Error deleting reservation:", error);
        throw error;
    }
};
exports.deleteReservationService = deleteReservationService;
