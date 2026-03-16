import { Request, Response, NextFunction } from 'express';
import NoteService from '../services/NoteService';
import { z } from 'zod';

const createNoteSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
});

const updateNoteSchema = createNoteSchema.partial();

const idSchema = z.object({
  id: z.coerce.number().int().positive('ID inválido'),
});

class NoteController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const notes = await NoteService.findAll(userId);
      return res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idSchema.parse(req.params);
      const userId = (req as any).user.id;
      const note = await NoteService.findById(id, userId);
      return res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createNoteSchema.parse(req.body);
      const userId = (req as any).user.id;
      const note = await NoteService.create({ ...validatedData, userId });
      return res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idSchema.parse(req.params);
      const validatedData = updateNoteSchema.parse(req.body);
      const userId = (req as any).user.id;
      const note = await NoteService.update(id, userId, validatedData);
      return res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idSchema.parse(req.params);
      const userId = (req as any).user.id;
      await NoteService.delete(id, userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new NoteController();
