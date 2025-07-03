"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerService = exports.updateCustomerService = exports.getAllCustomersService = exports.getCustomerService = exports.createCustomerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new customer
const createCustomerService = async (customer) => {
    try {
        const newCustomer = await db_1.default.insert(schema_1.CustomerTable).values(customer).returning();
        return newCustomer[0];
    }
    catch (error) {
        console.error("Error inside createCustomerService:", error);
        throw error;
    }
};
exports.createCustomerService = createCustomerService;
// Get a customer by ID
const getCustomerService = async (customerID) => {
    return await db_1.default.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            address: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.CustomerTable.customerID} = ${customerID}`
    });
};
exports.getCustomerService = getCustomerService;
// Get all customers
const getAllCustomersService = async () => {
    return await db_1.default.query.CustomerTable.findMany({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            address: true
        }
    });
};
exports.getAllCustomersService = getAllCustomersService;
// Update a customer
const updateCustomerService = async (customerID, customerData) => {
    const updated = await db_1.default.update(schema_1.CustomerTable)
        .set(customerData)
        .where((0, drizzle_orm_1.sql) `${schema_1.CustomerTable.customerID} = ${customerID}`)
        .returning();
    return updated[0];
};
exports.updateCustomerService = updateCustomerService;
// Delete a customer
const deleteCustomerService = async (customerID) => {
    const deleted = await db_1.default.delete(schema_1.CustomerTable)
        .where((0, drizzle_orm_1.sql) `${schema_1.CustomerTable.customerID} = ${customerID}`)
        .returning();
    return deleted[0];
};
exports.deleteCustomerService = deleteCustomerService;
