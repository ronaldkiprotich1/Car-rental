"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarMaintenanceHistory = exports.deleteMaintenanceService = exports.updateMaintenanceService = exports.getAllMaintenanceService = exports.getMaintenanceService = exports.createMaintenanceService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const createMaintenanceService = async (maintenance) => {
    try {
        console.log("Service received maintenance data:", maintenance);
        console.log("MaintenanceTable schema:", schema_1.MaintenanceTable);
        const newMaintenance = await db_1.default.insert(schema_1.MaintenanceTable).values(maintenance).returning();
        console.log("Database insert result:", newMaintenance);
        return newMaintenance[0];
    }
    catch (error) {
        console.error("Database error in createMaintenanceService:", error);
        throw error;
    }
};
exports.createMaintenanceService = createMaintenanceService;
const getMaintenanceService = async (maintenanceID) => {
    try {
        console.log("Fetching maintenance with ID:", maintenanceID);
        const result = await db_1.default.query.MaintenanceTable.findFirst({
            columns: {
                maintenanceID: true,
                carID: true,
                maintenanceDate: true,
                description: true,
                cost: true,
            },
            with: {
                car: {
                    columns: {
                        carModel: true,
                        year: true,
                        color: true,
                    },
                    with: {
                        location: {
                            columns: {
                                locationName: true,
                                address: true,
                                contactNumber: true,
                            },
                        },
                    },
                },
            },
            where: (0, drizzle_orm_1.sql) `${schema_1.MaintenanceTable.maintenanceID} = ${maintenanceID}`,
        });
        console.log("Database query result:", result);
        return result;
    }
    catch (error) {
        console.error("Database error in getMaintenanceService:", error);
        throw error;
    }
};
exports.getMaintenanceService = getMaintenanceService;
const getAllMaintenanceService = async () => {
    try {
        console.log("Fetching all maintenance records");
        const result = await db_1.default.query.MaintenanceTable.findMany({
            columns: {
                maintenanceID: true,
                carID: true,
                maintenanceDate: true,
                description: true,
                cost: true,
            },
            with: {
                car: {
                    columns: {
                        carModel: true,
                        year: true,
                        color: true,
                    },
                    with: {
                        location: {
                            columns: {
                                locationName: true,
                                address: true,
                            },
                        },
                    },
                },
            },
        });
        console.log("Database query result:", result);
        return result;
    }
    catch (error) {
        console.error("Database error in getAllMaintenanceService:", error);
        throw error;
    }
};
exports.getAllMaintenanceService = getAllMaintenanceService;
// Update maintenance
const updateMaintenanceService = async (maintenanceID, maintenanceData) => {
    try {
        console.log("Updating maintenance with ID:", maintenanceID, "Data:", maintenanceData);
        const updated = await db_1.default.update(schema_1.MaintenanceTable)
            .set(maintenanceData)
            .where((0, drizzle_orm_1.sql) `${schema_1.MaintenanceTable.maintenanceID} = ${maintenanceID}`)
            .returning();
        console.log("Database update result:", updated);
        return updated[0];
    }
    catch (error) {
        console.error("Database error in updateMaintenanceService:", error);
        throw error;
    }
};
exports.updateMaintenanceService = updateMaintenanceService;
// Delete maintenance
const deleteMaintenanceService = async (maintenanceID) => {
    try {
        console.log("Deleting maintenance with ID:", maintenanceID);
        const deleted = await db_1.default.delete(schema_1.MaintenanceTable)
            .where((0, drizzle_orm_1.sql) `${schema_1.MaintenanceTable.maintenanceID} = ${maintenanceID}`)
            .returning();
        console.log("Database delete result:", deleted);
        return deleted[0];
    }
    catch (error) {
        console.error("Database error in deleteMaintenanceService:", error);
        throw error;
    }
};
exports.deleteMaintenanceService = deleteMaintenanceService;
// Get maintenance history for a specific car
const getCarMaintenanceHistory = async (carID) => {
    try {
        console.log("Fetching maintenance history for car ID:", carID);
        const result = await db_1.default.query.MaintenanceTable.findMany({
            columns: {
                maintenanceID: true,
                carID: true,
                maintenanceDate: true,
                description: true,
                cost: true,
            },
            with: {
                car: {
                    columns: {
                        carModel: true,
                        year: true,
                        color: true,
                        rentalRate: true,
                    },
                    with: {
                        location: {
                            columns: {
                                locationName: true,
                                address: true,
                                contactNumber: true,
                            },
                        },
                    },
                },
            },
            where: (0, drizzle_orm_1.sql) `${schema_1.MaintenanceTable.carID} = ${carID}`,
            orderBy: (0, drizzle_orm_1.sql) `${schema_1.MaintenanceTable.maintenanceDate} DESC`,
        });
        console.log("Database query result:", result);
        return result;
    }
    catch (error) {
        console.error("Database error in getCarMaintenanceHistory:", error);
        throw error;
    }
};
exports.getCarMaintenanceHistory = getCarMaintenanceHistory;
