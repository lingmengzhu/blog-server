import { Context } from 'koa';
const DB = require('../config/db');

const listArticle = async (ctx: Context) => {
  // ctx.body = 'listArticle controller';
  const { page = 1, pageSize = 10 } = ctx.request.query;
  const data = await DB.find('article', {}, {}, { page, pageSize });
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const getArticle = async (ctx: Context) => {
  // ctx.body = `getArticle controller with ID = ${ctx.params.id}`;
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
  const res = await DB.insert('article', { title, content, createTime: Date.now() });
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
  const res = await DB.update(
    'article',
    { _id: DB.getObjectID(id) },
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
  await DB.delete('article', { _id: DB.getObjectID(id) });
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
  listArticle,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
};
