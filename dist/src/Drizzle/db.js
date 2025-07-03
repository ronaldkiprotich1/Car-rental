"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.checkConnection = exports.pool = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = __importStar(require("./schema"));
// Create a pool instead of a single client
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL, // Note: use uppercase DATABASE_URL
});
// Optional: test connection on startup
const main = async () => {
    const client = await exports.pool.connect();
    client.release();
    console.log("Connected to the database via pool");
};
main().catch((error) => {
    console.error("Error connecting to the database:", error);
});
// Export drizzle instance with pool
const db = (0, node_postgres_1.drizzle)(exports.pool, {
    schema,
    logger: true, // Enable or disable logging as needed
});
exports.default = db;
// Helper to check connection
const checkConnection = async () => {
    const client = await exports.pool.connect();
    try {
        await client.query("SELECT 1");
        return true;
    }
    finally {
        client.release();
    }
};
exports.checkConnection = checkConnection;
// Cleanup function for tests or graceful shutdown
const closeConnection = async () => {
    await exports.pool.end();
};
exports.closeConnection = closeConnection;
