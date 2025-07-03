"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = void 0;
const location_controller_1 = require("../location/location.controller");
const location = (app) => {
    app.route("/location").post(async (req, res, next) => {
        try {
            await (0, location_controller_1.createLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/location").get(async (req, res, next) => {
        try {
            await (0, location_controller_1.getAllLocationsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/location/:id").get(async (req, res, next) => {
        try {
            await (0, location_controller_1.getLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/location/:id").put(async (req, res, next) => {
        try {
            await (0, location_controller_1.updateLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/location/:id").delete(async (req, res, next) => {
        try {
            await (0, location_controller_1.deleteLocationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.location = location;
