"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.getAllCarsController = exports.getCarController = exports.createCarController = void 0;
const car_service_1 = require("./car.service");
const createCarController = async (req, res) => {
    try {
        const car = req.body;
        console.log("Received car to create:", car);
        const newCar = await (0, car_service_1.createCarService)(car);
        res.status(201).json(newCar);
    }
    catch (error) {
        console.error("Create Car Error:", error);
        res.status(500).json({ message: "Failed to create car" });
    }
    //   export const createCarController = async (req: Request, res: Response) => {
    //   try {
    //     const car = req.body;                         // Get data from request body
    //     console.log("Received car to create:", car); // <-- Put it here for debugging input
    //     const newCar = await createCarService(car);  // Call your service to create the car
    //     res.status(201).json(newCar);                 // Send back the created car
    //   } catch (error) {
    //     console.error("Create Car Error:", error);   // Log error if something goes wrong
    //     res.status(500).json({ message: "Failed to create car" }); // Error response
    //   }
    // };
};
exports.createCarController = createCarController;
const getCarController = async (req, res) => {
    try {
        const carID = Number(req.params.id);
        const car = await (0, car_service_1.getCarService)(carID);
        if (!car)
            return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);
    }
    catch (error) {
        console.error("Get Car Error:", error);
        res.status(500).json({ message: "Failed to retrieve car" });
    }
};
exports.getCarController = getCarController;
const getAllCarsController = async (_req, res) => {
    try {
        const cars = await (0, car_service_1.getAllCarsService)();
        res.status(200).json(cars);
    }
    catch (error) {
        console.error("Get All Cars Error:", error);
        res.status(500).json({ message: "Failed to retrieve cars" });
    }
};
exports.getAllCarsController = getAllCarsController;
const updateCarController = async (req, res) => {
    try {
        const carID = Number(req.params.id);
        const carData = req.body;
        const updatedCar = await (0, car_service_1.updateCarService)(carID, carData);
        if (!updatedCar)
            return res.status(404).json({ message: "Car not found or not updated" });
        res.status(200).json(updatedCar);
    }
    catch (error) {
        console.error("Update Car Error:", error);
        res.status(500).json({ message: "Failed to update car" });
    }
};
exports.updateCarController = updateCarController;
const deleteCarController = async (req, res) => {
    try {
        const carID = Number(req.params.id);
        const deletedCar = await (0, car_service_1.deleteCarService)(carID);
        if (!deletedCar)
            return res.status(404).json({ message: "Car not found or already deleted" });
        res.status(200).json({ message: "Car deleted successfully" });
    }
    catch (error) {
        console.error("Delete Car Error:", error);
        res.status(500).json({ message: "Failed to delete car" });
    }
};
exports.deleteCarController = deleteCarController;
