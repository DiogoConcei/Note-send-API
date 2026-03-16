import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${err.message} - ${req.method} ${req.url} - ${req.ip}`);

  if (err instanceof z.ZodError) {
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
