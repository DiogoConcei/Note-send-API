import { Request, Response, NextFunction } from 'express';
import TopicService from '../services/TopicService';
import { z } from 'zod';

const createTopicSchema = z.object({
  label: z.string().min(1, 'Rótulo é obrigatório').max(50),
  color: z.string().min(1, 'Cor é obrigatória').max(20),
});

const idSchema = z.object({
  id: z.coerce.number().int().positive('ID inválido'),
});

class TopicController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const topics = await TopicService.findAll(userId);
      return res.status(200).json(topics);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createTopicSchema.parse(req.body);
      const userId = (req as any).user.id;
      const topic = await TopicService.create({ ...validatedData, userId });
      return res.status(201).json(topic);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idSchema.parse(req.params);
      const userId = (req as any).user.id;
      await TopicService.delete(id, userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new TopicController();
