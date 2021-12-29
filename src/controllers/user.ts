import { Context } from 'koa';
const DB = require('../config/db');

const getUser = async (ctx: Context) => {
  const { username, password } = ctx.request.body;
  const data = await DB.find('user', { username, password });
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data: data.length > 0 ? data[0] : {} };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const addUser = async (ctx: Context) => {
  // ctx.body = `addArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  const { username, password } = ctx.request.body;
  const data = await DB.insert('user', { username, password, createTime: Date.now() });
  let feedback;
  try {
    feedback = { code: 200, msg: `add success ${data.insertedId}`, data: { _id: data.insertedId } };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
export default {
  getUser,
  addUser,
};
