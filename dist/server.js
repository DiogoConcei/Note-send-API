"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        // Sincroniza o banco de dados (Cria tabelas se não existirem)
        await database_1.default.sync();
        console.log('Banco de dados conectado com sucesso!');
        app_1.default.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    }
    catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
    }
}
startServer();
