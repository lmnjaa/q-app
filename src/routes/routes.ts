import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router: Router = Router();

router.use('/api/users', UserController.getUsers);
router.use('/api/users/:id', UserController.getUser);

export const routes: Router = router;