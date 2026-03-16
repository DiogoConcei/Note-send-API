"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = __importDefault(require("../models/Note"));
class NoteService {
    async findAll() {
        return await Note_1.default.findAll();
    }
    async findById(id) {
        const note = await Note_1.default.findByPk(id);
        if (!note) {
            const error = new Error('Nota não encontrada');
            error.status = 404;
            throw error;
        }
        return note;
    }
    async create(data) {
        return await Note_1.default.create(data);
    }
    async update(id, data) {
        const note = await this.findById(id);
        return await note.update(data);
    }
    async delete(id) {
        const note = await this.findById(id);
        await note.destroy();
    }
}
exports.default = new NoteService();
