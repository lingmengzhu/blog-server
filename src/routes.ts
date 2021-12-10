import Router from '@koa/router';
import UserController from './controllers/user';

const router = new Router();
router.get('/users', UserController.listUsers);
router.get('/users/:id', UserController.showUserDetail);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
