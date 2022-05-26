import { Context } from 'koa';
import jwt from 'jsonwebtoken';

export function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  };
}

export function decodeToken() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const decoded: any = jwt.decode(ctx.request.headers.authorization.replace('Bearer ', ''));
    // 将解码后的数据写入在请求头中
    ctx.request.header.userId = decoded.id;
    await next();
  };
}
export function urlWithToken() {
  return async (ctx: Context, next: () => Promise<void>) => {
    let isFileUrl = /upload/.test(ctx.request.url);
    if (isFileUrl) {
      const { token } = ctx.request.query;
      console.log("token", token)
      if (token) {
        ctx.headers.authorization = 'Bearer ' + token;
      }
      console.log("token", ctx.headers.authorization)
    }
    await next();
  };
}
