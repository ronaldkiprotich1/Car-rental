"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarMaintenanceHistoryController = exports.deleteMaintenanceController = exports.updateMaintenanceController = exports.getAllMaintenanceController = exports.getMaintenanceController = exports.createMaintenanceController = void 0;
const maintenance_service_1 = require("./maintenance.service");
const isValidId = (id) => Number.isInteger(id) && id > 0;
const createMaintenanceController = async (req, res) => {
    try {
        const maintenance = req.body;
        // Optional: validate required fields here or use middleware
        console.log("Incoming maintenance payload:", maintenance);
        const newMaintenance = await (0, maintenance_service_1.createMaintenanceService)(maintenance);
        res.status(201).json({ success: true, data: newMaintenance });
    }
    catch (error) {
        console.error("Create Maintenance Error:", error);
        res.status(500).json({ success: false, message: "Failed to create maintenance record" });
    }
};
exports.createMaintenanceController = createMaintenanceController;
const getMaintenanceController = async (req, res) => {
    try {
        const maintenanceID = Number(req.params.id);
        if (!isValidId(maintenanceID)) {
            return res.status(400).json({ success: false, message: "Invalid maintenance ID" });
        }
        const maintenance = await (0, maintenance_service_1.getMaintenanceService)(maintenanceID);
        if (!maintenance) {
            return res.status(404).json({ success: false, message: "Maintenance record not found" });
        }
        res.status(200).json({ success: true, data: maintenance });
    }
    catch (error) {
        console.error("Get Maintenance Error:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve maintenance record" });
    }
};
exports.getMaintenanceController = getMaintenanceController;
const getAllMaintenanceController = async (_req, res) => {
    try {
        const records = await (0, maintenance_service_1.getAllMaintenanceService)();
        res.status(200).json({ success: true, data: records });
    }
    catch (error) {
        console.error("Get All Maintenance Error:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve maintenance records" });
    }
};
exports.getAllMaintenanceController = getAllMaintenanceController;
const updateMaintenanceController = async (req, res) => {
    try {
        const maintenanceID = Number(req.params.id);
        if (!isValidId(maintenanceID)) {
            return res.status(400).json({ success: false, message: "Invalid maintenance ID" });
        }
        const updateData = req.body;
        const updated = await (0, maintenance_service_1.updateMaintenanceService)(maintenanceID, updateData);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Maintenance record not found or not updated" });
        }
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        console.error("Update Maintenance Error:", error);
        res.status(500).json({ success: false, message: "Failed to update maintenance record" });
    }
};
exports.updateMaintenanceController = updateMaintenanceController;
const deleteMaintenanceController = async (req, res) => {
    try {
        const maintenanceID = Number(req.params.id);
        if (!isValidId(maintenanceID)) {
            return res.status(400).json({ success: false, message: "Invalid maintenance ID" });
        }
        const deleted = await (0, maintenance_service_1.deleteMaintenanceService)(maintenanceID);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Maintenance record not found or already deleted" });
        }
        res.status(200).json({ success: true, message: "Maintenance record deleted successfully" });
    }
    catch (error) {
        console.error("Delete Maintenance Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete maintenance record" });
    }
};
exports.deleteMaintenanceController = deleteMaintenanceController;
const getCarMaintenanceHistoryController = async (req, res) => {
    try {
        const carID = Number(req.params.carId);
        if (!isValidId(carID)) {
            return res.status(400).json({ success: false, message: "Invalid car ID" });
        }
        console.log("Fetching maintenance history for car ID:", carID);
        const maintenanceHistory = await (0, maintenance_service_1.getCarMaintenanceHistory)(carID);
        if (!maintenanceHistory || maintenanceHistory.length === 0) {
            return res.status(404).json({ success: false, message: "No maintenance records found for this car" });
        }
        res.status(200).json({ success: true, data: maintenanceHistory });
    }
    catch (error) {
        console.error("Get Car Maintenance History Error:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve maintenance history" });
    }
};
exports.getCarMaintenanceHistoryController = getCarMaintenanceHistoryController;
