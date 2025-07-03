"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationController = exports.updateLocationController = exports.getAllLocationsController = exports.getLocationController = exports.createLocationController = void 0;
const location_service_1 = require("../location/location.service");
// Create a new location
const createLocationController = async (req, res) => {
    try {
        const location = req.body;
        const newLocation = await (0, location_service_1.createLocationService)(location);
        res.status(201).json(newLocation);
    }
    catch (error) {
        console.error("Create Location Error:", error);
        res.status(500).json({ message: "Failed to create location" });
    }
};
exports.createLocationController = createLocationController;
// Get one location by ID
const getLocationController = async (req, res) => {
    try {
        const locationID = parseInt(req.params.id);
        const location = await (0, location_service_1.getLocationService)(locationID);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    }
    catch (error) {
        console.error("Get Location Error:", error);
        res.status(500).json({ message: "Failed to retrieve location" });
    }
};
exports.getLocationController = getLocationController;
// Get all locations with their related cars
const getAllLocationsController = async (_req, res) => {
    try {
        const locations = await (0, location_service_1.getAllLocationsService)();
        res.status(200).json(locations);
    }
    catch (error) {
        console.error("Get All Locations Error:", error);
        res.status(500).json({ message: "Failed to retrieve locations" });
    }
};
exports.getAllLocationsController = getAllLocationsController;
// Update location
const updateLocationController = async (req, res) => {
    try {
        const locationID = parseInt(req.params.id);
        const locationData = req.body;
        const updatedLocation = await (0, location_service_1.updateLocationService)(locationID, locationData);
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found or not updated" });
        }
        res.status(200).json(updatedLocation);
    }
    catch (error) {
        console.error("Update Location Error:", error);
        res.status(500).json({ message: "Failed to update location" });
    }
};
exports.updateLocationController = updateLocationController;
// Delete location
const deleteLocationController = async (req, res) => {
    try {
        const locationID = parseInt(req.params.id);
        const deletedLocation = await (0, location_service_1.deleteLocationService)(locationID);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found or already deleted" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    }
    catch (error) {
        console.error("Delete Location Error:", error);
        res.status(500).json({ message: "Failed to delete location" });
    }
};
exports.deleteLocationController = deleteLocationController;
