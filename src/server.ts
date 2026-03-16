import app from './app';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincroniza o banco de dados e atualiza colunas se necessário
    await sequelize.sync({ alter: true });
    console.log('Banco de dados conectado e sincronizado com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
  }
}

startServer();
