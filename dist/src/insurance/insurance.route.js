"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insurance = void 0;
const insurance_controller_1 = require("./insurance.controller");
const insurance = (app) => {
    app.route("/insurance").post(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.createInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/insurance").get(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.getAllInsurancesController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/insurance/:id").get(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.getInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/insurance/:id").put(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.updateInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/insurance/:id").delete(async (req, res, next) => {
        try {
            await (0, insurance_controller_1.deleteInsuranceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.insurance = insurance;
