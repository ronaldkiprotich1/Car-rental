"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
const customer_controller_1 = require("./customer.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const customer = (app) => {
    app.route("/customer").post(async (req, res, next) => {
        try {
            await (0, customer_controller_1.createCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer").get((0, bearAuth_1.checkRoles)("admin"), async (req, res, next) => {
        try {
            await (0, customer_controller_1.getAllCustomersController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id").get(async (req, res, next) => {
        try {
            await (0, customer_controller_1.getCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id").put(async (req, res, next) => {
        try {
            await (0, customer_controller_1.updateCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/customer/:id").delete(async (req, res, next) => {
        try {
            await (0, customer_controller_1.deleteCustomerController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.customer = customer;
