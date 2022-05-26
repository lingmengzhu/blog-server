import Router from '@koa/router';
import ArticleController from './controllers/article';
import UserController from './controllers/user';
import TagsController from './controllers/tags';
import FileController from './controllers/file';

const unprotectedRouter = new Router();
const protectedRouter = new Router();

// 登录
unprotectedRouter.post('/user/login', UserController.loginUser);
// 注册
unprotectedRouter.post('/user/register', UserController.registerUser);


// 查询所有用户
protectedRouter.get('/user/list', UserController.listUser);
// 查询指定ID用户
protectedRouter.get('/user/:id', UserController.getUser);
// 修改用户信息
protectedRouter.put('/user', UserController.updateUser);

// 查询所有文章
protectedRouter.get('/article/list', ArticleController.listArticle);
// 查看指定ID文章
protectedRouter.get('/article/:id', ArticleController.getArticle);
// 添加文章
protectedRouter.post('/article', ArticleController.addArticle);
// 修改指定文章
protectedRouter.put('/article/:id', ArticleController.updateArticle);
// 删除指定文章
protectedRouter.delete('/article/:id', ArticleController.deleteArticle);

// 查询标签
protectedRouter.get('/tags/list', TagsController.listTags);

// 查询标签
protectedRouter.post('/upload', FileController.fileUpload);

export { protectedRouter, unprotectedRouter };
