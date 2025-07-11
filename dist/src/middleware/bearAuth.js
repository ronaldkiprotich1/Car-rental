"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.checkRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// middleware to check if the user is loggedin
// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//     }
//     // `
//     // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInVzZXJfaWQiOjgsImZpcnN0X25hbWUiOiJ0ZXN0IiwibGFzdF9uYW1lIjoidGVzdCIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzQ4NjgwNDkwLCJpYXQiOjE3NDg0MjEyOTB9.2h9x-JGOFkTHH_uF7nAU8q3tFiPrsIEDIi_dkhgW51o
//     // `
//     const token = authHeader.split(" ")[1]
//     try {
//         const decode = jwt.verify(token, process.env.JWT_SECRET as string);
//         // attching user info
//         // req.user = decode;
//         (req as any).user = decode;
//         next()
//     } catch (error) {
//         res.status(401).json({ message: "Invalid Token" });
//     }
// }
// Impelementing a middleware to check user roles
const checkRoles = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            // check for roles
            if (typeof decoded === "object" && // Ensure decoded is an object
                decoded !== null && //Ensure decoded is not null 
                "role" in decoded //Ensure the decoded token has a role property
            ) { // check if decoded is an object and has a role property
                if (requiredRole === "both") {
                    if (decoded.role === "admin" || decoded.role === "user") { // if the decoded role is admin or user, then allow access
                        next();
                        return;
                    }
                } // if the required role is both, then allow access to admin and user
                else if (decoded.role === requiredRole) { // if the decoded role is the same as the required role, then allow access
                    next();
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            else { //happens when the decoded token is not an object or does not have a role property
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token" });
            return;
        }
    };
};
exports.checkRoles = checkRoles;
exports.adminRoleAuth = (0, exports.checkRoles)("admin");
exports.userRoleAuth = (0, exports.checkRoles)("user");
exports.bothRoleAuth = (0, exports.checkRoles)("both");
