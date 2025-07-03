"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const authRoutes = (app) => {
    app.post("/auth/register", async (req, res, next) => {
        try {
            await (0, auth_controller_1.createUserController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.post("/auth/verify", async (req, res, next) => {
        try {
            await (0, auth_controller_1.verifyUserController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
    app.post("/auth/login", async (req, res, next) => {
        try {
            await (0, auth_controller_1.loginUserController)(req, res);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = authRoutes;
