import { Router } from 'express';
import UserController from '../controllers/UserController';
import validEmailPwd from '../middlewares/validEmailPwd';

const router = Router();

const userController = new UserController();

router.post('/', validEmailPwd.emailPwd, userController.login);

export default router;
