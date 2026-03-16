import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  // Log detalhado para o console do Vercel sempre aparecer, independente de ser Dev ou Prod
  logger.error(`[ERRO API] ${req.method} ${req.url}: ${err.message}`);
  if (err.parent) {
    logger.error(`[DB ERROR DETAIL]: ${err.parent.message}`);
  }
  if (err.stack && isDev) {
    logger.error(err.stack);
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Erro de validação nos dados enviados',
      errors: err.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      })),
    });
  }

  const status = err.status || 500;
  const message = (status === 500 && !isDev) 
    ? 'Ocorreu um erro interno. Tente novamente mais tarde.' 
    : err.message || 'Erro interno no servidor';

  return res.status(status).json({
    message,
    ...(isDev && { stack: err.stack })
  });
};
