import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import noteRoutes from './routes/noteRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerDocument from './config/swagger.json';

const app = express();

// Middlewares de Segurança e Utilidades
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/notes', noteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware Global de Erros (deve ser o último)
app.use(errorHandler);

export default app;
