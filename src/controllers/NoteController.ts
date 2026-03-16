import { Request, Response, NextFunction } from 'express';
import NoteService from '../services/NoteService';
import { z } from 'zod';

const createNoteSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
});

const updateNoteSchema = createNoteSchema.partial();

class NoteController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await NoteService.findAll();
      return res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = await NoteService.findById(Number(id));
      return res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createNoteSchema.parse(req.body);
      const note = await NoteService.create(validatedData);
      return res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateNoteSchema.parse(req.body);
      const note = await NoteService.update(Number(id), validatedData);
      return res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await NoteService.delete(Number(id));
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new NoteController();
