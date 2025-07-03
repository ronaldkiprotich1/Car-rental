"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const payment_controller_1 = require("../payment/payment.controller");
const payment = (app) => {
    app.route("/payments").post(async (req, res, next) => {
        try {
            await (0, payment_controller_1.createPaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/payments").get(async (req, res, next) => {
        try {
            await (0, payment_controller_1.getAllPaymentsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/payments/:id").get(async (req, res, next) => {
        try {
            await (0, payment_controller_1.getPaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/payments/:id").put(async (req, res, next) => {
        try {
            await (0, payment_controller_1.updatePaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/payments/:id").delete(async (req, res, next) => {
        try {
            await (0, payment_controller_1.deletePaymentController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.payment = payment;
