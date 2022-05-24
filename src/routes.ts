import Router from '@koa/router';
import ArticleController from './controllers/article';
import UserController from './controllers/user';
import TagsController from './controllers/tags';

const unprotectedRouter = new Router();
// 登录
unprotectedRouter.post('/user/login', UserController.getUser);
// 注册
unprotectedRouter.post('/user', UserController.addUser);
// 查询用户
unprotectedRouter.get('/user', UserController.listUser);
// 查询所有文章
unprotectedRouter.get('/allArticle', ArticleController.listAllArticle);
// 查询标签
unprotectedRouter.get('/tags', TagsController.listTags);
// 查询个人文章
unprotectedRouter.get('/article', ArticleController.listArticle);
// 查看具体文章
unprotectedRouter.get('/article/:id', ArticleController.getArticle);

const protectedRouter = new Router();
protectedRouter.post('/article', ArticleController.addArticle);
protectedRouter.put('/article/:id', ArticleController.updateArticle);
protectedRouter.delete('/article/:id', ArticleController.deleteArticle);

export { protectedRouter, unprotectedRouter };
