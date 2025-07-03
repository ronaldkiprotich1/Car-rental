"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenance = void 0;
const maintenance_controller_1 = require("./maintenance.controller");
const maintenance = (app) => {
    app.route("/maintenance").post(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.createMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/maintenance").get(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.getAllMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/maintenance/:id").get(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.getMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/maintenance/:id").put(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.updateMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/maintenance/:id").delete(async (req, res, next) => {
        try {
            await (0, maintenance_controller_1.deleteMaintenanceController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.maintenance = maintenance;
