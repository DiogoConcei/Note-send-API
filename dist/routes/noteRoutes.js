"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NoteController_1 = __importDefault(require("../controllers/NoteController"));
const router = (0, express_1.Router)();
router.get('/', NoteController_1.default.getAll);
router.get('/:id', NoteController_1.default.getById);
router.post('/', NoteController_1.default.create);
router.put('/:id', NoteController_1.default.update);
router.delete('/:id', NoteController_1.default.delete);
exports.default = router;
