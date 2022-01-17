import Koa, { Context } from 'koa';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { protectedRouter, unprotectedRouter } from './routes';
import { JWT_SECRET } from './constants';
import { logger } from './logger';

// 初始化 Koa 应用实例
const app = new Koa();

// 注册中间件
app.use(logger());
app.use(cors());
app.use(bodyParser());
// 无需 JWT Token 即可访问
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
// 注册 JWT 中间件
app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));
// 需要 JWT Token 才可访问
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());
// 运行服务器
app.listen(9000);
