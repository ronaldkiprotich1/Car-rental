"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarService = exports.updateCarService = exports.getAllCarsService = exports.getCarService = exports.createCarService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new car
const createCarService = async (car) => {
    try {
        const newCar = await db_1.default.insert(schema_1.CarTable).values(car).returning();
        return newCar[0];
    }
    catch (error) {
        console.error("DB Insert Error:", error);
        throw error;
    }
};
exports.createCarService = createCarService;
// Get a car by ID
const getCarService = async (carID) => {
    return await db_1.default.query.CarTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.CarTable.carID} = ${carID}`,
        columns: {
            carID: true,
            carModel: true,
            year: true,
            color: true,
            rentalRate: true,
            availability: true,
            locationID: true,
        },
    });
};
exports.getCarService = getCarService;
// Get all cars
const getAllCarsService = async () => {
    return await db_1.default.query.CarTable.findMany({
        columns: {
            carID: true,
            carModel: true,
            year: true,
            color: true,
            rentalRate: true,
            availability: true,
            locationID: true,
        },
    });
};
exports.getAllCarsService = getAllCarsService;
// Update a car
const updateCarService = async (carID, carData) => {
    const updated = await db_1.default
        .update(schema_1.CarTable)
        .set(carData)
        .where((0, drizzle_orm_1.sql) `${schema_1.CarTable.carID} = ${carID}`)
        .returning();
    return updated[0];
};
exports.updateCarService = updateCarService;
// Delete a car
const deleteCarService = async (carID) => {
    const deleted = await db_1.default
        .delete(schema_1.CarTable)
        .where((0, drizzle_orm_1.sql) `${schema_1.CarTable.carID} = ${carID}`)
        .returning();
    return deleted[0];
};
exports.deleteCarService = deleteCarService;
