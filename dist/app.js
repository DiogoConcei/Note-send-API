"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const swagger_json_1 = __importDefault(require("./config/swagger.json"));
const app = (0, express_1.default)();
// Middlewares de Segurança e Utilidades
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Documentação
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Rotas
app.use('/api/notes', noteRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Middleware Global de Erros (deve ser o último)
app.use(errorHandler_1.errorHandler);
exports.default = app;
