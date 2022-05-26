import Koa, { Context } from 'koa';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import body from 'koa-body';
import koaStatic from 'koa-static';
import { protectedRouter, unprotectedRouter } from './routes';
import { JWT_SECRET } from './constants';
import { logger, decodeToken, urlWithToken } from './middleware';
const { getUploadDirName, checkDirExist } = require('./utils');
const path = require('path');
// 初始化 Koa 应用实例
const app = new Koa();

// 注册中间件
app.use(logger());
app.use(cors());
app.use(
  body({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './static/upload'),
      keepExtensions: true,
      maxFileSize: 1024 * 1024 * 50,
      onFileBegin: (name, file: any) => {
        let dir = path.join(__dirname, './static/upload', getUploadDirName());
        checkDirExist(dir);
      },
    },
  }),
);
app.use(koaStatic(path.join(__dirname, 'static')));
// 处理路径上参数携带token的情况
app.use(urlWithToken())
// 无需 JWT Token 即可访问
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
// 注册 JWT 中间件
app.use(jwt({ secret: JWT_SECRET }).unless({ path: ['/user/login', '/user'] }));
// token 解析
app.use(decodeToken());
// 需要 JWT Token 才可访问
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());
// 运行服务器
app.listen(8080);
