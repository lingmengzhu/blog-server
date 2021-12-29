import Router from '@koa/router';
import ArticleController from './controllers/article';
import UserController from './controllers/user';

const router = new Router();
router.get('/article', ArticleController.listArticle);
router.get('/article/:id', ArticleController.getArticle);
router.post('/article', ArticleController.addArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/user/login', UserController.getUser);
router.post('/user', UserController.addUser);

export default router;
