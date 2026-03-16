"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(`${err.message} - ${req.method} ${req.url} - ${req.ip}`);
    if (err instanceof zod_1.z.ZodError) {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: err.issues,
        });
    }
    const status = err.status || 500;
    const message = err.message || 'Erro interno no servidor';
    return res.status(status).json({
        message,
    });
};
exports.errorHandler = errorHandler;
