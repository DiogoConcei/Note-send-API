import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome é obrigatório'),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string(),
});

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await AuthService.register(validatedData);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await AuthService.login(validatedData);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res.status(400).json({ message: 'Token do Google é obrigatório' });
      }
      const result = await AuthService.googleLogin(idToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
