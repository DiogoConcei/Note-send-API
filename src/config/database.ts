import { Sequelize } from 'sequelize';
import { config } from './config';
import * as pg from 'pg'; // Importação explícita para o bundler do Vercel

if (!config.databaseUrl) {
  console.error('ERRO CRÍTICO: DATABASE_URL não foi definida.');
}

// Configuração para PostgreSQL
const sequelize = new Sequelize(config.databaseUrl || 'postgres://localhost:5432/db', {
  dialect: 'postgres',
  dialectModule: pg, // Força o Sequelize a usar o pacote importado
  dialectOptions: {
    ssl: config.databaseUrl ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
