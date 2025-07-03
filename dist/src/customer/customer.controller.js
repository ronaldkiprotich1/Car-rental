"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerController = exports.updateCustomerController = exports.getAllCustomersController = exports.getCustomerController = exports.createCustomerController = void 0;
const customer_service_1 = require("./customer.service");
// Create a new customer
const createCustomerController = async (req, res) => {
    try {
        const customer = req.body;
        console.log("Customer payload:", customer);
        const newCustomer = await (0, customer_service_1.createCustomerService)(customer);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        console.error("Create Customer Error:", error);
        res.status(500).json({ message: "Failed to create customer" });
    }
};
exports.createCustomerController = createCustomerController;
// Get a customer by ID
const getCustomerController = async (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        const customer = await (0, customer_service_1.getCustomerService)(customerID);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    }
    catch (error) {
        console.error("Get Customer Error:", error);
        res.status(500).json({ message: "Failed to retrieve customer" });
    }
};
exports.getCustomerController = getCustomerController;
// Get all customers
const getAllCustomersController = async (_req, res) => {
    try {
        const customers = await (0, customer_service_1.getAllCustomersService)();
        res.status(200).json(customers);
    }
    catch (error) {
        console.error("Get All Customers Error:", error);
        res.status(500).json({ message: "Failed to retrieve customers" });
    }
};
exports.getAllCustomersController = getAllCustomersController;
// Update customer
const updateCustomerController = async (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        const customerData = req.body;
        const updatedCustomer = await (0, customer_service_1.updateCustomerService)(customerID, customerData);
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found or not updated" });
        }
        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        console.error("Update Customer Error:", error);
        res.status(500).json({ message: "Failed to update customer" });
    }
};
exports.updateCustomerController = updateCustomerController;
// Delete customer
const deleteCustomerController = async (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        const deletedCustomer = await (0, customer_service_1.deleteCustomerService)(customerID);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found or already deleted" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    }
    catch (error) {
        console.error("Delete Customer Error:", error);
        res.status(500).json({ message: "Failed to delete customer" });
    }
};
exports.deleteCustomerController = deleteCustomerController;
