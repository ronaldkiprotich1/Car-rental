"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.getReservationPaymentsService = exports.getAllPaymentsService = exports.getPaymentService = exports.createPaymentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
// Create a new payment
const createPaymentService = async (payment) => {
    const newPayment = await db_1.default.insert(schema_1.PaymentTable).values(payment).returning();
    return newPayment[0];
};
exports.createPaymentService = createPaymentService;
// Get one payment by ID
const getPaymentService = async (paymentID) => {
    return await db_1.default.query.PaymentTable.findFirst({
        columns: {
            paymentID: true,
            bookingID: true,
            amount: true,
            paymentDate: true,
            paymentMethod: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.PaymentTable.paymentID} = ${paymentID}`
    });
};
exports.getPaymentService = getPaymentService;
// Get all payments
const getAllPaymentsService = async () => {
    return await db_1.default.query.PaymentTable.findMany({
        columns: {
            paymentID: true,
            amount: true,
            paymentDate: true,
            paymentMethod: true
        }
    });
};
exports.getAllPaymentsService = getAllPaymentsService;
// Get payments for a specific reservation
const getReservationPaymentsService = async (reservationID) => {
    return await db_1.default.query.PaymentTable.findMany({
        columns: {
            paymentID: true,
            amount: true,
            paymentDate: true,
            paymentMethod: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.PaymentTable.paymentID} = ${reservationID}`
    });
};
exports.getReservationPaymentsService = getReservationPaymentsService;
// Update a payment
const updatePaymentService = async (paymentID, paymentData) => {
    const updated = await db_1.default.update(schema_1.PaymentTable)
        .set(paymentData)
        .where((0, drizzle_orm_1.sql) `${schema_1.PaymentTable.paymentID} = ${paymentID}`)
        .returning();
    return updated[0];
};
exports.updatePaymentService = updatePaymentService;
// Delete a payment
const deletePaymentService = async (paymentID) => {
    const deleted = await db_1.default.delete(schema_1.PaymentTable)
        .where((0, drizzle_orm_1.sql) `${schema_1.PaymentTable.paymentID} = ${paymentID}`)
        .returning();
    return deleted[0];
};
exports.deletePaymentService = deletePaymentService;
