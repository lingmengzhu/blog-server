import Router from '@koa/router';
import ArticleController from './controllers/article';
import UserController from './controllers/user';

const unprotectedRouter = new Router();
unprotectedRouter.post('/user/login', UserController.getUser);
unprotectedRouter.post('/user', UserController.addUser);

const protectedRouter = new Router();
protectedRouter.get('/allArticle', ArticleController.listAllArticle);
protectedRouter.get('/article', ArticleController.listArticle);
protectedRouter.get('/article/:id', ArticleController.getArticle);
protectedRouter.post('/article', ArticleController.addArticle);
protectedRouter.put('/article/:id', ArticleController.updateArticle);
protectedRouter.delete('/article/:id', ArticleController.deleteArticle);

export { protectedRouter, unprotectedRouter };
