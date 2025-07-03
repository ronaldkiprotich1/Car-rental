"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.getAllLocationsService = exports.getLocationService = exports.createLocationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new location
const createLocationService = async (location) => {
    try {
        const newLocation = await db_1.default.insert(schema_1.LocationTable).values(location).returning();
        return newLocation[0];
    }
    catch (error) {
        console.error("Error creating location:", error);
        throw error;
    }
};
exports.createLocationService = createLocationService;
// Get one location by ID
const getLocationService = async (locationID) => {
    try {
        return await db_1.default.query.LocationTable.findFirst({
            columns: {
                locationID: true,
                locationName: true,
                address: true,
                contactNumber: true
            },
            where: (0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, locationID)
        });
    }
    catch (error) {
        console.error("Error getting location:", error);
        throw error;
    }
};
exports.getLocationService = getLocationService;
// Get all locations with their related cars
const getAllLocationsService = async () => {
    try {
        return await db_1.default.query.LocationTable.findMany({
            columns: {
                locationID: true,
                locationName: true,
                address: true,
                contactNumber: true
            },
            with: {
                cars: {
                    columns: {
                        carID: true,
                        carModel: true,
                        year: true,
                        color: true,
                        availability: true,
                        rentalRate: true
                    }
                }
            }
        });
    }
    catch (error) {
        console.error("Error getting all locations:", error);
        throw error;
    }
};
exports.getAllLocationsService = getAllLocationsService;
// Update a location
const updateLocationService = async (locationID, locationData) => {
    try {
        const updated = await db_1.default.update(schema_1.LocationTable)
            .set(locationData)
            .where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, locationID))
            .returning();
        return updated[0];
    }
    catch (error) {
        console.error("Error updating location:", error);
        throw error;
    }
};
exports.updateLocationService = updateLocationService;
// Delete a location
const deleteLocationService = async (locationID) => {
    try {
        const deleted = await db_1.default.delete(schema_1.LocationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.LocationTable.locationID, locationID))
            .returning();
        return deleted.length > 0;
    }
    catch (error) {
        console.error("Error deleting location:", error);
        throw error;
    }
};
exports.deleteLocationService = deleteLocationService;
