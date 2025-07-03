"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.verifyUserService = exports.getUserByEmailService = exports.createUserService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../Drizzle/db"));
const schema_1 = require("../Drizzle/schema");
const createUserService = async (user) => {
    const [createdUser] = await db_1.default.insert(schema_1.UsersTable)
        .values(user)
        .returning();
    return createdUser;
};
exports.createUserService = createUserService;
const getUserByEmailService = async (email) => {
    return await db_1.default.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.UsersTable.email} = ${email}`
    });
};
exports.getUserByEmailService = getUserByEmailService;
const verifyUserService = async (email) => {
    const [updatedUser] = await db_1.default.update(schema_1.UsersTable)
        .set({ isVerified: true, verificationCode: null })
        .where((0, drizzle_orm_1.sql) `${schema_1.UsersTable.email} = ${email}`)
        .returning();
    return updatedUser;
};
exports.verifyUserService = verifyUserService;
const userLoginService = async (email) => {
    return await db_1.default.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.sql) `${schema_1.UsersTable.email} = ${email}`,
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true,
            isVerified: true,
            verificationCode: true
        }
    });
};
exports.userLoginService = userLoginService;
