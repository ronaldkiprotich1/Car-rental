"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservation = void 0;
const reservation_controller_1 = require("../reservation/reservation.controller");
const reservation = (app) => {
    app.route("/reservation").post(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.createReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/reservation").get(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.getAllReservationsController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/reservation/:id").get(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.getReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/reservation/:id").put(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.updateReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.route("/reservation/:id").delete(async (req, res, next) => {
        try {
            await (0, reservation_controller_1.deleteReservationController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.reservation = reservation;
