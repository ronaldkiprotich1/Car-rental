"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.getAllBookingService = exports.getOneBookingService = exports.createBookingService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new booking
const createBookingService = async (booking) => {
    try {
        const newBooking = await db_1.default.insert(schema_1.BookingsTable).values(booking).returning();
        return newBooking[0];
    }
    catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};
exports.createBookingService = createBookingService;
// Get one booking by ID, including related car and location
const getOneBookingService = async (bookingID) => {
    return await db_1.default.query.BookingsTable.findFirst({
        columns: {
            bookingID: true,
            customerID: true,
            rentalStartDate: true,
            rentalEndDate: true,
            totalAmount: true
        },
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, bookingID),
        with: {
            car: {
                columns: {
                    carID: true,
                    carModel: true,
                    year: true,
                    color: true,
                    rentalRate: true
                },
                with: {
                    location: {
                        columns: {
                            locationID: true,
                            locationName: true,
                            address: true,
                            contactNumber: true
                        }
                    }
                }
            }
        }
    });
};
exports.getOneBookingService = getOneBookingService;
// Get all bookings with related car and location
const getAllBookingService = async () => {
    return await db_1.default.query.BookingsTable.findMany({
        columns: {
            bookingID: true,
            customerID: true,
            rentalStartDate: true,
            rentalEndDate: true,
            totalAmount: true
        },
        with: {
            car: {
                columns: {
                    carID: true,
                    carModel: true,
                    year: true,
                    color: true,
                    rentalRate: true
                },
                with: {
                    location: {
                        columns: {
                            locationID: true,
                            locationName: true,
                            address: true,
                            contactNumber: true
                        }
                    }
                }
            }
        }
    });
};
exports.getAllBookingService = getAllBookingService;
// Update a booking
const updateBookingService = async (bookingID, booking) => {
    const updatedBooking = await db_1.default.update(schema_1.BookingsTable)
        .set(booking)
        .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, bookingID))
        .returning();
    return updatedBooking[0];
};
exports.updateBookingService = updateBookingService;
// Delete a booking
const deleteBookingService = async (bookingID) => {
    const deleted = await db_1.default.delete(schema_1.BookingsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingID, bookingID))
        .returning();
    return deleted.length > 0;
};
exports.deleteBookingService = deleteBookingService;
