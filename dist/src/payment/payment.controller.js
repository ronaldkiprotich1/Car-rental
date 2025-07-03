"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentController = exports.updatePaymentController = exports.getAllPaymentsController = exports.getPaymentController = exports.createPaymentController = void 0;
const payment_service_1 = require("../payment/payment.service");
const parseId = (id) => {
    const parsed = parseInt(id);
    return isNaN(parsed) ? null : parsed;
};
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
};
const createPaymentController = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = await (0, payment_service_1.createPaymentService)(payment);
        if (!newPayment) {
            return res.status(400).json({ message: "Payment creation failed" });
        }
        res.status(201).json({ message: "Payment created successfully", payment: newPayment });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createPaymentController = createPaymentController;
const getPaymentController = async (req, res) => {
    try {
        const paymentId = parseId(req.params.id);
        if (paymentId === null)
            return res.status(400).json({ message: "Invalid payment ID" });
        const payment = await (0, payment_service_1.getPaymentService)(paymentId);
        if (!payment)
            return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ payment });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getPaymentController = getPaymentController;
const getAllPaymentsController = async (_req, res) => {
    try {
        const payments = await (0, payment_service_1.getAllPaymentsService)();
        res.status(200).json({ payments });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getAllPaymentsController = getAllPaymentsController;
const updatePaymentController = async (req, res) => {
    try {
        const paymentId = parseId(req.params.id);
        if (paymentId === null)
            return res.status(400).json({ message: "Invalid payment ID" });
        const updatedPayment = await (0, payment_service_1.updatePaymentService)(paymentId, req.body);
        if (!updatedPayment)
            return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ message: "Payment updated successfully", payment: updatedPayment });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.updatePaymentController = updatePaymentController;
const deletePaymentController = async (req, res) => {
    try {
        const paymentId = parseId(req.params.id);
        if (paymentId === null)
            return res.status(400).json({ message: "Invalid payment ID" });
        const deletedPayment = await (0, payment_service_1.deletePaymentService)(paymentId);
        if (!deletedPayment)
            return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ message: "Payment deleted successfully" });
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.deletePaymentController = deletePaymentController;
