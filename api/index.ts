import app from '../src/app';
import sequelize from '../src/config/database';

// O Sequelize sincroniza automaticamente na primeira requisição se o DB estiver vazio.
// Em ambiente serverless, é ideal que a conexão ocorra fora do handler principal.
const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log('Postgres do Supabase sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar Postgres:', error);
  }
};

connectDB();

export default app;
