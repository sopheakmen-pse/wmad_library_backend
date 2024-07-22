"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
exports.authMiddleware = authMiddleware;
