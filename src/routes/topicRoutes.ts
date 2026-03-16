import { Router } from 'express';
import TopicController from '../controllers/TopicController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', TopicController.getAll);
router.post('/', TopicController.create);
router.delete('/:id', TopicController.delete);

export default router;
