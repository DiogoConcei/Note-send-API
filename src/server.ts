import app from './app';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // RECRIAR O BANCO DO ZERO (Apaga dados e cria colunas novas corretamente)
    await sequelize.sync({ force: true });
    console.log('BANCO DE DADOS RESETADO E RECRIADO COM SUCESSO!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
  }
}

startServer();
