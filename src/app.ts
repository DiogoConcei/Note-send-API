import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import noteRoutes from './routes/noteRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerDocument from './config/swagger.json';
import { config } from './config/config';

const app = express();

// Rate Limiting - Essencial para Vercel Serverless
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100, // Máximo de 100 requisições por IP por janela
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Muitas requisições. Tente novamente mais tarde.' },
});

// Middlewares de Segurança
app.use(helmet());
app.use(limiter);

// Configuração de CORS Restritivo
const allowedOrigins = config.allowedOrigins;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por política CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware Global de Erros
app.use(errorHandler);

export default app;
