import { Router } from 'express';
import NoteController from '../controllers/NoteController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Todas as rotas de notas agora exigem autenticação
router.use(authMiddleware);

router.get('/', NoteController.getAll);
router.get('/:id', NoteController.getById);
router.post('/', NoteController.create);
router.put('/:id', NoteController.update);
router.delete('/:id', NoteController.delete);

export default router;
