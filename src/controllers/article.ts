import { Context } from 'koa';
const DB = require('../config/db');
// 查询文章
const listAllArticle = async (ctx: Context) => {
  const { page = 1, pageSize = 10, keywords } = ctx.request.query;
  let matchOption: any = {};
  if (keywords) {
    matchOption.title = { $regex: keywords };
  }
  const data = await DB.find('article', matchOption, {}, { page, pageSize });
  const total = await DB.findCount('article', matchOption, {});
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data, total };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
// 管理文章
const listArticle = async (ctx: Context) => {
  // 获取请求头中的解析出来的用户Id
  const id = ctx.request.header.userId;
  const { page = 1, pageSize = 10, keywords } = ctx.request.query;
  let matchOption: any = {
    userId: id,
  };
  if (keywords) {
    matchOption.title = { $regex: keywords };
  }
  const data = await DB.find('article', matchOption, {}, { page, pageSize });
  const total = await DB.findCount('article', matchOption, {});
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data, total };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const getArticle = async (ctx: Context) => {
  // ctx.body = `getArticle controller with ID = ${ctx.params.id}`;
  // 获取请求头中的解析出来的用户Id
  const { id } = ctx.params;
  const data = await DB.find('article', { _id: DB.getObjectID(id) });
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data: data[0] };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const addArticle = async (ctx: Context) => {
  // ctx.body = `addArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  const { title, content } = ctx.request.body;
  const userId = ctx.request.header.userId;
  const res = await DB.insert('article', { title, content, createTime: Date.now(), userId });
  let feedback;
  try {
    feedback = { code: 200, msg: `add success ${res.insertedId}` };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const updateArticle = async (ctx: Context) => {
  // ctx.body = `updateArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  const { id, title, content } = ctx.request.body;
  const userId = ctx.request.header.userId;
  const res = await DB.update(
    'article',
    { _id: DB.getObjectID(id), userId },
    { title, content, modifyTime: Date.now() },
  );
  console.log('res', res);
  let feedback;
  try {
    feedback = { code: 200, msg: 'edit success' };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const deleteArticle = async (ctx: Context) => {
  const { id } = ctx.params;
  const userId = ctx.request.header.userId;
  await DB.delete('article', { _id: DB.getObjectID(id), userId });
  let feedback;
  try {
    feedback = { code: 200, msg: 'delete success' };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
  // ctx.body = `deleteArticle controller with ID = ${ctx.params.id}`;
};
export default {
  listAllArticle,
  listArticle,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
};
