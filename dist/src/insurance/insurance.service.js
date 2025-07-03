"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsuranceService = exports.updateInsuranceService = exports.getAllInsurancesService = exports.getInsuranceService = exports.createInsuranceService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create insurance
const createInsuranceService = async (insurance) => {
    const newInsurance = await db_1.default.insert(schema_1.InsuranceTable).values(insurance).returning();
    return newInsurance[0];
};
exports.createInsuranceService = createInsuranceService;
// Get one insurance by ID
const getInsuranceService = async (insuranceID) => {
    return await db_1.default.query.InsuranceTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.InsuranceTable.insuranceID} = ${insuranceID}`,
        columns: {
            insuranceID: true,
            carID: true,
            insuranceProvider: true,
            policyNumber: true,
            startDate: true,
            endDate: true,
        }
    });
};
exports.getInsuranceService = getInsuranceService;
// Get all insurances
const getAllInsurancesService = async () => {
    return await db_1.default.query.InsuranceTable.findMany({
        columns: {
            insuranceID: true,
            carID: true,
            insuranceProvider: true,
            policyNumber: true,
            startDate: true,
            endDate: true,
        }
    });
};
exports.getAllInsurancesService = getAllInsurancesService;
// Update insurance
const updateInsuranceService = async (insuranceID, insuranceData) => {
    const updated = await db_1.default.update(schema_1.InsuranceTable)
        .set(insuranceData)
        .where((0, drizzle_orm_1.sql) `${schema_1.InsuranceTable.insuranceID} = ${insuranceID}`)
        .returning();
    return updated[0];
};
exports.updateInsuranceService = updateInsuranceService;
// Delete insurance
const deleteInsuranceService = async (insuranceID) => {
    const deleted = await db_1.default.delete(schema_1.InsuranceTable)
        .where((0, drizzle_orm_1.sql) `${schema_1.InsuranceTable.insuranceID} = ${insuranceID}`)
        .returning();
    return deleted[0];
};
exports.deleteInsuranceService = deleteInsuranceService;
