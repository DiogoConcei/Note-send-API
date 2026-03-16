import app from '../src/app';
import sequelize from '../src/config/database';

let isSynced = false;

const syncDatabase = async () => {
  if (isSynced) return;
  
  try {
    // Autentica e sincroniza apenas uma vez por ciclo de vida da função lambda
    await sequelize.authenticate();
    await sequelize.sync();
    isSynced = true;
    console.log('Postgres conectado e sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro na conexão/sincronização do Postgres:', error);
    // Em produção, não queremos derrubar o processo, mas o erro será logado no Vercel Logs
  }
};

// Middleware para garantir conexão antes de processar rotas
app.use(async (req, res, next) => {
  await syncDatabase();
  next();
});

export default app;
