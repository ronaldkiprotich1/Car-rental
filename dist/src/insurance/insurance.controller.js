"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsuranceController = exports.updateInsuranceController = exports.getAllInsurancesController = exports.getInsuranceController = exports.createInsuranceController = void 0;
const insurance_service_1 = require("./insurance.service");
const createInsuranceController = async (req, res) => {
    try {
        const insurance = req.body;
        console.log("Incoming insurance payload:", insurance);
        const newInsurance = await (0, insurance_service_1.createInsuranceService)(insurance);
        res.status(201).json(newInsurance);
    }
    catch (error) {
        console.error("Create Insurance Error:", error);
        res.status(500).json({ message: "Failed to create insurance" });
    }
};
exports.createInsuranceController = createInsuranceController;
const getInsuranceController = async (req, res) => {
    try {
        const insuranceID = Number(req.params.id);
        const insurance = await (0, insurance_service_1.getInsuranceService)(insuranceID);
        if (!insurance)
            return res.status(404).json({ message: "Insurance not found" });
        res.status(200).json(insurance);
    }
    catch (error) {
        console.error("Get Insurance Error:", error);
        res.status(500).json({ message: "Failed to retrieve insurance" });
    }
};
exports.getInsuranceController = getInsuranceController;
const getAllInsurancesController = async (_req, res) => {
    try {
        const insurances = await (0, insurance_service_1.getAllInsurancesService)();
        res.status(200).json(insurances);
    }
    catch (error) {
        console.error("Get All Insurances Error:", error);
        res.status(500).json({ message: "Failed to retrieve insurances" });
    }
};
exports.getAllInsurancesController = getAllInsurancesController;
const updateInsuranceController = async (req, res) => {
    try {
        const insuranceID = Number(req.params.id);
        const insuranceData = req.body;
        const updatedInsurance = await (0, insurance_service_1.updateInsuranceService)(insuranceID, insuranceData);
        if (!updatedInsurance)
            return res.status(404).json({ message: "Insurance not found or not updated" });
        res.status(200).json(updatedInsurance);
    }
    catch (error) {
        console.error("Update Insurance Error:", error);
        res.status(500).json({ message: "Failed to update insurance" });
    }
};
exports.updateInsuranceController = updateInsuranceController;
const deleteInsuranceController = async (req, res) => {
    try {
        const insuranceID = Number(req.params.id);
        const deletedInsurance = await (0, insurance_service_1.deleteInsuranceService)(insuranceID);
        if (!deletedInsurance)
            return res.status(404).json({ message: "Insurance not found or already deleted" });
        res.status(200).json({ message: "Insurance deleted successfully" });
    }
    catch (error) {
        console.error("Delete Insurance Error:", error);
        res.status(500).json({ message: "Failed to delete insurance" });
    }
};
exports.deleteInsuranceController = deleteInsuranceController;
