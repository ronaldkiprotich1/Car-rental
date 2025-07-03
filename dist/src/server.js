"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables before anything else
const index_1 = __importDefault(require("./index")); // Import the initialized Express app
const port = process.env.PORT || 5000;
index_1.default.listen(port, async () => {
    // Optional: Add database check here, e.g., await checkDatabase();
    console.log(`Server is running on http://localhost:${port}`);
});
