"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.car = void 0;
const car_controller_1 = require("./car.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const car = (app) => {
    app.route("/cars").post(async (req, res, next) => {
        try {
            await (0, car_controller_1.createCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/cars").get((0, bearAuth_1.checkRoles)("admin"), async (req, res, next) => {
        try {
            await (0, car_controller_1.getAllCarsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/cars/:id").get(async (req, res, next) => {
        try {
            await (0, car_controller_1.getCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/cars/:id").put(async (req, res, next) => {
        try {
            await (0, car_controller_1.updateCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/cars/:id").delete(async (req, res, next) => {
        try {
            await (0, car_controller_1.deleteCarController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.car = car;
