"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteService_1 = __importDefault(require("../services/NoteService"));
const zod_1 = require("zod");
const createNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').max(100),
    content: zod_1.z.string().min(1, 'Conteúdo é obrigatório'),
});
const updateNoteSchema = createNoteSchema.partial();
class NoteController {
    async getAll(req, res, next) {
        try {
            const notes = await NoteService_1.default.findAll();
            return res.status(200).json(notes);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const note = await NoteService_1.default.findById(Number(id));
            return res.status(200).json(note);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const validatedData = createNoteSchema.parse(req.body);
            const note = await NoteService_1.default.create(validatedData);
            return res.status(201).json(note);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = updateNoteSchema.parse(req.body);
            const note = await NoteService_1.default.update(Number(id), validatedData);
            return res.status(200).json(note);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await NoteService_1.default.delete(Number(id));
            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new NoteController();
