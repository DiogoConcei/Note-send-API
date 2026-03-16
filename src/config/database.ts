import { Sequelize } from 'sequelize';
import { config } from './config';

if (!config.databaseUrl) {
  console.error('ERRO CRÍTICO: DATABASE_URL não foi definida nas variáveis de ambiente.');
}

const sequelize = config.databaseUrl 
  ? new Sequelize(config.databaseUrl, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
  : new Sequelize('sqlite::memory:', { logging: false }); // Fallback para não crashar o load do módulo

export default sequelize;
